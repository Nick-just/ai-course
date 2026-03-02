// ============================================================
// File: src/fixtures/baseTest.ts
// Description: Custom Playwright test fixture with shared setup/teardown
// ============================================================

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';
import { Logger } from '../utils/logger';

/** Declare the custom fixture types available in every test. */
type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  logger: Logger;
};

/**
 * Extended Playwright `test` object that automatically provisions
 */
export const test = base.extend<TestFixtures>({
  /** Provide a ready-to-use LoginPage instance. */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /** Provide a ready-to-use HomePage instance. */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /** Provide a ready-to-use ProfilePage instance. */
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  /** Provide a test-scoped Logger. */
  logger: async ({}, use) => {
    const logger = new Logger('Test');
    logger.info('── Test started ──');
    await use(logger);
    logger.info('── Test finished ──');
  },
});

/** Re-export expect so tests import everything from one place. */
export { expect } from '@playwright/test';
