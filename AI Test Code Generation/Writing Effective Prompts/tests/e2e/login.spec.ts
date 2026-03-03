// ============================================================
// File: tests/e2e/login.spec.ts
// Description: E2E tests for the Login flow
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';
import { DashboardPage } from '../../src/pages/DashboardPage';

test.describe('Login Flow', () => {
  test('should navigate to dashboard after successful login', async ({ loginPage, page }) => {
    // Initialization: open login
    await loginPage.navigate();
    await expect(loginPage.getByRole('form')).toBeVisible();

    // User actions: fill fields, submit
    const validEmail = 'user@example.com';
    const validPassword = 'securePassword123';
    await loginPage.login(validEmail, validPassword);

    // Verification: dashboard URL, avatar visible
    const dashboardPage = new DashboardPage(page);
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(dashboardPage.avatar()).toBeVisible();
  });

  test('should display login form on page load', async ({ loginPage }) => {
    // Initialization: open login
    await loginPage.navigate();

    // Verification: form elements visible
    await expect(loginPage.getByLabel('Email')).toBeVisible();
    await expect(loginPage.getByLabel('Password')).toBeVisible();
    await expect(loginPage.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });
});
