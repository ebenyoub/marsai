import { expect, test } from '@playwright/test';

test('Film submission form reset clears draft and returns to step 1', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('marsai_step', '3');
    localStorage.setItem(
      'marsai_data',
      JSON.stringify({
        firstName: 'Draft',
        lastName: 'User',
        email: 'draft@example.com',
        title: 'Draft movie',
      })
    );
  });

  await page.goto('/submit');
  await expect(page.locator('h2')).toContainText('3');

  await page.getByRole('button', { name: /réinitialiser le formulaire|reset form/i }).click();

  await expect(page.locator('h2')).toContainText('1');
  await expect(page.locator('input[name="firstName"]')).toHaveValue('');
  await expect(page.locator('input[name="lastName"]')).toHaveValue('');
  await expect(page.locator('input[name="email"]')).toHaveValue('');

  const storageState = await page.evaluate(() => ({
    step: localStorage.getItem('marsai_step'),
    data: localStorage.getItem('marsai_data'),
  }));

  expect(storageState).toEqual({ step: null, data: null });
});
