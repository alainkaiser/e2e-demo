import type { Config } from '@react-router/dev/config'

export default {
  // Vercel serves prototypes as static files, so pages render in the browser.
  ssr: false,
} satisfies Config
