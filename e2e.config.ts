import { web } from '@e2e-dev/web'
import { gateway } from 'ai'
import type { E2EConfig } from 'e2e'
import { chatgpt } from 'e2e/oauth/chatgpt'

// On your machine the demo uses the ChatGPT login from `npx e2e login openai`.
// GitHub Actions sets CI and uses Vercel AI Gateway, which reads AI_GATEWAY_API_KEY.
const model = process.env.CI
  ? gateway('openai/gpt-6-luna-fast')
  : chatgpt('gpt-6-luna')

export default {
  targets: [
    {
      engine: web(),
      app: {
        url: 'http://127.0.0.1:4317',
        command: {
          executable: 'npm',
          args: ['run', 'dev'],
          reuseExisting: true,
        },
      },
    },
  ],
  agents: {
    default: {
      model,
      context: 'A coffee ordering app. Prices are in Swiss francs (CHF).',
    },
  },
} satisfies E2EConfig
