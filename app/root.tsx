import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { Toaster } from 'sonner'
import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '16x16 32x32 48x48' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
  { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0ca3a5' },
  { rel: 'manifest', href: '/site.webmanifest' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CH" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#063b52" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="isolate">{children}</div>
        <Toaster position="bottom-center" richColors />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function HydrateFallback() {
  return <div className="min-h-dvh" />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 p-6">
      <h1 className="font-semibold text-2xl">
        {notFound ? 'Page not found' : 'Something went wrong'}
      </h1>
      <p className="text-muted-foreground">
        {notFound
          ? 'This address doesn’t exist in this prototype.'
          : 'Reload the page. If the error stays, tell the agent what you did.'}
      </p>
      {import.meta.env.DEV && error instanceof Error && (
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          {error.stack}
        </pre>
      )}
    </main>
  )
}
