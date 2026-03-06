import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../../src/pages/PlaywrightDevPage';

test.describe('Playwright website - Get Started guide', () => {
  test('get started page should show the Installation heading', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);

    await playwrightDev.goto();
    await playwrightDev.getStarted();

    await expect(page).toHaveURL(/.*\/docs\/intro/);
    await expect(playwrightDev.installationHeader).toBeVisible();
  });

  test('Page Object Model guide should be accessible from the get started page', async ({ page }) => {
    const playwrightDev = new PlaywrightDevPage(page);

    await playwrightDev.goto();
    await playwrightDev.navigateToPageObjectModel();

    await expect(page).toHaveURL(/.*\/docs\/pom/);
    await expect(page.locator('article')).toContainText('Page object models');
  });
});
