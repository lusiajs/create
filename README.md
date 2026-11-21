<p align="center"><img src="https://raw.githubusercontent.com/lusiajs/lusia/main/logo/logo-128.png" width="96" alt="Lusia logo"></p>

# create-lusia

Start a Lusia app in one command. Lusia is a UI framework for Bun. Each component is a single `.lusia` file.

Lusia is in beta.

## Quick start

```bash
bun create lusia my-app
cd my-app
bun install
bun run dev
```

| Step                      | What it does                            |
| ------------------------- | --------------------------------------- |
| `bun create lusia my-app` | Copies the starter app into `my-app`    |
| `bun install`             | Installs Lusia and the TypeScript types |
| `bun run dev`             | Starts the dev server                   |

> [!NOTE]
> The target folder must be empty or missing.

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

## More

| Topic       | Link                             |
| ----------- | -------------------------------- |
| Lusia guide | https://lusia.azpepoze.com/guide |
