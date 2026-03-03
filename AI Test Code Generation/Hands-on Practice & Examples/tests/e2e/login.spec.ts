// ============================================================
// File: tests/e2e/login.spec.ts
// Description: E2E tests for the Login flow
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';

test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('should display login form', async ({ loginPage }) => {
    await expect(loginPage.getErrorMessage()).not.toBeVisible();
  });

  test('should login with valid credentials', async ({ loginPage, homePage }) => {
    await loginPage.login('user@example.com', 'securePassword123');
    await homePage.waitForUrl('/');
    await expect(homePage.getWelcomeHeading()).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ loginPage }) => {
    await loginPage.login('wrong@example.com', 'badPassword');
    await expect(loginPage.getErrorMessage()).toBeVisible();
  });
    test('should login with Remember Me checkbox checked', async ({
      loginPage,
      homePage,
    }) => {
      // Fill email and password
      await loginPage.enterUsername('user@example.com');
      await loginPage.enterPassword('securePassword123');
    
      // Click Remember Me checkbox
      await loginPage.checkRememberMe();
    
      // Submit
      await loginPage.clickSignIn();
    
      // Verify dashboard URL
      await homePage.waitForUrl('/');
    
      // Verify welcome heading and dashboard content visible
      await expect(homePage.getWelcomeHeading()).toBeVisible();
      await expect(homePage.getDashboardContent()).toBeVisible();
    });
  });
