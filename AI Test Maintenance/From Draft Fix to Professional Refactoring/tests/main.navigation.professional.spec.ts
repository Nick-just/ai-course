import { test, expect } from '@playwright/test';
import { MainNavigationPage } from '../src/pages/MainNavigationPage';

test.describe('TC-NAV-001 - Main navigation', () => {
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

    await test.step('Validate links are enabled and not aria-disabled', async () => {
      await expect(nav.docsLink).toBeEnabled();
      await expect(nav.apiLink).toBeEnabled();
      await expect(nav.communityLink).toBeEnabled();
      await expect(nav.docsLink).not.toHaveAttribute('aria-disabled', 'true');
      await expect(nav.apiLink).not.toHaveAttribute('aria-disabled', 'true');
      await expect(nav.communityLink).not.toHaveAttribute('aria-disabled', 'true');
    });
  });

  test('TC-NAV-001.E1 - Main nav links are not hidden from users', async () => {
    await test.step('Ensure links are not aria-hidden and have visible text', async () => {
      await expect(nav.docsLink).not.toHaveAttribute('aria-hidden', 'true');
      await expect(nav.apiLink).not.toHaveAttribute('aria-hidden', 'true');
      await expect(nav.communityLink).not.toHaveAttribute('aria-hidden', 'true');
      await expect(nav.docsLink).toHaveText(/Docs/);
      await expect(nav.apiLink).toHaveText(/API/);
      await expect(nav.communityLink).toHaveText(/Community/);
    });
  });

  test('TC-NAV-001.E2 - Docs link does not open a new tab', async () => {
    const docsLink = nav.page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Docs' });

    await expect(docsLink).not.toHaveAttribute('target', '_blank');
    await expect(docsLink).toHaveAttribute('href', /\/docs\/intro/);
  });

  test('TC-NAV-001.2 - Docs navigates to the Installation page', async () => {
    await test.step('Navigate via Docs and verify destination', async () => {
      await nav.navigateAndAssertDestination('Docs', /\/docs\/intro/, 'Installation');
    });
  });

  test('TC-NAV-001.3 - API navigates to the Playwright API page', async () => {
    await test.step('Navigate via API and verify destination', async () => {
      await nav.navigateAndAssertDestination('API', /\/docs\/api\//, 'Playwright Library');
    });
  });

  test('TC-NAV-001.4 - Community navigates to the Community page', async () => {
    await test.step('Navigate via Community and verify destination', async () => {
      await nav.navigateAndAssertDestination('Community', /\/community\//, 'Welcome');
    });
  });
});
