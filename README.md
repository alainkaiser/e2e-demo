# Coffee Bar

A coffee ordering app on the Sitewerk prototype stack, with [e2e](https://e2e.tester.army/docs) tests. It is the starter from the talk "Agentic testing with e2e".

This repository is a read-only reference. Clone or fork it and make changes in your own repository. Contributions, pull requests, issue reports and support requests are not accepted. Set up your own CI and deployment if you need them.

The app is React Router, Tailwind and Base UI, the same stack as `labs-sw-projects/prototype-template`. `AGENTS.md` says how that stack is put together. `BRIEF.md` says what this demo is for.

- `app/`: the Coffee Bar. The button label the live demo renames is `ADD_LABEL` in `app/data/menu.ts`.
- `tests/menu.e2e.ts`: locator tests. No model, no API key.
- `tests/order.e2e.ts`: an agent test. One goal, then an exact check.
- `playwright/cappuccino.spec.ts`: the Playwright test from the slide. `npx playwright test --headed` shows the browser. The live demo does not run it.
- `e2e.config.ts`: one web target. The runner starts `npm run dev` on port 4317.

## Run it

You need Node.js 24.8 or newer.

```bash
npm install
npx e2e-web install chromium
npx e2e run tests/menu.e2e.ts
```

The two locator tests pass without a model. To look at the app, run `npm run dev` and open http://127.0.0.1:4317.

## Add a model

Agent steps on your machine use the ChatGPT login:

```bash
npx e2e login openai
```

Each person signs in with their own ChatGPT account. e2e stores the login in the user profile, outside this repository. The config uses `chatgpt('gpt-6-luna')`.

Replay caches, reports, screenshots and other test output stay local and are ignored by Git.

## Things to try

1. **Run the agent test twice.**
   ```bash
   npx e2e run tests/order.e2e.ts --headed
   ```
   The first run calls the model for every goal and records the actions. Run it again: the `Cache` line says `replayed`, and only `agent.assert` calls the model.
2. **Change the UI.** In `app/data/menu.ts`, change `ADD_LABEL` from `'Add to order'` to `'Add'`, then run `npx e2e run`. The locator test fails with `LOCATOR_NOT_FOUND`. The agent test hands off to the agent, passes, and records the new path. Change the label back when you're done.
3. **Explore.** The app has three planted bugs.
   ```bash
   npx e2e explore "Order coffee like a first-time customer: add items, change quantities, try the promo code SITEWERK. Report anything off. Stop before placing the order." --headed
   ```
   Check each finding against its evidence. The agent can be wrong.

<details>
<summary>Spoiler: the planted bugs</summary>

- Applying `SITEWERK` again takes another 10% off each time.
- The minus button takes a quantity below zero, and the total goes negative.
- The receipt checkbox says "Recieve".

</details>

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the app at http://127.0.0.1:4317 |
| `npm run check` | Lint, typecheck and build |
| `npx e2e run --no-cache` | Run every agent goal live, ignoring recordings |
| `npx e2e cache ls` | List the recordings in `.e2e/cache/` |
| `npx e2e cache clear` | Delete every recording |
| `npx e2e telemetry disable` | Stop sending anonymous usage data |
