<p align="center"><img src="https://raw.githubusercontent.com/lusiajs/lusia/main/logo/logo-128.png" width="96" alt="Lusia logo"></p>

# create-lusiajs

Start a Lusia app in one command. Lusia is a UI framework for Bun. Each component is a single `.lusia` file.

Lusia is in beta.

## Quick start

```bash
bun create lusiajs my-app
cd my-app
bun install
bun run dev
```

| Step                        | What it does                            |
| --------------------------- | --------------------------------------- |
| `bun create lusiajs my-app` | Copies the starter app into `my-app`    |
| `bun install`               | Installs Lusia and the TypeScript types |
| `bun run dev`               | Starts the dev server                   |

> [!NOTE]
> The target folder must be empty or missing.

## Options

After you pick the folder, a list asks you to turn options on or off.

| Key                 | Action           |
| ------------------- | ---------------- |
| Up / down           | Move the cursor  |
| Space               | Turn the option on or off |
| Enter               | Confirm          |

| Option        | Flag                                      | Default | What it does                                                                                       |
| ------------- | ----------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| Animate space | `--animate-space` / `--no-animate-space`  | Off     | Nearby elements slide to their new place when one is added or removed. Sets `animateSpace` in `lusia.config.ts`. |

> [!TIP]
> Pass a flag to skip the list, for example `bun create lusiajs my-app --animate-space`.
> The list only shows in a terminal.

## What you see

```text
   ▄   ▄
  ██▄ ▄██            ██╗     ██╗   ██╗███████╗██╗ █████╗
  ███▄███            ██║     ██║   ██║██╔════╝██║██╔══██╗
  ███████      ▄█▀   ██║     ██║   ██║███████╗██║███████║
  ███████      ██    ██║     ██║   ██║╚════██║██║██╔══██║
  ███████      ███   ███████╗╚██████╔╝███████║██║██║  ██║
  ███████████████    ╚══════╝ ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═╝
  █████████████▀▀

  Lusia 0.1.0-beta.1
  Write UI in one file. Update it with variables.
  Built for Bun.

  ✔ Created my-app/
      .gitignore  index.html  lusia.config.ts  package.json
      tsconfig.json  src/App.lusia  src/main.ts

  Start your app:

      cd my-app && bun install && bun run dev

  Guide   https://lusia.azpepoze.com/guide
  GitHub  https://github.com/lusiajs/lusia
```

## Template contents

| File              | What it is for                             |
| ----------------- | ------------------------------------------ |
| `package.json`    | Scripts (`dev`, `build`) and dependencies  |
| `lusia.config.ts` | Lusia settings, such as the build folder   |
| `index.html`      | The page that loads the app                |
| `tsconfig.json`   | TypeScript settings                        |
| `src/main.ts`     | Starts the app on the page                 |
| `src/App.lusia`   | The first component, with a counter button |
| `.gitignore`      | Skips `node_modules` and `dist` in git     |
| `AGENTS.md`       | Lusia rules and AI docs links for AI tools |
| `CLAUDE.md`       | Points Claude Code to `AGENTS.md`          |

> [!NOTE]
> `package.json` also installs `@lusiajs/vscode-support` as a dev dependency. The Lusia VS Code extension loads it from your project for autocomplete, errors and formatting. Keep its version equal to `lusiajs`.

## More

| Topic       | Link                             |
| ----------- | -------------------------------- |
| Lusia guide | https://lusia.azpepoze.com/guide |
