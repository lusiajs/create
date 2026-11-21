# CLAUDE.md

This repo builds the npm package `create-lusiajs`, used as `bun create lusiajs my-app`.

# 1. Template uses only the Guide
The template in `template/` may use only syntax from the Lusia Guide (https://lusia.azpepoze.com/guide). Markup syntax is designed by the user; never invent it.

# 2. Keep the lusia version in sync
The template depends on the published `lusiajs` package. Keep its version range equal to the latest beta or release of lusia (currently `^0.1.0-beta.1`).

# 3. Release by tag
Push a tag equal to the package version, such as `v0.1.0-beta.1`. `publish.yml` publishes to npm. Versions with a dash go to the `beta` dist-tag.

# 4. Dotfiles
`template/_gitignore` is renamed to `.gitignore` on scaffold, because npm drops dotfiles. Keep the rename in `src/scaffold.ts`.

# 5. Scaffold safety
Scaffold must refuse a non-empty folder.

# 6. Checks
Run `bun test` and `bun run typecheck` before a commit.

# 7. Commits and code
Use Conventional Commits, one commit per logical change. Keep files under about 150 lines, use full plain names, and write no comment bloat.
