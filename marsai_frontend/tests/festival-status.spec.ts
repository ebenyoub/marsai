import { test, expect, Page } from '@playwright/test';

const API_URL = 'http://localhost:3002';

async function authenticateAs(page: Page, email: string, password: string) {
  const response = await page.request.post(`${API_URL}/auth/login`, {
    data: { email, password },
  });
  expect(response.ok()).toBeTruthy();

  const result = (await response.json()) as { token: string };
  await page.goto('/');
  await page.evaluate((token) => {
    localStorage.setItem('token', token);
  }, result.token);
  await page.reload();
  await page.waitForSelector('button:has(svg.lucide-log-out)', { timeout: 10000 });
}

test.describe('Super Admin Flow: Festival status', () => {
  test('only offers the two statuses the backend supports, and persists across a reload', async ({ page }) => {
    await authenticateAs(page, 'ada.lovelace@email.com', 'password123');
    await page.goto('/superadmin');
    await expect(page).toHaveURL('/superadmin');

    const festivalItem = page.locator('h3').first();
    await festivalItem.click();

    const dialog = page.getByRole('dialog');
    const statusTrigger = dialog.getByRole('combobox');

    // Backend only has 'Actif'/'Inactif' — a third "À venir" choice used to be offered
    // here but could never actually be saved.
    await statusTrigger.click();
    await expect(page.getByRole('option', { name: 'Actif' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Archivé' })).toBeVisible();
    await expect(page.getByRole('option')).toHaveCount(2);

    await page.getByRole('option', { name: 'Archivé' }).click();
    await page.click('button:has-text("Enregistrer les modifications")');
    await page.reload();

    await festivalItem.click();
    await expect(dialog.getByRole('combobox')).toContainText('Archivé');

    // Restore the original status so later tests relying on an active festival
    // (e.g. branding configuration) aren't affected by this one.
    await dialog.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Actif' }).click();
    await page.click('button:has-text("Enregistrer les modifications")');
    await page.reload();

    await festivalItem.click();
    await expect(dialog.getByRole('combobox')).toContainText('Actif');
  });
});
