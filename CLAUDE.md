# CLAUDE.md

This repo builds the npm package `create-lusiajs`, used as `bun create lusiajs my-app`.

# 1. Template uses only the Guide

The template in `template/` may use only syntax from the Lusia Guide (https://lusia.azpepoze.com/guide). Markup syntax is designed by the user; never invent it.

# 2. Keep the lusia version in sync

The template depends on the published `lusiajs` and `@lusiajs/vscode-support` packages. Keep both version ranges equal to the latest beta or release of lusia (currently `^0.2.0-beta` for both `lusiajs` and `@lusiajs/vscode-support`).

# 3. Release by tag

Push a tag equal to the package version, such as `v0.1.0-beta.1`. `publish.yml` publishes to npm. Versions with a dash go to the `beta` dist-tag.

# 4. Dotfiles

`template/_gitignore` is renamed to `.gitignore` on scaffold, because npm drops dotfiles. Keep the rename in `src/scaffold.ts`.

# 5. Scaffold safety

Scaffold must refuse a non-empty folder.

# 6. Checks

Run `bun test` and `bun run typecheck` before a commit.

# 7. Commits and code

Use Conventional Commits, one commit per logical change. Keep files under about 150 lines, use full plain names, and write no comment bloat. Before committing, look for the issue the change belongs to and reference it: `refs #N`, or `fixes #N` when the commit finishes it.

# 8. Friendly output

The happy path prints a friendly summary, and the logger is only for errors. Keep the banner at most 8 lines and 56 columns.

# 9. Indent script and style

Indent the code inside `<script>` and `<style>` of a `.lusia` file by 2 spaces, in source files, templates and every example. The framework allows flush-left code, but this is the house style. Full example: `docs/CLAUDE.md` rule 11.

# 10. Branches

Work from `main`. Only `main` and `dev` stay long-lived. Delete a branch once it is merged.

# 11. Worktrees

Worktrees go in `.worktrees/` inside this repo (gitignored): `git worktree add .worktrees/<name> -b <branch> dev`. Never put them next to the repo or in `/tmp`.

# 12. Reuse before writing

Before writing logic, search the repo for code that already does the same job (a check, a cache, a parser, a helper). Reuse or extend it. When two places need the same thing, make one shared helper or base interface and have both use it. Never write a second version. Every agent spec includes this check.
