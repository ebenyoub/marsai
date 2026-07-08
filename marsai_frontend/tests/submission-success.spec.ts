import { test, expect } from '@playwright/test';

test.describe('Submission Success page', () => {
  test('shows the full confirmation message in French and English, and returns home', async ({ page }) => {
    await page.goto('/success');

    // Force French first: every visible string must be French, not just the title.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(page.locator('text=Votre film a été soumis avec succès')).toBeVisible();
    await expect(
      page.locator("text=Merci d'avoir participé à l'aventure marsAI. Votre œuvre est maintenant en cours de traitement."),
    ).toBeVisible();

    // Switch to English: both the title and the description must translate.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("English")');
    await expect(page.locator('text=Your film has been submitted successfully')).toBeVisible();
    await expect(
      page.locator('text=Thank you for taking part in the marsAI adventure. Your work is now being processed.'),
    ).toBeVisible();

    await page.click('button:has-text("Home")');
    await expect(page).toHaveURL('/');
  });
});
