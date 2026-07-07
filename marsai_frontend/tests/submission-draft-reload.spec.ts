import { expect, test } from '@playwright/test';

const validDraftData = {
  civility: 'Mme',
  firstName: 'Draft',
  lastName: 'Director',
  birthDate: '1990-02-03',
  email: 'draft.director@example.com',
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
  title: 'Draft Film',
  titleEn: 'Draft Film EN',
  synopsis: 'Synopsis restauré',
  synopsisEn: 'Restored synopsis',
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

test.describe('Film submission draft reload', () => {
  test('opens step 1 empty and does not create an empty draft when no draft exists', async ({ page }) => {
    await page.goto('/submit');

    await expect(page.locator('h2')).toContainText('1');
    await expect(page.locator('input[name="firstName"]')).toHaveValue('');

    const storageState = await page.evaluate(() => ({
      step: localStorage.getItem('marsai_step'),
      data: localStorage.getItem('marsai_data'),
    }));

    expect(storageState).toEqual({ step: null, data: null });
  });

  test('rejects a saved step when the associated data is missing', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('marsai_step', '4');
      localStorage.removeItem('marsai_data');
    });

    await page.goto('/submit');

    await expect(page.locator('h2')).toContainText('1');
    await expect(page.locator('input[name="firstName"]')).toHaveValue('');

    const storageState = await page.evaluate(() => ({
      step: localStorage.getItem('marsai_step'),
      data: localStorage.getItem('marsai_data'),
    }));

    expect(storageState).toEqual({ step: null, data: null });
  });

  test('restores both saved step and saved data for a valid draft', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(data => {
      localStorage.setItem('marsai_step', '3');
      localStorage.setItem('marsai_data', JSON.stringify(data));
    }, validDraftData);

    await page.goto('/submit');

    await expect(page.locator('h2')).toContainText('3');
    await expect(page.locator('textarea[name="techStack"]')).toHaveValue(validDraftData.techStack);
    await expect(page.locator('textarea[name="methodology"]')).toHaveValue(validDraftData.methodology);

    await page.getByRole('button', { name: /précédent|previous/i }).click();
    await expect(page.locator('h2')).toContainText('2');
    await expect(page.locator('input[name="title"]')).toHaveValue(validDraftData.title);
    await expect(page.locator('input[name="semanticTags"]')).toHaveValue('AI, Cinema');

    await page.getByRole('button', { name: /précédent|previous/i }).click();
    await expect(page.locator('h2')).toContainText('1');
    await expect(page.locator('input[name="firstName"]')).toHaveValue(validDraftData.firstName);
    await expect(page.locator('input[name="email"]')).toHaveValue(validDraftData.email);
  });
});
