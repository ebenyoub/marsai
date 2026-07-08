import { test, expect } from '@playwright/test';

// PBI 042 — pressing Enter must submit the auth forms (implicit form submission).
// Guards the <form onSubmit> + type="submit" wiring against regressions
// (e.g. a Button refactor dropping the spread `type` prop, or onClick-only handlers).
test.describe('Login: submit with Enter key', () => {
  test('Enter in the password field submits and logs in', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'albert.einstein@email.com');
    await page.fill('input[type="password"]', 'password123');
    await page.press('input[type="password"]', 'Enter');

    await expect(page).toHaveURL('/');
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('Enter in the email field also submits', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'albert.einstein@email.com');
    await page.fill('input[type="password"]', 'password123');
    await page.press('input[type="email"]', 'Enter');

    await expect(page).toHaveURL('/');
  });

  test('Enter on the register form triggers submission (validation errors shown)', async ({ page }) => {
    await page.goto('/register');

    // Empty form + Enter: submission must run and surface the zod errors,
    // proving the register form is also submittable via keyboard.
    await page.press('input[type="email"]', 'Enter');

    await expect(page.locator('p.text-red-500').first()).toBeVisible();
    await expect(page).toHaveURL('/register');
  });
});
