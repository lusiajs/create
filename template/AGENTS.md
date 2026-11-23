# AGENTS.md

This app is built with Lusia, a UI framework for Bun. Each component is one `.lusia` file.

## AI docs

- Short index: https://lusia.azpepoze.com/llms.txt
- Full docs in one file: https://lusia.azpepoze.com/llms-full.txt

## Key rules

1. Flow tags: `<IF {a}> ... <ELSEIF {b}> ... <ELSE> ... </IF>`. Use one closing `</IF>`.
2. State: create it with `variable(...)`, then read and write it with `.value`.
3. Events: `onclick={fn}`.
4. Form inputs: `bind-value={name}`.
5. Indent code inside `<script>` and `<style>` by 2 spaces.
