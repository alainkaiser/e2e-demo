import { web } from '@e2e-dev/web'
import type { E2EConfig } from 'e2e'
import { chatgpt } from 'e2e/oauth/chatgpt'

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
      model: chatgpt('gpt-6-luna'),
      context: 'A coffee ordering app. Prices are in Swiss francs (CHF).',
    },
  },
} satisfies E2EConfig
