import { test, expect } from '@playwright/test';
import { MainNavigationPage } from '../src/pages/MainNavigationPage';

test.describe('TC-NAV-001 - Main page navigation buttons', () => {
  let nav: MainNavigationPage;

  test.beforeEach(async ({ page }) => {
    nav = new MainNavigationPage(page);
    await nav.goto();
    await expect(page).toHaveURL(/playwright\.dev\/?$/);
  });

  test('shows Docs, API, and Community links with correct semantics', async () => {
    await test.step('Validate main navigation landmark and accessibility names', async () => {
      await nav.assertMainNavigationAccessibility();
    });

    await test.step('Validate all required links are visible', async () => {
      await nav.assertNavLinksVisible();
    });

    await test.step('Validate href targets for all required links', async () => {
      await nav.assertNavLinkHrefs();
    });
  });

  test('Docs navigates to the Installation page', async () => {
    await test.step('Navigate via Docs and verify destination state', async () => {
      await nav.navigateAndAssertDestination('Docs', /\/docs\/intro/, 'Installation');
    });
  });

  test('API navigates to the Playwright API page', async () => {
    await test.step('Navigate via API and verify destination state', async () => {
      await nav.navigateAndAssertDestination('API', /\/docs\/api\//, 'Playwright Library');
    });
  });

  test('Community navigates to the Community page', async () => {
    await test.step('Navigate via Community and verify destination state', async () => {
      await nav.navigateAndAssertDestination('Community', /\/community\//, 'Welcome');
    });
  });
});
