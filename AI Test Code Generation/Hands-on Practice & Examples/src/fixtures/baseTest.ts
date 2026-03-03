// ============================================================
// File: src/fixtures/baseTest.ts
// Description: Custom Playwright test fixture with shared setup/teardown
// ============================================================

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';
import { AuthPage } from '../pages/AuthPage';
import { SearchPage } from '../pages/SearchPage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ReviewPage } from '../pages/ReviewPage';
import { Header } from '../components/Header';
import { Logger } from '../utils/logger';

/** Declare the custom fixture types available in every test. */
type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  authPage: AuthPage;
  searchPage: SearchPage;
  resultsPage: ResultsPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  reviewPage: ReviewPage;
  header: Header;
  logger: Logger;
};

/**
 * Extended Playwright `test` object that automatically provisions
 * all Page Objects and Components for tests
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

  /** Provide a ready-to-use AuthPage instance. */
  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await use(authPage);
  },

  /** Provide a ready-to-use SearchPage instance. */
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  /** Provide a ready-to-use ResultsPage instance. */
  resultsPage: async ({ page }, use) => {
    const resultsPage = new ResultsPage(page);
    await use(resultsPage);
  },

  /** Provide a ready-to-use ProductPage instance. */
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  /** Provide a ready-to-use CartPage instance. */
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  /** Provide a ready-to-use CheckoutPage instance. */
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  /** Provide a ready-to-use ReviewPage instance. */
  reviewPage: async ({ page }, use) => {
    const reviewPage = new ReviewPage(page);
    await use(reviewPage);
  },

  /** Provide a ready-to-use Header component instance. */
  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
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
