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

test.describe('TC-NAV-001 - Main navigation: Docs, API, Community', () => {
  let nav: MainNavigationPage;

  test.beforeEach(async ({ page }) => {
    nav = new MainNavigationPage(page);
    await nav.goto();
    await expect(page).toHaveURL(/playwright\.dev\/?$/);
  });

  test('TC-NAV-001.1 - Main nav exposes accessible links and targets', async () => {
    await test.step('Validate main navigation landmark and accessible names', async () => {
      await nav.assertMainNavigationAccessibility();
    });

    await test.step('Validate required links are visible', async () => {
      await nav.assertNavLinksVisible();
    });

    await test.step('Validate href targets for required links', async () => {
      await nav.assertNavLinkHrefs();
    });
  });

  const destinations = [
    { link: 'Docs', url: /\/docs\/intro/, heading: 'Installation' },
    { link: 'API', url: /\/docs\/api\//, heading: 'Playwright Library' },
    { link: 'Community', url: /\/community\//, heading: 'Welcome' },
  ] as const;

  for (const destination of destinations) {
    test(`TC-NAV-001.2 - ${destination.link} navigates to the expected page`, async () => {
      await nav.navigateAndAssertDestination(
        destination.link,
        destination.url,
        destination.heading,
      );
    });
  }
});
