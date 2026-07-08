import { test, expect } from '@playwright/test';

test.describe('Registration', () => {
  test('shows a mismatch error and blocks submit when passwords differ', async ({ page }) => {
    await page.goto('/register');

    // Force French: labels below are asserted in French.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');

    await expect(page.locator('label:has-text("Confirmer le mot de passe")')).toBeVisible();

    const suffix = Date.now();
    await page.fill('input[type="text"] >> nth=0', 'Proba');
    await page.fill('input[type="text"] >> nth=1', 'Register');
    await page.fill('input[type="email"]', `proba.register.${suffix}@email.com`);
    await page.fill('input[type="password"] >> nth=0', 'Password123');
    await page.fill('input[type="password"] >> nth=1', 'Password124');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Les mots de passe ne correspondent pas')).toBeVisible();
    await expect(page).toHaveURL('/register');
  });

  test('registers a new user, logs in automatically and redirects home', async ({ page }) => {
    await page.goto('/register');

    const suffix = Date.now();
    const email = `proba.register.${suffix}@email.com`;
    await page.fill('input[type="text"] >> nth=0', 'Proba');
    await page.fill('input[type="text"] >> nth=1', 'Register');
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"] >> nth=0', 'Password123');
    await page.fill('input[type="password"] >> nth=1', 'Password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/', { timeout: 10000 });
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();

    await expect(page.locator('button:has(svg.lucide-log-out)')).toBeVisible();
  });
});
