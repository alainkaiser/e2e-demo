import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

// Locators only: no agent step, so no model call.
test('shows the menu and an empty order', async ({ app, screen }) => {
  await app.open('/')

  await expect(screen.getByRole('heading', 'Menu')).toBeVisible()
  await expect(screen.getByText('Your order is empty.')).toBeVisible()
  await expect(screen.getByRole('status', 'Total')).toHaveText('CHF 0.00')
})

test('adds an espresso', async ({ app, screen }) => {
  await app.open('/')

  const espresso = screen.getByRole('listitem').filter({ hasText: 'Espresso' })
  await espresso.getByRole('button', 'Add to order').tap()

  await expect(screen.getByRole('status', 'Total')).toHaveText('CHF 3.50')
})
