// ============================================================
// File: tests/e2e/auth.spec.ts
// Description: E2E authentication tests
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import { testUsers } from '../../src/fixtures/testData';

test.describe('Authentication Flow', () => {
  test('should successfully login and display avatar', async ({ page }) => {
    // Initialization: open login
    const authPage = new AuthPage(page);
    await authPage.open();
    await expect(authPage.username()).toBeVisible();

    // User actions: fill credentials, submit
    const { username, password } = testUsers.validUser;
    await authPage.login(username, password);

    // Verification: successful login → avatar visible
    const homePage = new HomePage(page);
    await expect(page).toHaveURL(/.*\/$/);
    await expect(homePage.avatar()).toBeVisible();
  });

  test('should display error message on invalid login', async ({ page }) => {
    // Initialization: open login
    const authPage = new AuthPage(page);
    await authPage.open();
    await expect(authPage.username()).toBeVisible();

    // User actions: invalid login
    const { username, password } = testUsers.invalidUser;
    await authPage.login(username, password);

    // Verification: error message visible
    await expect(authPage.errorMessage()).toBeVisible();
  });
});
