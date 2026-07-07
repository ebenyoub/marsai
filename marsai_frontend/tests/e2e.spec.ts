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
    await page.locator('input[type="file"]').first().setInputFiles({
      name: 'thumbnail.png',
      mimeType: 'image/png',
      buffer: Buffer.from('valid-thumbnail'),
    });
    
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
      const movieTitle = await pendingRow.locator('td').nth(1).innerText();
      const approveButton = pendingRow.locator('button[title="Approuver"]');
      await approveButton.click();
      
      // Wait for table to reload and check that the row for this movie now says "Validé"
      const updatedRow = page.locator(`tr:has-text("${movieTitle}")`);
      await expect(updatedRow).toContainText('Validé');
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

  test('Visitor Flow: Film Popup Language Translation', async ({ page }) => {
    // 1. Visit Home
    await page.goto('/');
    
    // Find the first film card in selection and open it
    const filmCard = page.locator('.group.hover\\:shadow-primary\\/20').first();
    await expect(filmCard).toBeVisible();
    await filmCard.click();

    // Verify popup is visible
    const popup = page.locator('.fixed.inset-0.z-50');
    await expect(popup).toBeVisible();

    // In French (default), verify the title or presence of text
    const titleFr = await popup.locator('h2.text-primary').innerText();
    expect(titleFr).toBeTruthy();

    // Close popup
    await page.locator('.fixed.inset-0.z-50 button').first().click();
    await expect(popup).not.toBeVisible();

    // Switch language to English
    // Open language dropdown
    await page.click('button:has(svg.lucide-globe)');
    // Click English item
    await page.click('button:has-text("English")');

    // Re-open the popup
    await filmCard.click();
    await expect(popup).toBeVisible();

    // The title should now be in English (either title_en or fallback to title)
    const titleEn = await popup.locator('h2.text-primary').innerText();
    expect(titleEn).toBeTruthy();
  });

  test('Admin Flow: Sidebar Toggle open and close with i18n support', async ({ page }) => {
    // 1. Login as Admin
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');

    // 2. Go to /admin
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');

    // 3. The sidebar should be open by default
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // 4. Click the close button in the sidebar (first button in aside)
    const closeBtn = sidebar.locator('button').first();
    await closeBtn.click();

    // 5. The sidebar should now be hidden
    await expect(sidebar).toBeHidden();

    // 6. The open toggle button should be visible
    const openBtn = page.locator('main button:has(svg.lucide-menu)');
    await expect(openBtn).toBeVisible();

    // Force French state first
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(openBtn).toContainText('Ouvrir le menu');

    // 7. Test i18n FR -> EN while sidebar is closed
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("English")');
    await expect(openBtn).toContainText('Open Menu');

    // 8. Test i18n EN -> FR while sidebar is closed
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(openBtn).toContainText('Ouvrir le menu');

    // 9. Click open toggle button
    await openBtn.click();

    // 10. Sidebar should be open again
    await expect(sidebar).toBeVisible();
  });

  test('Visitor Flow: Countdown loads active festival and tests inactive fallback i18n', async ({ page }) => {
    // 1. Mock active festival API response
    await page.route('**/festivals', async (route) => {
      // Only mock once or until we change it
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              id: 1,
              name: 'Active Test Festival',
              status: 'Actif',
              start_at: '2029-12-31T23:59:59.000Z',
            },
          ],
        }),
      });
    });

    await page.goto('/');
    const timerGrid = page.locator('[role="timer"]');
    await expect(timerGrid).toBeVisible();
    await expect(timerGrid).toContainText(/jours|days/i);

    // 2. Now test the fallback with mock interception
    await page.route('**/festivals', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [] }),
      });
    });

    await page.goto('/');
    const fallbackSpan = page.locator('span:has-text("Bientôt Disponible"), span:has-text("Coming Soon")');
    await expect(fallbackSpan).toBeVisible();

    // Force French state first
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(page.locator('span:has-text("Bientôt Disponible")')).toBeVisible();

    // Test FR -> EN
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("English")');
    await expect(page.locator('span:has-text("Coming Soon")')).toBeVisible();

    // Test EN -> FR
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(page.locator('span:has-text("Bientôt Disponible")')).toBeVisible();
  });

  test('Admin Flow: Dashboard Stats and i18n support', async ({ page }) => {
    // 1. Login as Admin
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');

    // 2. Go to /admin
    await page.goto('/admin');
    await expect(page).toHaveURL('/admin');

    // 3. Stats grid cards should be visible
    const statsGrid = page.locator('div.flex-col.md\\:flex-row.w-full');
    await expect(statsGrid).toBeVisible();

    // 4. Force French state first
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(statsGrid).toContainText('Films au Total');

    // 5. Test FR -> EN
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("English")');
    await expect(statsGrid).toContainText('Total Films');

    // 6. Test EN -> FR
    await page.click('button:has(svg.lucide-globe)');
    await page.click('button:has-text("Français")');
    await expect(statsGrid).toContainText('Films au Total');

    // 7. Verify that the values inside the cards are numbers
    const totalFilmsValue = await statsGrid.locator('div.text-3xl.font-bold.text-primary').first().innerText();
    expect(Number(totalFilmsValue)).not.toBeNaN();
  });

  test('Admin Flow: Branding Configuration and Save', async ({ page }) => {
    // 1. Intercept GET /festivals to return a mock active festival
    await page.route('**/festivals', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            data: [
              {
                id: 1,
                name: 'Marseille 2026',
                description: 'Description de test',
                start_at: '2026-03-01T09:00:00.000Z',
                end_at: '2026-03-15T23:59:59.000Z',
                status: 'Actif',
                booking_total: 3000,
                slug: 'festival-2026',
                city: 'Marseille',
                logo_url: null,
                primary_color: '#00F2FF',
                youtube_api_key: 'old-key',
              },
            ],
          }),
        });
      } else {
        await route.continue();
      }
    });

    // 2. Intercept PUT /festivals/1
    interface BrandingPayload {
      primary_color?: string;
      youtube_api_key?: string;
    }
    let putPayload: BrandingPayload | null = null;
    await page.route('**/festivals/1', async (route) => {
      if (route.request().method() === 'PUT') {
        putPayload = route.request().postDataJSON() as BrandingPayload;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'Updated' }),
        });
      } else {
        await route.continue();
      }
    });

    // 3. Login as Admin
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');
    await page.goto('/admin');

    // 4. Go to Branding Tab
    const brandingTab = page.locator('[role="tab"]:has-text("Branding"), [role="tab"]:has-text("Identité")');
    await expect(brandingTab).toBeVisible();
    await brandingTab.click();

    // 5. Fill new primary color and youtube key
    const colorInput = page.locator('#primaryColor');
    await expect(colorInput).toBeVisible();
    await colorInput.fill('#FF0055');

    const youtubeInput = page.locator('#youtubeKey');
    await youtubeInput.fill('new-api-key');

    // 6. Click Save
    let alertText = '';
    page.once('dialog', async (dialog) => {
      alertText = dialog.message();
      await dialog.accept();
    });

    const saveBtn = page.locator('button:has-text("Save"), button:has-text("Enregistrer")');
    await saveBtn.click();

    // Verify alert message appeared
    await expect.poll(() => alertText).toContain('enregistrée avec succès');

    // Verify payload sent in PUT request
    expect(putPayload).not.toBeNull();
    expect(putPayload.primary_color).toBe('#ff0055');
    expect(putPayload.youtube_api_key).toBe('new-api-key');
  });

  test('Admin Flow: Jury Management (Add and Remove)', async ({ page }) => {
    const testJuryEmail = `testjury.${Date.now()}@email.com`;

    // 1. Login as Admin
    await authenticateAs(page, 'jean.dupont@email.com', 'password123');
    await page.goto('/admin');

    // 2. Click the Jury Tab
    const juryTab = page.locator('[role="tab"]:has-text("Users"), [role="tab"]:has-text("Utilisateurs")');
    await expect(juryTab).toBeVisible();
    await juryTab.click();

    // 3. Fill in the email of the new jury member
    const emailInput = page.locator('input[placeholder="jury@email.com"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill(testJuryEmail);

    // 4. Click Add button
    const addBtn = page.locator('button:has-text("Add"), button:has-text("Ajouter")');
    await addBtn.click();

    // 5. Verify feedback message is displayed
    const feedbackMsg = page.locator('div:has-text("password123")').last();
    await expect(feedbackMsg).toBeVisible();

    // 6. Verify the new jury member appears in the list
    const juryList = page.locator('[role="tabpanel"] ul');
    await expect(juryList).toContainText(testJuryEmail);

    // 7. Click Remove / Delete button next to their email
    const memberRow = page.locator('li', { hasText: testJuryEmail });
    const deleteBtn = memberRow.locator('button:has-text("Delete"), button:has-text("Supprimer")');
    await deleteBtn.click();

    // 8. Verify the email is removed from the list
    await expect(juryList).not.toContainText(testJuryEmail);
  });

});
