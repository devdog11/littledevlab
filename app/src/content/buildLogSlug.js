// "../../../build-log/2026-10-01-01-deploy-gate-enforced.md" -> "2026-10-01-01-deploy-gate-enforced"
export const slugOf = (path) => path.split('/').pop().replace(/\.md$/, '')
