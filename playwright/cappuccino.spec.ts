import { expect, test } from '@playwright/test';

test('a guest orders two cappuccinos', async ({ page }) => {
  await page.goto('/');
  const cappuccino = page.getByRole('listitem').filter({ hasText: 'Cappuccino' });
  await cappuccino.getByRole('button', { name: 'Add to order' }).click();
  await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
  await expect(page.getByRole('status', { name: 'Total' })).toHaveText('CHF 9.60');
  await expect(page.getByLabel('Cappuccino quantity')).toHaveText('2');
});
