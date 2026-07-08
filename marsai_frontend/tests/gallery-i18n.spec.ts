import { test, expect } from '@playwright/test';

test.describe('Home gallery i18n', () => {
  test('translates title, search placeholder and selected-count label between FR and EN', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Force French first.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(page.getByRole('heading', { name: 'Films en Compétition' })).toBeVisible();
    await expect(page.locator('input#searchbar')).toHaveAttribute('placeholder', 'Rechercher un film...');
    await expect(page.locator('text=/\\d+ films? sélectionnés?/')).toBeVisible();

    // Switch to English: every one of those strings must translate too.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("English")');
    await expect(page.getByRole('heading', { name: 'Films in Competition' })).toBeVisible();
    await expect(page.locator('input#searchbar')).toHaveAttribute('placeholder', 'Search for a film...');
    await expect(page.locator('text=/\\d+ films? selected/')).toBeVisible();
  });
});
