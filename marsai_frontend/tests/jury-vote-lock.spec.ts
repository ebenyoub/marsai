import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:3002';

// PBI 040 — a submitted jury vote is final: recorded in DB, then locked.
// API-level test: deterministic on every run (first run inserts, later runs
// hit the lock immediately — both paths assert the same guarantees).
test.describe('Jury vote: recorded then locked', () => {
  test('vote is stored and any re-vote is rejected with a clear message', async ({ request }) => {
    const login = await request.post(`${API_URL}/auth/login`, {
      data: { email: 'marie.curie@email.com', password: 'password123' },
    });
    expect(login.ok()).toBeTruthy();
    const { token } = await login.json();

    const vote = {
      user_id: 2,
      movie_id: 2,
      score_creativity: 7,
      score_technical: 8,
      score_message: 6,
      comment: 'Vote verrouillé PBI 040',
      score_total: 7,
    };
    const headers = { Authorization: `Bearer ${token}` };

    // First call: 201 on a fresh DB, 409 if this jury already voted this movie.
    const first = await request.post(`${API_URL}/rating`, { data: vote, headers });
    expect([201, 409]).toContain(first.status());

    // The vote must be stored and readable back.
    const stored = await request.get(`${API_URL}/rating/movie/${vote.movie_id}`, { headers });
    expect(stored.ok()).toBeTruthy();
    const storedBody = await stored.json();
    expect(storedBody.data).toBeTruthy();
    expect(storedBody.data.comment).toBeTruthy();

    // Any further vote on the same movie must be rejected with a clear message.
    const revote = await request.post(`${API_URL}/rating`, {
      data: { ...vote, comment: 'tentative de modification', score_total: 1 },
      headers,
    });
    expect(revote.status()).toBe(409);
    const revoteBody = await revote.json();
    expect(revoteBody.message).toContain('déjà voté');

    // And the stored vote must be unchanged.
    const after = await request.get(`${API_URL}/rating/movie/${vote.movie_id}`, { headers });
    const afterBody = await after.json();
    expect(afterBody.data.comment).toBe(storedBody.data.comment);
    expect(afterBody.data.score_total).toBe(storedBody.data.score_total);
  });

  test('validation errors surface a real message, not "API Error"', async ({ request }) => {
    const login = await request.post(`${API_URL}/auth/login`, {
      data: { email: 'marie.curie@email.com', password: 'password123' },
    });
    const { token } = await login.json();

    // Empty comment: the zod schema rejects it — the response must carry a
    // usable message (api.ts now falls back to errors[0].message).
    const res = await request.post(`${API_URL}/rating`, {
      data: {
        user_id: 2,
        movie_id: 3,
        score_creativity: 5,
        score_technical: 5,
        score_message: 5,
        comment: '',
        score_total: 5,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.errors?.[0]?.message).toBe('Le commentaire est obligatoire');
  });
});
