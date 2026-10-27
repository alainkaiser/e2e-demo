import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

// One goal per agent.act, then a check. The check lets the next run replay the goal.
test('a guest orders two cappuccinos with a promo code', async ({
  app,
  agent,
  screen,
}) => {
  await app.open('/')

  await agent.act('add two cappuccinos to the order')
  await expect(screen.getByRole('status', 'Total')).toHaveText('CHF 9.60')

  await agent.act('apply the promo code {code}', {
    params: { code: 'SITEWERK' },
  })
  await expect(screen.getByRole('status', 'Total')).toHaveText('CHF 8.64')

  await agent.act('place the order')
  await expect(screen.getByRole('heading', 'Order confirmed')).toBeVisible()

  await agent.assert('the confirmation shows an order number')
})
