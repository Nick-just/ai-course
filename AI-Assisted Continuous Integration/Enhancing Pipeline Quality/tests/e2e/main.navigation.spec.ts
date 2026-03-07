/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MANUAL TEST CASE
 * ─────────────────────────────────────────────────────────────────────────────
 * Test Case ID : TC-NAV-001
 * Title        : Main page displays navigation buttons Docs, API, Community
 * Feature      : Global navigation bar — playwright.dev
 * Priority     : High
 *
 * Preconditions:
 *   - Browser is open and network is reachable.
 *   - No authentication required.
 *
 * Steps:
 *   1. Open https://playwright.dev in the browser.
 *   2. Locate the top navigation bar (landmark role="navigation", name="Main").
 *   3. Verify the "Docs" link is visible inside the navigation.
 *   4. Verify the "API" link is visible inside the navigation.
 *   5. Verify the "Community" link is visible inside the navigation.
 *   6. Verify the "Docs" link has an href pointing to /docs/intro.
 *   7. Verify the "API" link has an href pointing to /docs/api/.
 *   8. Verify the "Community" link has an href pointing to /community/.
 *   9. Click "Docs" and confirm the browser navigates to a URL matching /docs/intro
 *      and the page h1 heading reads "Installation".
 *  10. Go back to the main page.
 *  11. Click "API" and confirm the browser navigates to a URL matching /docs/api/
 *      and the page contains a heading matching "Playwright Library".
 *  12. Go back to the main page.
 *  13. Click "Community" and confirm the browser navigates to a URL matching
 *      /community/ and the page contains a heading matching "Welcome".
 *
 * Expected Results:
 *   - All three links are visible, have correct accessible names (role=link),
 *     and display in the main navigation landmark.
 *   - Each link's href attribute resolves to the documented path.
 *   - Clicking each link lands on the correct page with the expected heading.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { test, expect } from '@playwright/test';
import { MainNavigationPage } from '../../src/pages/MainNavigationPage';

test.describe('TC-NAV-001 — Main page navigation: Docs, API, Community', () => {
  let nav: MainNavigationPage;

  test.beforeEach(async ({ page }) => {
    nav = new MainNavigationPage(page);
    await nav.goto();
  });

  // ── Presence ────────────────────────────────────────────────────────────────

  test('should display Docs, API and Community links in the main navigation', async () => {
    await nav.assertNavLinksVisible();
  });

  // ── Accessibility: role, label, visibility ───────────────────────────────

  test('navigation links should be accessible — correct role, name and visibility', async ({ page }) => {
    // Role-based locators already enforce role=link and accessible name.
    // toBeVisible() also ensures neither hidden nor zero-size.
    await expect(nav.nav).toBeVisible();
    await expect(nav.docsLink).toBeVisible();
    await expect(nav.apiLink).toBeVisible();
    await expect(nav.communityLink).toBeVisible();

    // Confirm aria accessible names are correct (role-based locators expose this).
    await expect(nav.docsLink).toHaveAccessibleName('Docs');
    await expect(nav.apiLink).toHaveAccessibleName('API');
    await expect(nav.communityLink).toHaveAccessibleName('Community');
  });

  // ── href attributes ──────────────────────────────────────────────────────

  test('navigation links should point to the expected href paths', async () => {
    await nav.assertNavLinkHrefs();
  });

  // ── Navigation — extra validation: links open the correct pages ──────────

  test('Docs link should navigate to the Installation page', async ({ page }) => {
    await nav.clickDocs();
    await expect(page).toHaveURL(/\/docs\/intro/);
    await expect(page.getByRole('heading', { name: 'Installation', level: 1 })).toBeVisible();
  });

  test('API link should navigate to the Playwright API reference', async ({ page }) => {
    await nav.clickApi();
    await expect(page).toHaveURL(/\/docs\/api\//);
    await expect(page.getByRole('heading', { name: 'Playwright Library', level: 1 })).toBeVisible();
  });

  test('Community link should navigate to the Community welcome page', async ({ page }) => {
    await nav.clickCommunity();
    await expect(page).toHaveURL(/\/community\//);
    await expect(page.getByRole('heading', { name: 'Welcome', level: 1 })).toBeVisible();
  });
});
