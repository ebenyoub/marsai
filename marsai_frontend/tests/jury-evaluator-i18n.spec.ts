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

test.describe('Jury evaluator i18n', () => {
  test('translates the AI identity card and rating sections between FR and EN', async ({ page }) => {
    await authenticateAs(page, 'marie.curie@email.com', 'password123');
    await page.goto('/jury');
    await page.waitForSelector('textarea', { state: 'visible', timeout: 15000 });

    // Force French first.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(page.getByRole('heading', { name: "Carte d'Identité IA" })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Votre Évaluation' })).toBeVisible();
    await expect(page.locator('button:has-text("Soumettre l\'Évaluation")')).toBeVisible();

    // Switch to English: every one of those strings must translate too.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("English")');
    await expect(page.getByRole('heading', { name: 'AI Identity Card' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your Rating' })).toBeVisible();
    await expect(page.locator('button:has-text("Submit Rating")')).toBeVisible();
  });
});
