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

test.describe('Submission Moderation', () => {
  test('Admin can approve a pending submission and it appears in the public gallery', async ({ page, request }) => {
    // 0. Seed a fresh pending submission via the real submission endpoint so the test
    // does not depend on the current state of pre-existing seed data.
    const uniqueTitle = `Moderation Test Film ${Date.now()}`;
    const submissionPayload = {
      director: {
        firstname: 'Test',
        lastname: 'Moderation',
        email: `moderation.test.${Date.now()}@email.com`,
      },
      movie: {
        title: uniqueTitle,
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
      collaborators: [],
    };

    const submitRes = await request.post(`${API_URL}/api/submissions`, {
      multipart: {
        data: JSON.stringify(submissionPayload),
      },
    });
    expect(submitRes.ok()).toBeTruthy();

    // 1. Login as admin
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');

    // 2. Anonymous request to the moderation listing must be rejected
    const anonModeration = await request.get(`${API_URL}/movies?status=all`);
    expect(anonModeration.status()).toBe(401);

    // 3. Go to admin dashboard, submissions tab (default)
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');

    // Force French state: table labels below are asserted in French.
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');

    const row = page.locator('tbody tr', { hasText: uniqueTitle });
    await expect(row).toBeVisible({ timeout: 10000 });
    await expect(row).toContainText('En attente');

    // 4. Approve it
    await row.locator('button[title="Approuver"]').click();
    await expect(row).toContainText('Validé', { timeout: 10000 });

    // 5. It must now show up in the public gallery API response
    await expect(async () => {
      const galleryRes = await request.get(`${API_URL}/movies`);
      const galleryBody = (await galleryRes.json()) as { data: { title: string }[] };
      expect(galleryBody.data.some((m) => m.title === uniqueTitle)).toBeTruthy();
    }).toPass({ timeout: 5000 });
  });

  test('Non-admin cannot list unmoderated submissions', async ({ request }) => {
    const login = await request.post(`${API_URL}/auth/login`, {
      data: { email: 'albert.einstein@email.com', password: 'password123' },
    });
    const { token } = (await login.json()) as { token: string };

    const res = await request.get(`${API_URL}/movies?status=all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(403);
  });
});
