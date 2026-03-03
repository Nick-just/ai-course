// ============================================================
// File: tests/e2e/home.spec.ts
// Description: E2E tests for the Home / Dashboard page
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';

test.describe('Home Page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should display welcome heading', async ({ homePage }) => {
    await expect(homePage.getWelcomeHeading()).toBeVisible();
  });

  test('should display dashboard content', async ({ homePage }) => {
    await expect(homePage.getDashboardContent()).toBeVisible();
  });

  test('should navigate to profile via navbar', async ({ homePage }) => {
    await homePage.navigationBar.goToProfile();
    await homePage.waitForUrl(/\/profile/);
  });
});
