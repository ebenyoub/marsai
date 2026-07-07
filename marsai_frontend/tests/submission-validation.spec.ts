import { Buffer } from 'node:buffer';
import { expect, Page, test } from '@playwright/test';

const validIdentityData = {
  civility: 'Mme',
  firstName: 'Validation',
  lastName: 'Director',
  birthDate: '1990-02-03',
  email: 'validation.director@example.com',
  mobile: '0600000000',
  address: '1 rue du Cinema',
  postCode: '13001',
  city: 'Marseille',
  country: 'France',
  job: 'Director',
  youtube: '',
  instagram: '',
  linkedin: '',
  facebook: '',
  twitter: '',
  source: 'search',
  newsletter: true,
};

const validDraftData = {
  ...validIdentityData,
  title: 'Validation Film',
  titleEn: 'Validation Film EN',
  synopsis: 'Synopsis valide',
  synopsisEn: 'Valid synopsis',
  duration: '60',
  language: 'French',
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  hasSubtitles: true,
  techStack: 'Runway, Midjourney',
  methodology: 'Generated and edited with AI tools.',
  deploymentType: '100',
  aiClassification: 'hybrid',
  semanticTags: ['AI', 'Cinema'],
  thumbnail: null,
  gallery: [],
};

const setDraft = async (page: Page, step: string, data: unknown) => {
  await page.goto('/');
  await page.evaluate(
    ({ savedStep, savedData }) => {
      localStorage.setItem('marsai_step', savedStep);
      localStorage.setItem('marsai_data', JSON.stringify(savedData));
      localStorage.removeItem('marsai_collaborators');
    },
    { savedStep: step, savedData: data }
  );
  await page.goto('/submit');
};

test.describe('Film submission validation', () => {
  test('validates required fields, email and social URLs on identity step', async ({ page }) => {
    await page.goto('/submit');
    await page.click('button[type="submit"]');

    await expect(page.locator('h2')).toContainText('1');
    await expect(page.getByText(/obligatoire|required/i).first()).toBeVisible();

    await page.fill('input[name="firstName"]', 'Ada');
    await page.fill('input[name="lastName"]', 'Lovelace');
    await page.fill('input[name="birthDate"]', '1815-12-10');
    await page.fill('input[name="email"]', 'not-an-email');
    await page.fill('input[name="mobile"]', '0600000000');
    await page.fill('input[name="address"]', '1 Algorithm Street');
    await page.fill('input[name="postCode"]', '13001');
    await page.fill('input[name="city"]', 'Marseille');
    await page.fill('input[name="country"]', 'France');
    await page.fill('input[name="job"]', 'Director');
    await page.fill('input[name="instagram"]', 'instagram.com/marsai');
    await page.selectOption('select[name="source"]', 'search');
    await page.click('button[type="submit"]');

    await expect(page.getByText(/email valide|valid email/i)).toBeVisible();
    await expect(page.getByText(/URL invalide|Invalid URL/i)).toBeVisible();
  });

  test('validates movie duration step by step', async ({ page }) => {
    await setDraft(page, '2', validIdentityData);

    await page.fill('input[name="title"]', 'A title');
    await page.fill('input[name="titleEn"]', 'A title EN');
    await page.fill('input[name="duration"]', '61');
    await page.fill('input[name="language"]', 'French');
    await page.fill('input[name="semanticTags"]', 'AI');
    await page.fill('textarea[name="synopsis"]', 'Synopsis');
    await page.fill('textarea[name="synopsisEn"]', 'Synopsis EN');
    await page.click('button[type="submit"]');

    await expect(page.locator('h2')).toContainText('2');
    await expect(page.getByText(/durée doit être|Duration must/i)).toBeVisible();
  });

  test('validates YouTube URL and image files on media step', async ({ page }) => {
    await setDraft(page, '4', validDraftData);

    await page.fill('input[name="youtubeUrl"]', 'https://vimeo.com/123');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/doit provenir de YouTube|must be a YouTube link/i)).toBeVisible();

    await page.fill('input[name="youtubeUrl"]', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    await page.click('button[type="submit"]');
    await expect(page.getByText(/obligatoire|required/i).first()).toBeVisible();

    await page.locator('input[type="file"]').first().setInputFiles({
      name: 'thumbnail.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('not an image'),
    });
    await page.click('button[type="submit"]');
    await expect(page.getByText(/fichier doit être|file must be/i)).toBeVisible();

    await page.locator('input[type="file"]').first().setInputFiles({
      name: 'thumbnail.png',
      mimeType: 'image/png',
      buffer: Buffer.from('image'),
    });
    await page.locator('input[type="file"]').nth(1).setInputFiles(
      [1, 2, 3, 4].map(index => ({
        name: `gallery-${index}.png`,
        mimeType: 'image/png',
        buffer: Buffer.from(`image-${index}`),
      }))
    );
    await page.click('button[type="submit"]');
    await expect(page.getByText(/plus de 3|more than 3/i)).toBeVisible();
  });

  test('validates collaborators and final payload before API call', async ({ page }) => {
    let apiCalls = 0;
    await page.route('**/api/submissions', async route => {
      apiCalls += 1;
      await route.fulfill({ status: 201, contentType: 'application/json', body: '{"success":true}' });
    });

    await setDraft(page, '5', { ...validDraftData, duration: '0' });

    page.once('dialog', async dialog => {
      expect(dialog.message()).toMatch(/durée doit être|Duration must/i);
      await dialog.accept();
    });
    await page.getByRole('button', { name: /soumettre le film|submit film/i }).click();
    expect(apiCalls).toBe(0);

    await page.evaluate(data => {
      localStorage.setItem('marsai_data', JSON.stringify(data));
    }, validDraftData);
    await page.reload();
    await page.getByRole('button', { name: /ajouter un collaborateur|add team member/i }).click();
    await page.locator('input').nth(0).fill('Grace');
    await page.locator('input').nth(1).fill('Hopper');
    await page.locator('input').nth(2).fill('Technical advisor');
    await page.locator('input').nth(3).fill('invalid-email');
    await page.getByRole('button', { name: /soumettre le film|submit film/i }).click();

    await expect(page.getByText(/email valide|valid email/i)).toBeVisible();
    expect(apiCalls).toBe(0);
  });
});
