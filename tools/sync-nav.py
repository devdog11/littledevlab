#!/usr/bin/env python3
"""Copy the shared menu from partials/site-nav.html into every static page.

Usage (from the site folder):
    python3 tools/sync-nav.py          rewrite pages whose menu is out of date
    python3 tools/sync-nav.py --check  change nothing; exit 1 if any page is out of date

Only the link lists are shared: the contents of <ul class="nav-links"> and of
the first <ul> inside #mobileNav. Each page keeps its own wrapper (logo, CTA,
header vs nav), which differ between the home page and the rest. The first run
adds <!-- nav-links:start/end --> and <!-- mobile-links:start/end --> markers;
later runs replace what's between them.

products.html is built React output and is skipped.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIAL = ROOT / "partials" / "site-nav.html"
PAGES = ["index.html", "build-log.html", "lab/index.html", "lab-notes/*.html"]

# Which dropdown item is the current page.
CURRENT = {
    "build-log.html": "Build Log",
    "lab/index.html": "The Lab (overview)",
    "lab-notes/": "Lab Notes",
}

# Where each shared list lives: (marker name, opening tag, how to find it).
LISTS = [
    ("nav-links", re.compile(r'<ul class="nav-links">')),
    ("mobile-links", re.compile(r'id="mobileNav">\s*<ul>')),
]


def load_sections():
    text = re.sub(r"<!--(?!\s*section:).*?-->\s*", "", PARTIAL.read_text(), flags=re.S)
    parts = re.split(r"<!--\s*section:([\w-]+)\s*-->\n", text)
    return {parts[i]: parts[i + 1].rstrip() + "\n" for i in range(1, len(parts), 2)}


def render(section, rel):
    depth = rel.count("/")
    root = "../" * depth
    home = "" if rel == "index.html" else f"{root}index.html"
    out = section.replace("{{root}}", root).replace("{{home}}", home)
    label = next((v for k, v in CURRENT.items() if rel == k or (k.endswith("/") and rel.startswith(k))), None)
    if label:
        out = re.sub(rf'(<a href="[^"]*")(>{re.escape(label)}</a>)', r'\1 class="current"\2', out)
        out = out.replace(f'class="mobile-link">{label}<', f'class="mobile-link current">{label}<')
    return out


def indent(block, prefix):
    return "".join(prefix + line if line.strip() else line for line in block.splitlines(True))


def sync(text, rel, sections):
    for name, opener in LISTS:
        start, end = f"<!-- {name}:start -->", f"<!-- {name}:end -->"
        m = opener.search(text)
        if not m:
            raise SystemExit(f"{rel}: can't find the {name} list")
        close = text.index("</ul>", m.end())
        line_start = text.rfind("\n", 0, close) + 1
        ul_indent = re.match(r"[ \t]*", text[line_start:]).group(0)
        body = indent(render(sections[name], rel), ul_indent + "  ")
        new = f"\n{ul_indent}  {start}\n{body}{ul_indent}  {end}\n{ul_indent}"
        text = text[: m.end()] + new + text[close:]
    return text


def main():
    check = "--check" in sys.argv
    sections = load_sections()
    stale = []
    for pattern in PAGES:
        for path in sorted(ROOT.glob(pattern)):
            rel = path.relative_to(ROOT).as_posix()
            old = path.read_text()
            new = sync(old, rel, sections)
            if new != old:
                stale.append(rel)
                if not check:
                    path.write_text(new)
    verb = "out of date" if check else "updated"
    print(f"{len(stale)} page(s) {verb}" + (": " + ", ".join(stale) if stale else ""))
    if check and stale:
        sys.exit(1)


if __name__ == "__main__":
    main()
