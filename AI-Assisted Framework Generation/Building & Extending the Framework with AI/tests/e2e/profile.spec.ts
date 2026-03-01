// ============================================================
// File: tests/e2e/profile.spec.ts
// Description: E2E tests for the Profile page
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';
import path from 'path';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ loginPage, profilePage }) => {
    await loginPage.navigate();
    await loginPage.login('user@example.com', 'securePassword123');
    await profilePage.open();
  });

  test('should upload avatar successfully', async ({ profilePage }) => {
    const avatarPath = path.resolve(__dirname, '../../fixtures/test-avatar.png');
    await profilePage.updateAvatar(avatarPath);
    await profilePage.verifyUpdateSuccess();
    await expect(profilePage.getSuccessMessage()).toBeVisible();
  });
});
