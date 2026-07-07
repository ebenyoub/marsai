import { test, expect, Page } from '@playwright/test';

const API_URL = 'http://localhost:3002';

// Helper to log in reliably and await session storage synchronization
async function loginAs(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  // Wait for the logout button (which has the LogOut icon svg.lucide-log-out) to appear
  await page.waitForSelector('button:has(svg.lucide-log-out)', { timeout: 10000 });
}

async function authenticateAs(page: Page, email: string, password: string) {
  const response = await page.request.post(`${API_URL}/auth/login`, {
    data: { email, password },
  });
  expect(response.ok()).toBeTruthy();

  const result = await response.json() as { token: string };
  await page.goto('/');
  await page.evaluate((token) => {
    localStorage.setItem('token', token);
  }, result.token);
  await page.reload();
  await page.waitForSelector('button:has(svg.lucide-log-out)', { timeout: 10000 });
}

test.describe('MarsAI E2E Test Suite', () => {

  test('User Flow: Login and Film Submission', async ({ page }) => {
    // 1. Login
    await loginAs(page, 'albert.einstein@email.com', 'password123');

    // 2. Navigation to Submit page
    await page.goto('/submit');
    await expect(page).toHaveURL('/submit');

    // Step 1: Identity Info
    await page.fill('input[name="firstName"]', 'Albert');
    await page.fill('input[name="lastName"]', 'Einstein');
    await page.fill('input[type="date"]', '1955-04-18');
    
    const emailSuffix = Date.now();
    await page.fill('input[name="email"]', `albert.einstein.${emailSuffix}@email.com`);
    await page.fill('input[name="mobile"]', '0600000000');
    await page.fill('input[name="address"]', '123 Physics Road');
    await page.fill('input[name="postCode"]', '13001');
    await page.fill('input[name="city"]', 'Marseille');
    await page.fill('input[name="country"]', 'France');
    await page.fill('input[name="job"]', 'Researcher');
    
    // Select dropdown option for "source"
    await page.selectOption('select[name="source"]', 'search');
    
    // Click Next (Submit Step 1)
    await page.click('button[type="submit"]');

    // Step 2: Movie Info
    const movieTitle = `Relativity of Playwright ${emailSuffix}`;
    await page.fill('input[name="title"]', movieTitle);
    await page.fill('input[name="titleEn"]', `${movieTitle} EN`);
    await page.fill('input[name="duration"]', '60');
    await page.fill('input[name="language"]', 'French');
    await page.fill('input[name="semanticTags"]', 'AI, Science, E2E');
    await page.fill('textarea[name="synopsis"]', 'A beautiful E2E tested movie.');
    await page.fill('textarea[name="synopsisEn"]', 'A beautiful E2E tested movie in English.');
    
    // Click Next (Submit Step 2)
    await page.click('button[type="submit"]');

    // Step 3: AI Info
    await page.fill('textarea[name="techStack"]', 'Midjourney, Runway Gen-2');
    await page.fill('textarea[name="methodology"]', 'Text to image generation, then frame interpolation.');
    
    // Click Next (Submit Step 3)
    await page.click('button[type="submit"]');

    // Step 4: Media
    await page.fill('input[name="youtubeUrl"]', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    
    // Click Next (Submit Step 4)
    await page.click('button[type="submit"]');

    // Step 5: Collaborators & Final Submit
    await expect(page.locator('h2')).toContainText('5');
    
    // Final Submit
    await page.click('button[type="submit"]');

    // Redirection to Success page
    await page.waitForURL('/success', { timeout: 10000 });
    await expect(page).toHaveURL('/success');
  });

  test('Jury Flow: Login, Vote, Reset State, Reload verification', async ({ page }) => {
    // 1. Login as Jury
    await authenticateAs(page, 'marie.curie@email.com', 'password123');

    // 2. Go to Jury Panel
    await page.goto('/jury');
    
    // Wait for loader to disappear and textarea to become visible
    await page.waitForSelector('textarea', { state: 'visible', timeout: 15000 });
    
    // 3. Select first film in list (which is active by default)
    const commentInput = page.locator('textarea');
    const uniqueComment = `Formidable court-métrage E2E ${Date.now()}`;
    await commentInput.fill(uniqueComment);
    
    // Register dialog listener BEFORE the click
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    // Submit rating
    await page.click('button:has-text("Soumettre l\'évaluation")');
    
    // Give it a brief moment to finish request
    await page.waitForTimeout(1500);

    // 4. Refresh Page
    await page.reload();
    await page.waitForSelector('textarea', { state: 'visible', timeout: 15000 });
    
    // Verify comment is reloaded
    await expect(commentInput).toHaveValue(uniqueComment);

    // 5. Select another film in sidebar (if there's any other film)
    const otherFilm = page.locator('aside button').nth(1);
    if (await otherFilm.isVisible()) {
      await otherFilm.click();
      await page.waitForTimeout(500);
      
      // The comment field should now be empty (or at least different) for the second film
      const val2 = await commentInput.inputValue();
      expect(val2).not.toBe(uniqueComment);

      // Go back to the first film (index 0)
      await page.locator('aside button').nth(0).click();
      await page.waitForTimeout(500);

      // Comment should be loaded back
      await expect(commentInput).toHaveValue(uniqueComment);
    }
  });

  test('Admin Flow: Moderation Actions (Approve, Reject)', async ({ page }) => {
    // 1. Login as Admin
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');

    // Navigate to admin
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');

    // 2. Locate a pending movie in the table
    // A pending movie has a badge with text "En attente"
    const pendingRow = page.locator('tr:has-text("En attente")').first();
    
    if (await pendingRow.isVisible()) {
      const approveButton = pendingRow.locator('button[title="Approuver"]');
      await approveButton.click();
      
      // Wait for table to reload and check that the row now says "Validé"
      await expect(pendingRow).toContainText('Validé');
    }
  });

  test('Super Admin Flow: Edit Festival name and slug', async ({ page }) => {
    // 1. Login as Super Admin
    await authenticateAs(page, 'ada.lovelace@email.com', 'password123');

    // Navigate to superadmin
    await page.goto('/superadmin');
    await expect(page).toHaveURL('/superadmin');

    // 2. Select first festival card to edit
    const festivalItem = page.locator('h3').first();
    await festivalItem.click();

    // 3. Edit Dialog is opened. Update fields.
    const nameInput = page.locator('#edit-name');
    const slugInput = page.locator('#edit-slug');
    const descInput = page.locator('#edit-description');
    
    const uniqueSuffix = Date.now();
    const newName = `Marseille E2E ${uniqueSuffix}`;
    const newSlug = `marseille-e2e-${uniqueSuffix}`;

    await nameInput.fill(newName);
    // Slug should auto-generate but remain modifiable, we'll override it manually
    await slugInput.fill(newSlug);
    await descInput.fill('Une description modifiée par test E2E Playwright.');

    // Save
    await page.click('button:has-text("Enregistrer les modifications")');
    
    // Refresh page
    await page.reload();

    // Verify it saved
    await festivalItem.click();
    await expect(nameInput).toHaveValue(newName);
    await expect(slugInput).toHaveValue(newSlug);
    await expect(descInput).toHaveValue('Une description modifiée par test E2E Playwright.');
  });

  test('Super Admin Flow: Duplicate Slug error validation', async ({ page }) => {
    // 1. Login as Super Admin
    await authenticateAs(page, 'ada.lovelace@email.com', 'password123');

    // Navigate to superadmin
    await page.goto('/superadmin');
    await expect(page).toHaveURL('/superadmin');

    const festivalsResponse = await page.request.get(`${API_URL}/festivals`);
    const festivalsResult = await festivalsResponse.json() as { data?: { slug: string }[] };
    const existingSlug = festivalsResult.data?.[0]?.slug;

    expect(existingSlug).toBeTruthy();

    // 2. Click the "Créer" tab trigger
    await page.locator('[role="tab"]:has-text("Créer")').click();

    // 3. Fill the creation form
    await page.fill('#name', `Nouveau Festival E2E ${Date.now()}`);
    await page.fill('#city', 'Lyon');
    // Force duplicate slug using the existing slug we just read
    await page.fill('#slug', existingSlug!);

    const dialogPromise = page.waitForEvent('dialog');

    // Save
    await page.click('button:has-text("Créer le Festival")');

    const dialog = await dialogPromise;
    const dialogMessage = dialog.message();
    await dialog.accept();

    // Verify error was handled and alerted nicely
    expect(dialogMessage).toContain('Ce slug de festival est déjà utilisé par un autre festival.');
  });

  test('Video Modal Preview (Embed vs Fallback)', async ({ page }) => {
    // Login as Admin to access submissions table
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');

    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');

    // Find any movie row and click preview
    const row = page.locator('tbody tr').first();
    const previewBtn = row.locator('button[title="Aperçu"]');
    await previewBtn.click();

    // The popup should open
    const popup = page.locator('.fixed.inset-0.z-50');
    await expect(popup).toBeVisible();

    // Check if either the iframe (embed) or the fallback link is rendered
    const iframe = popup.locator('iframe');
    const fallbackLink = popup.locator('a:has-text("Ouvrir la vidéo")');
    
    const hasIframe = await iframe.isVisible();
    const hasFallback = await fallbackLink.isVisible();
    
    expect(hasIframe || hasFallback).toBeTruthy();
  });

});
