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

test.describe('Admin sidebar i18n', () => {
  test('shows the translated last-check label instead of the raw key', async ({ page }) => {
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');

    // Force French: the label below is asserted in French.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');

    const sidebarText = await page.locator('aside').innerText();
    expect(sidebarText).not.toContain('admin.lastCheck');
    expect(sidebarText).not.toContain('admin.systemStatus');
    expect(sidebarText).toContain('Dernière vérif.');
  });
});
