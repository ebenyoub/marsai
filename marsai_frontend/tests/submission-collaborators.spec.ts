import { expect, test } from '@playwright/test';

const draftData = {
  civility: 'Mme',
  firstName: 'Draft',
  lastName: 'Director',
  birthDate: '1990-02-03',
  email: 'draft.collaborators@example.com',
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
  title: 'Collaborator Draft Film',
  titleEn: 'Collaborator Draft Film EN',
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

const draftCollaborators = [
  {
    id: '1',
    firstname: 'Initial',
    lastname: 'Member',
    job: 'Editor',
    email: 'initial.member@example.com',
  },
];

test('Film submission collaborators can be edited, deleted, restored and submitted', async ({ page }) => {
  let submittedBody = '';

  await page.route('**/api/submissions', async route => {
    submittedBody = route.request().postData() ?? '';
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: { movieId: 123, directorId: 456 } }),
    });
  });

  await page.goto('/');
  await page.evaluate(
    ({ data, collaborators }) => {
      localStorage.setItem('marsai_step', '5');
      localStorage.setItem('marsai_data', JSON.stringify(data));
      localStorage.setItem('marsai_collaborators', JSON.stringify(collaborators));
    },
    { data: draftData, collaborators: draftCollaborators }
  );

  await page.goto('/submit');
  await expect(page.locator('h2')).toContainText('5');
  await expect(page.locator('text=/Collaborateur #1|Team Member #1/')).toBeVisible();

  await page.locator('input').nth(0).fill('Grace');
  await page.locator('input').nth(1).fill('Hopper');
  await page.locator('input').nth(2).fill('Technical advisor');
  await page.locator('input').nth(3).fill('grace.hopper@example.com');

  await page.getByRole('button', { name: /ajouter un collaborateur|add team member/i }).click();
  await expect(page.locator('text=/Collaborateur #2|Team Member #2/')).toBeVisible();
  await page.locator('input').nth(4).fill('Deleted');
  await page.locator('input').nth(5).fill('Member');
  await page.locator('input').nth(6).fill('Producer');
  await page.locator('input').nth(7).fill('deleted.member@example.com');

  await page.getByRole('button', { name: /supprimer collaborateur #2|delete team member #2/i }).click();
  await expect(page.locator('text=/Collaborateur #2|Team Member #2/')).toHaveCount(0);

  await page.getByRole('button', { name: /précédent|previous/i }).click();
  await expect(page.locator('h2')).toContainText('4');
  await page.locator('input[type="file"]').first().setInputFiles({
    name: 'thumbnail.png',
    mimeType: 'image/png',
    buffer: Buffer.from('valid-thumbnail'),
  });
  await page.getByRole('button', { name: /suivant|next/i }).click();

  await expect(page.locator('h2')).toContainText('5');
  await expect(page.locator('input').nth(0)).toHaveValue('Grace');
  await expect(page.locator('input').nth(1)).toHaveValue('Hopper');
  await expect(page.locator('input').nth(2)).toHaveValue('Technical advisor');
  await expect(page.locator('input').nth(3)).toHaveValue('grace.hopper@example.com');

  await page.reload();
  await expect(page.locator('h2')).toContainText('5');
  await expect(page.locator('input').nth(0)).toHaveValue('Grace');
  await expect(page.locator('input').nth(1)).toHaveValue('Hopper');
  await expect(page.locator('input').nth(2)).toHaveValue('Technical advisor');
  await expect(page.locator('input').nth(3)).toHaveValue('grace.hopper@example.com');

  await page.getByRole('button', { name: /soumettre le film|submit film/i }).click();
  await page.waitForURL('/success');

  const collaboratorsDraft = await page.evaluate(() => localStorage.getItem('marsai_collaborators'));
  expect(collaboratorsDraft).toBeNull();

  expect(submittedBody).toContain('"collaborators"');
  expect(submittedBody).toContain('"firstname":"Grace"');
  expect(submittedBody).toContain('"lastname":"Hopper"');
  expect(submittedBody).toContain('"job":"Technical advisor"');
  expect(submittedBody).toContain('"email":"grace.hopper@example.com"');
  expect(submittedBody).not.toContain('deleted.member@example.com');
});
