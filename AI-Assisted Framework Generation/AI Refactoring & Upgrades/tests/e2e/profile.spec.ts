// ============================================================
// File: tests/e2e/profile.spec.ts
// Description: E2E tests for the Profile page
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';
import path from 'path';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ loginPage, profilePage }) => {
    await loginPage.navigateAndLogin('user@example.com', 'securePassword123');
    await profilePage.open();
  });

  test('should upload avatar successfully', async ({ profilePage }) => {
    const avatarPath = path.resolve(__dirname, '../../fixtures/test-avatar.png');
    await profilePage.uploadAvatarAndVerify(avatarPath);
    await expect(profilePage.getSuccessMessage()).toBeVisible();
  });

  test('should delete profile item via dropdown', async ({ profilePage }) => {
    await profilePage.performDropdownActionAndVerify('Delete');
    await expect(profilePage.getSuccessMessage()).toBeVisible();
  });

  test('should edit profile item via dropdown', async ({ profilePage }) => {
    await profilePage.performDropdownActionAndVerify('Edit');
    await expect(profilePage.getSuccessMessage()).toBeVisible();
  });

  test('should archive profile item via dropdown', async ({ profilePage }) => {
    await profilePage.performDropdownActionAndVerify('Archive');
    await expect(profilePage.getSuccessMessage()).toBeVisible();
  });
});
