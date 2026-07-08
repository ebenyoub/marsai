import { test, expect } from '@playwright/test';

test.describe('Footer i18n', () => {
  test('never renders a raw translation key, in French or English', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Force French first.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    let footerText = await page.locator('footer').innerText();
    expect(footerText).not.toContain('footer.');
    expect(footerText).toContain('À propos');
    expect(footerText).toContain('Contact');

    // Switch to English.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("English")');
    footerText = await page.locator('footer').innerText();
    expect(footerText).not.toContain('footer.');
    expect(footerText).toContain('About');
    expect(footerText).toContain('Contact');
  });
});
