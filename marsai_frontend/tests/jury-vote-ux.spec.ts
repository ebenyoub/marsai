import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:3002';

// PBI 041 — post-vote UX: voted badge in the film list, locked evaluator UI.
test.describe('Jury post-vote UX', () => {
  test('voted film shows a green badge and a fully locked evaluator', async ({ page }) => {
    // Ensure the jury has voted the first film (201 on fresh DB, 409 otherwise).
    const login = await page.request.post(`${API_URL}/auth/login`, {
      data: { email: 'marie.curie@email.com', password: 'password123' },
    });
    const { token } = await login.json();
    const seed = await page.request.post(`${API_URL}/rating`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        user_id: 2,
        movie_id: 1,
        score_creativity: 8,
        score_technical: 7,
        score_message: 9,
        comment: 'Vote UX PBI 041',
        score_total: 8,
      },
    });
    expect([201, 409]).toContain(seed.status());

    await page.goto('/');
    await page.evaluate(t => localStorage.setItem('token', t), token);
    await page.goto('/jury');
    await page.waitForSelector('textarea', { state: 'visible', timeout: 15000 });

    // Force French for deterministic labels.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');

    // Sidebar: green "Voté" badge on the voted film, real progress counter.
    const sidebar = page.locator('aside');
    await expect(sidebar.locator('span', { hasText: 'Voté' }).first()).toBeVisible();
    await expect(sidebar.getByText(/[1-9]\d*\/\d+ films évalués/)).toBeVisible();

    // Evaluator (film 1 is active by default): locked UI.
    await expect(page.getByTestId('vote-locked-banner')).toBeVisible();
    await expect(page.getByTestId('vote-locked-banner')).toContainText('Vote déjà enregistré');
    await expect(page.locator('textarea')).toHaveAttribute('readonly', '');
    await expect(page.getByRole('button', { name: 'Vote déjà enregistré' })).toBeDisabled();
    await expect(page.locator('input[type="range"]').first()).toBeDisabled();
  });
});
