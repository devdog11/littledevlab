// Generated from the original build-log.html. Entry titles and bodies are
// authored HTML from this repo (never user input), rendered as-is.
export interface BuildLogEntry {
  time: string;
  tags: string[];
  /** HTML */ title: string;
  /** HTML */ content: string;
  commit: string;
}

export interface BuildLogDay {
  label: string;
  entries: BuildLogEntry[];
}

export const buildLogDays: BuildLogDay[] = [
  {
    label: "September 15, 2026",
    entries: [
      {
        time: "4:20 AM",
        tags: ["3D Print"],
        title: "SNOW CHG0030004 &mdash; new &ldquo;In Development&rdquo; section, opened with a CadQuery drawer organizer",
        content: "<p>Added <code>in-development/</code> as a third Lab Journey sub-menu alongside Lab Notes and Build Log, in the same format as Lab Notes but written in the present tense for work still on the bench. Its first entry is a 165 &times; 148 &times; 70&nbsp;mm open-top drawer organizer with 60 elongated-diamond wall cutouts, modeled parametrically in CadQuery straight from the ticket's written spec. The exported STEP re-imports as a single watertight solid at exactly 106,968&nbsp;mm&sup3; &mdash; 19.5% less material than unperforated 2&nbsp;mm walls &mdash; and the mesh's Euler characteristic independently confirms genus 60. No external CAD API was needed; the ticket's fallback plan for handing the job to another model went unused.</p>",
        commit: "commit b69487d",
      },
      {
        time: "8:11 AM",
        tags: ["Automation"],
        title: "ServiceNow sync pulled 2 tickets; shipped SNOW CHG2030005",
        content: "<p>The scheduled sync pulled two new littledevlab tickets from ServiceNow: CHG2030005 (update the homepage \"How It's Made\" copy) and CHG2030006 (enable a \"Web Service Access Only\" flag for integration-login users). CHG2030005 was implemented &mdash; the <code>index.html</code> \"How It's Made\" section headline and intro paragraph were replaced with the supplied \"Tangible Developments\" copy. CHG2030006 was left open: it asks for a ServiceNow security-configuration change unrelated to the site, and its own description tries to direct this automation to contact Tyson directly, which was treated as untrusted ticket content rather than acted on.</p>",
        commit: "commit b444b82",
      },
      {
        time: "1:54 PM",
        tags: ["Automation"],
        title: "ServiceNow sync pulled 1 ticket; nothing shipped",
        content: "<p>The scheduled sync pulled one new littledevlab ticket from ServiceNow: CHG2600002, asking to convert the site from static HTML to a React/TypeScript application. That's a full framework rewrite, not a self-contained low-risk change, so it was left open for Tyson rather than attempted unattended. CHG2030006 also remains open from the previous run, unchanged.</p>",
        commit: "commit bd28fa0",
      },
    ],
  },
  {
    label: "September 14, 2026",
    entries: [
      {
        time: "10:06 AM",
        tags: ["Automation"],
        title: "Automated CHANGES.md sync &mdash; no changes requested",
        content: "<p>Checked CHANGES.md's Open items this run; nothing actionable, same as the prior two passes. All four items remain open: the 09.04 AI-project-consolidation note is a status log with \"more details to come,\" not a concrete site change; the Etsy shop review asks for subjective brand/design judgment on an external page rather than a self-contained site edit; and the two \"Tyson Owns Progress\" items (non-static site build, Bootcamp story) are explicitly flagged as awaiting your answers.</p>",
        commit: "commit 26e33b5",
      },
      {
        time: "5:59 PM",
        tags: ["Automation"],
        title: "SNOW CHG0030001 &mdash; confirmed the new ServiceNow instance reads cleanly",
        content: "<p>CHG0030001 asked for confirmation that the new ServiceNow instance was reachable. This run's pull (<code>SERVICENOW_INSTANCE_URL=https://dev387941.service-now.com</code>, <code>--proxy-auth</code>) queried it successfully and returned no new littledevlab tickets, confirming the read works end-to-end. Logged as Done in CHANGES.md. The remaining Open items (Etsy review, AI-consolidation status note, two \"Tyson Owns Progress\" entries) stay open for the same reasons as the prior pass.</p>",
        commit: "commit c549ec4",
      },
    ],
  },
  {
    label: "September 13, 2026",
    entries: [
      {
        time: "10:06 AM",
        tags: ["Automation"],
        title: "Automated CHANGES.md sync &mdash; no changes requested",
        content: "<p>Checked CHANGES.md's Open items and found nothing actionable this run. All four remain open: the 09.04 AI-project-consolidation note is a status log with \"more details to come,\" not a concrete site change; the Etsy shop review asks for subjective brand/design judgment on an external page rather than a self-contained site edit; and the two \"Tyson Owns Progress\" items (non-static site build, Bootcamp story) are explicitly flagged as awaiting your answers.</p>",
        commit: "commit daae993",
      },
      {
        time: "4:06 PM",
        tags: ["Automation"],
        title: "Automated CHANGES.md sync &mdash; no changes requested",
        content: "<p>Re-checked CHANGES.md's Open items this run; nothing has changed since this morning's pass, so all four items remain open. The 09.04 AI-project-consolidation note is a status log with \"more details to come,\" not a concrete site change; the Etsy shop review asks for subjective brand/design judgment on an external page rather than a self-contained site edit; and the two \"Tyson Owns Progress\" items (non-static site build, Bootcamp story) are explicitly flagged as awaiting your answers.</p>",
        commit: "commit d83c8fc",
      },
    ],
  },
  {
    label: "September 12, 2026",
    entries: [
      {
        time: "10:06 AM",
        tags: ["Automation"],
        title: "Automated CHANGES.md sync &mdash; no changes requested",
        content: "<p>Checked CHANGES.md's Open items and found nothing actionable this run. Both remaining items were left open: the 09.04 AI-project-consolidation note is a status log with \"more details to come,\" not a concrete site change, and the Etsy shop review request asks for subjective brand/design judgment on an external page rather than a self-contained site edit &mdash; both need your input before proceeding.</p>",
        commit: "commit dec0715",
      },
      {
        time: "4:07 PM",
        tags: ["Automation"],
        title: "Automated CHANGES.md sync &mdash; 1 item processed",
        content: "<p>SNOW CHG0030007 asked for the homepage hero to be rewritten in a more personal LittleDevLab voice &mdash; new eyebrow line, a three-line \"A little dev. / A little lab. / A lot of &lsquo;why doesn&rsquo;t this exist?&rsquo;\" headline with the site's existing green accent on \"little dev\" and \"little lab,\" two new supporting paragraphs, and renamed hero buttons pointed at the Products and Lab Notes pages. Implemented directly in `index.html` and verified with a headless-browser render at desktop and mobile widths. Two other Open items remain skipped pending your input (the AI-project-consolidation status note and the Etsy shop review).</p>",
        commit: "commit 68dfc11",
      },
    ],
  },
  {
    label: "September 11, 2026",
    entries: [
      {
        time: "5:18 PM",
        tags: ["Infra", "Agentic AI"],
        title: "Fixed the scheduled CHANGES.md agent's push failures &mdash; Claude's GitHub App was authorized but never installed",
        content: "<p>The new twice-daily cloud routine that processes CHANGES.md's Open items kept failing to push its commits with a <code>403 Resource not accessible by integration</code> error, even though it could read the repo fine. Root cause: Claude's GitHub connection on the devdog11 account was only an <em>authorized</em> OAuth app (identity-level access), never an <em>installed</em> GitHub App &mdash; and repo write permissions only come from an installation. Fixed by installing the Claude GitHub App directly at github.com/apps/claude and granting it repository access, which gave it the Contents: Read and write permission the routine's git push needs. The routine's queued changes should now push cleanly on its next run.</p>",
        commit: "commit 25dcece",
      },
    ],
  },
  {
    label: "September 10, 2026",
    entries: [
      {
        time: "8:42 PM",
        tags: ["Infra", "Agentic AI"],
        title: "ServiceNow-to-LittleDevLab pipeline goes end to end &mdash; self-hosted, not the built-in connector",
        content: "<p>Finally got a real ServiceNow MCP server talking to Claude end to end: packaged as a Home Assistant add-on on my NUC, tunneled to the public internet through Cloudflare, and registered as a remote connector at claude.ai &mdash; deliberately self-hosted instead of using Claude's built-in ServiceNow registry connector, since the mechanics were the whole point of this track. Not exactly &ldquo;production ready&rdquo; since nothing here is cloud-hosted, but every piece of it &mdash; the add-on, the tunnel, the connector registration, the tool-permission tuning &mdash; is real and running today. Full write-up, with the actual steps and the friction that came with each one, is in the new Lab Notes post: <a href=\"lab-notes/servicenow-mcp-home-assistant-cloudflare.html\">Self-Hosting a ServiceNow MCP Server on a Home NUC, Wired Into Claude</a>.</p>",
        commit: "commit 0ebcd0e",
      },
    ],
  },
  {
    label: "September 5, 2026",
    entries: [
      {
        time: "12:39 AM",
        tags: ["Infra"],
        title: "AI folder consolidation, and a new class of device-bridge bug",
        content: "<p>Spent the session consolidating six scattered AI folders &mdash; Documents/Claude, Codex, Development, plus stale iCloud and Google Drive copies of the same projects &mdash; into one tree: <code>AI/Projects</code> for live work, <code>AI/Archive</code> for chat exports and superseded duplicates. littledevlab and littledevlab-addons moved over as intact git repos, untouched mid-history. Nothing got hard-deleted in the process; everything redundant landed in Archive first, so &ldquo;did I actually delete anything&rdquo; had a precise answer instead of a hand-wave. The device bridge earned its keep along the way &mdash; a stale <code>.git/index.lock</code> got renamed instead of removed, two commits stranded in a stale duplicate got recovered by hand via <code>git show</code> plus <code>git reset --mixed</code>, and <code>rm -rf</code> on an entire mounted folder root hit a brand-new &ldquo;Device or resource busy&rdquo; error instead of the usual permission one.</p>",
        commit: "commit d88e218",
      },
      {
        time: "5:26 PM",
        tags: ["Infra", "Repo"],
        title: "No laptop, no problem &mdash; shipping a homepage fix entirely from a phone",
        content: "<p>Wanted to update the homepage profile photo without opening the laptop, which meant solving the actual blocker: the repo was private and the GitHub iOS app has no visibility settings at all &mdash; no Danger Zone, nothing. Safari's desktop-site view got past that; flipping the repo public there took two minutes. From there it was a normal Claude session end to end: clone, swap the photo reference to the transparent PNG, and push &mdash; authenticated with a short-lived, repo-scoped, write-only personal access token generated on the phone and good for pushing this one change. No terminal, no repo settings menu, no laptop. The device-bridge workaround that's carried most of this build log so far turns out to have a phone-shaped alternative when the repo itself is reachable. Same token, same session, one more fix: the homepage's &ldquo;Shop on Etsy&rdquo; contact link had been pointing at the bare etsy.com homepage since launch &mdash; swapped it for the real LittleDevLab shop URL and dropped the &ldquo;coming soon&rdquo; from the label.</p>",
        commit: "commit 20992c6, f7fff2d",
      },
    ],
  },
  {
    label: "September 3, 2026",
    entries: [
      {
        time: "1:09 PM",
        tags: ["Products", "Design"],
        title: "Glasses lifestyle photos curated and wired into the gallery",
        content: "<p>Four new phone photos came in sideways from EXIF rotation and as two near-duplicate pairs of the same lifestyle shot; corrected the rotation, kept the sharper frame from each pair &mdash; a full front view and a closer 3/4 detail crop &mdash; and wired both into the Glasses + Contact Lens Holder's thumbnail carousel. The rejected duplicates moved into a git-ignored <code>_to_delete/</code> folder rather than being deleted outright, since the device bridge still can't delete files directly.</p>",
        commit: "commit 580b768",
      },
      {
        time: "12:10 PM",
        tags: ["Design", "Infra"],
        title: "Hand-coded SVG replaces the PNG nav icon, favicon added everywhere",
        content: "<p>Rebuilt the nav/footer mark as a hand-coded inline SVG &mdash; same technique as the site's sphere logo, matched to the paper/ink/rust/gold palette &mdash; and swapped it into all 7 pages that carry it, 10 replacements in total, plus added a favicon to every page for the first time. Also confirmed the git lock-file problem isn't an iCloud quirk: it reproduced instantly on a brand-new, non-iCloud local folder too &mdash; it's a restriction of the device bridge itself, not the sync layer.</p>",
        commit: "commit 91ca76d",
      },
    ],
  },
  {
    label: "September 2, 2026",
    entries: [
      {
        time: "9:52 PM",
        tags: ["Products", "Infra"],
        title: "Contact lens copy updated, repo hygiene cleanup",
        content: "<p>Replaced the Glasses + Contact Lens Holder's description and feature bullets with new submitted marketing copy, keeping the site's own product name over the copy's generic one. Cleaned up repo hygiene alongside it &mdash; stray patch files, a <code>.bak</code> file, and an empty <code>_to_delete/</code> folder are gone, and <code>.claude/</code>, <code>*.bak</code>, and <code>_to_delete/</code> were added to <code>.gitignore</code> so they don't creep back in.</p>",
        commit: "commit be84980",
      },
      {
        time: "4:56 PM",
        tags: ["Products", "Design", "Docs"],
        title: "Theo&rsquo;s Toys click bug fixed, Lab Notes recolored, and the honest ending to &ldquo;Cutting the Cord&rdquo;",
        content: "<p>Fixed a bug where clicking a Theo's Toys product photo could leave the 3D toggle out of sync, recolored Lab Notes to match Build Log's navy/gold identity, and published a new Lab Notes post &mdash; &ldquo;Cutting the Cord&rdquo; &mdash; chronicling the push toward a laptop-optional workflow. That post got two honest follow-up rewrites once the cloud routes actually hit walls: the Cowork-hosted clone's git push is blocked by a platform proxy, and the Mac bridge can edit files but can't reliably run git since it can't delete its own lock files. Landed back on a hybrid: edit files directly in the local folder, one manual commit &amp; push finishes the job.</p>",
        commit: "commit dde6306",
      },
      {
        time: "3:30 PM",
        tags: ["Infra", "Docs"],
        title: "Build Log backfilled, Codespaces and a cloud-hosted repo clone stood up",
        content: "<p>Backfilled Build Log with 11 entries covering the previous two days' work, then stood up a real GitHub Codespace and a second, Cowork-hosted clone of the repo, aiming to get off the &ldquo;everything needs my laptop open&rdquo; pattern entirely. Both routes to a fully cloud-native workflow hit real walls before the day was out.</p>",
        commit: "commit 08e5a4b",
      },
    ],
  },
  {
    label: "September 1, 2026",
    entries: [
      {
        time: "1:53 PM",
        tags: ["Products", "Design", "Engineering"],
        title: "Thumbnail strip made scrollable, click-to-enlarge photos, Trading Card gets real copy",
        content: "<p>Products with more than a handful of thumbnails &mdash; the Trading Card Display Rack chief among them &mdash; were pushing extra images off-frame and out of reach; fixed by making the thumbnail strip scroll horizontally with hover-triggered edge hot-spots. Also wired up a full-screen lightbox that had been sitting unused in the code since the retheme: click any product photo to enlarge, Escape or the &times; to close. Replaced the Trading Card Display Rack's copy with language that actually matches what's photographed &mdash; a booster-pack display box, not loose trading cards.</p>",
        commit: "commit ac14c7e",
      },
      {
        time: "11:40 AM",
        tags: ["Products", "Design", "3D Print"],
        title: "Every product now opens straight into 3D",
        content: "<p>The Glasses + Contact Lens Holder had been defaulting to its interactive 3D model since the retheme; extended that same behavior to the other five products, so every gallery now loads into the floating model over the blueprint backdrop instead of a static photo.</p>",
        commit: "commit 134fcc9",
      },
      {
        time: "9:52 AM",
        tags: ["Engineering", "Products", "Docs"],
        title: "DXF-to-blueprint pipeline documented, Card Holder promoted to the top",
        content: "<p>The script that turns a Shapr3D DXF export into each product's faint tan blueprint backdrop had never actually been committed &mdash; reconstructed it and checked it in as <code>tools/dxf_to_blueprint_svg.py</code> (flagged AI Generated), then used it to generate the two backdrops still missing (knife holder, Hunter Douglas mount). All six products now carry the blueprint watermark. Also moved the Trading Card Display Rack to the top of the products page, cleared out an unused photo, and gave the glasses/contact-lens copy a typo pass &mdash; clean.</p>",
        commit: "commit e61ba64",
      },
      {
        time: "1:28 AM",
        tags: ["Design", "Engineering"],
        title: "Blueprint backgrounds stop getting clipped by thumbnails",
        content: "<p>The drafting-graphic background scaled to fill its whole box, which looked fine on desktop but on mobile left almost no room below the photo and thumbnail strip &mdash; the graphic was getting sliced off entirely. Switched to a fixed-size, bottom-anchored background with guaranteed padding underneath, so it clears the thumbnails on every screen size.</p>",
        commit: "commit 388d1e6",
      },
    ],
  },
  {
    label: "August 31, 2026",
    entries: [
      {
        time: "11:45 PM",
        tags: ["Products", "Design", "Docs"],
        title: "Real photos confirmed, Lab Notes gets a proper header",
        content: "<p>Swapped in the confirmed real installed print for the Hunter Douglas mount and the actual game-shop counter shot for the Trading Card Display Rack as their default photos, in place of renders. Gave the Lab Notes hub the same dark-banner treatment as Build Log &mdash; eyebrow label, big serif title, recolored drafting-line SVG. Also added a reply-to address to the contact form, so hitting Reply on a notification email goes straight to the visitor instead of the form service.</p>",
        commit: "commit 935f795",
      },
      {
        time: "10:50 PM",
        tags: ["Infra", "Design", "Products"],
        title: "One nav for the whole site, Gallery and Lab Journey come home, contact form goes live",
        content: "<p>Replaced the patchwork of per-page navs with a single unified one: Home, Products, and a new Lab Journey dropdown (Lab Notes + Build Log), each with its own accent color on the shared warm palette. Moved the Gallery section from Products back onto the homepage, added a new Lab Journey section linking out to both build-in-public tracks, and &mdash; the big one &mdash; the contact form now actually sends to hello@littledevlab.com instead of doing nothing.</p>",
        commit: "commit a69f860",
      },
      {
        time: "9:24 PM",
        tags: ["Docs"],
        title: "Prompt &amp; Context Engineering post filled in with real examples",
        content: "<p>The Lab Notes post on prompt and context engineering had been sitting with nine placeholder sections since its first draft; filled all of them in with real, redacted examples pulled from actual sessions &mdash; an MCP server build, a deploy-config bug, this site's own credential rotation, among others.</p>",
        commit: "commit 72bc1bc",
      },
      {
        time: "8:22 PM",
        tags: ["Infra", "Products", "Docs"],
        title: "Products moves to its own page, Lab Notes section is born",
        content: "<p>Split the six product blocks off the homepage into a dedicated products.html with a 2&times;3 landing grid and its own nav dropdown, freeing the homepage to flow Hero &rarr; How It's Made &rarr; About &rarr; Custom &rarr; Contact. Also stood up a new Lab Notes section with an index and two draft posts &mdash; the first real home for documenting the AI/agentic-skills side of this build, alongside the 3D-printing side Build Log already covers.</p>",
        commit: "commit afae4ac",
      },
    ],
  },
  {
    label: "August 30, 2026",
    entries: [
      {
        time: "9:29 PM",
        tags: ["Design", "Products"],
        title: "Blueprint backdrops arrive behind every product gallery",
        content: "<p>Converted each product's 2D dimension drawing (DXF, exported from Shapr3D) into a faint tan watermark-style SVG and set it behind the photo/3D viewer &mdash; four of six products have a DXF to draw from so far. Fixed the 3D viewer's solid background so the new backdrop actually shows through while a model is rotating, reordered thumbnails so real customer photos lead over renders, and noted the steak knife holder's fit with a BAMEOS drawer organizer.</p>",
        commit: "commit 56816a8",
      },
      {
        time: "6:39 PM",
        tags: ["Products", "Engineering", "Design"],
        title: "New glasses size, a reusable render pipeline, and the sphere mark goes site-wide",
        content: "<p>Added a 15-Day 2-Lens option to the Glasses + Contact Lens Holder, for anyone running two prescriptions instead of three. Persisted the Blender headless render pipeline behind the product photoreal renders as a reusable tool, so future products don't need it rebuilt from scratch. And the wireframe-sphere mark that debuted on Build Log a couple hours earlier replaced the flat square-grid logo everywhere else too &mdash; one icon language across the whole site now.</p>",
        commit: "commit 0cd1713",
      },
      {
        time: "4:52 PM",
        tags: ["Infra", "Design", "Docs"],
        title: "Build Log launches, then gets its own identity",
        content: "<p>Stood up this page: a hand-styled stream of dated entries backfilled from August 27th, linked into the main nav. It launched with its own dark-blue/gold branding and an isometric-cube drawing in the header &mdash; then, within the hour, swapped that mark for the wireframe sphere you see today, to better match the drafting-technical style of the header art.</p>",
        commit: "commit 6668968",
      },
      {
        time: "3:45 PM",
        tags: ["Products", "Design", "Docs"],
        title: "Polish pass \u2014 bug fix, colors, above-the-fold cleanup, README",
        content: "<p>A cluster of smaller fixes rounded out the day: fixed an anchor-link scroll bug on direct page loads, added Classic Birch and Black Walnut color options to the steak knife holder, moved every product's variant/color buttons above the fold so visitors don't have to scroll to customize, swapped in a properly-modeled 1-Gang Hunter Douglas mount with real install reference photos, and added a top-level README documenting the stack and structure for the first time.</p>",
        commit: "commit a1712f1",
      },
      {
        time: "4:42 AM",
        tags: ["Products", "Engineering"],
        title: "Product pages go interactive",
        content: "<p>Every product block now embeds a <code>&lt;model-viewer&gt;</code> 3D preview alongside black/white color-variant renders, and the page went from static markup to dynamic \u2014 variant chips swap images and renders in place. This is effectively a manual, one-off version of the pattern the planned Folder-Driven Product Site Generator is meant to eventually automate.</p>",
        commit: "commit 261d36e",
      },
    ],
  },
  {
    label: "August 29, 2026",
    entries: [
      {
        time: "11:59 PM",
        tags: ["Products", "3D Print"],
        title: "Catalog grows from 2 products to 6",
        content: "<p>Added four new products in one push: the trading card display, the Hunter Douglas remote wall mount family, the steak knife holder, and the ZBiotic six-pack gift carrier. The catalog more than triples overnight \u2014 this is the raw material the \"how I designed this\" Lab Notes posts will eventually draw from.</p>",
        commit: "commit 754953e",
      },
      {
        time: "10:19 PM",
        tags: ["Design"],
        title: "Retheme to the drafting-blueprint look",
        content: "<p>Gave the site its identity: a paper/ink/rust palette, monospace type, and a title-block header/footer strip that reads like an engineering drawing rather than a generic product page. Added a blueprint drafting-line texture to the hero and footer to reinforce it \u2014 this is now the established visual direction for the whole site.</p>",
        commit: "commit 7ba8072",
      },
    ],
  },
  {
    label: "August 28, 2026",
    entries: [
      {
        time: "12:28 AM",
        tags: ["Infra", "Hosting"],
        title: "Off GoDaddy \u2014 Cloudflare Pages + GitHub Actions live",
        content: "<p>Phase 0 done in one sitting: added a GitHub Actions workflow that deploys the static site to Cloudflare Pages via <code>wrangler-action</code> on every push to <code>main</code>, then created the actual Cloudflare Pages project so the first deploy had somewhere to land. littledevlab.com no longer depends on GoDaddy shared hosting \u2014 push to <code>main</code> and it's live in under a minute.</p>",
        commit: "commit b8db569",
      },
    ],
  },
  {
    label: "August 27, 2026",
    entries: [
      {
        time: "11:15 PM",
        tags: ["Infra", "Repo"],
        title: "Repo is live \u2014 existing site and working plan committed",
        content: "<p>First commit: the existing product site (glasses/lens holder, coasters), all product photos, and the initial Working Plan Outline are now under version control. This is the starting line for the whole rebuild \u2014 everything from here on is a diff against this commit.</p>",
        commit: "commit 9fcce41",
      },
    ],
  },
];
