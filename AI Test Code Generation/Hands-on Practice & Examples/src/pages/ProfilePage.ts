// ============================================================
// File: src/pages/ProfilePage.ts
// Description: Page Object for the Profile page
// ============================================================

import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object representing the Profile page.
 * Exposes semantic methods for user profile management.
 */
export class ProfilePage extends BasePage {
  protected readonly path = '/profile';

  constructor(page: Page) {
    super(page);
  }

  // ── Actions ─────────────────────────────────────────────────

  /** Navigate to the profile page. */
  async open(): Promise<void> {
    await this.navigate();
  }

  /**
   * Upload and save a new avatar image.
   *
   * @param imagePath - Absolute path to the avatar image file.
   */
  async updateAvatar(imagePath: string): Promise<void> {
    this.logger.info(`Updating avatar with image: ${imagePath}`);
    await this.getByLabel('Upload avatar').setInputFiles(imagePath);
    await this.getByTestId('submit-btn').click();
  }

  // ── Assertions helpers ──────────────────────────────────────

  /** Return the success message locator shown after profile update. */
  getSuccessMessage() {
    return this.getByTestId('profile-success');
  }

  /**
   * Verify that the profile update was successful.
   * Waits for and asserts visibility of the success message.
   */
  async verifyUpdateSuccess(): Promise<void> {
    this.logger.info('Verifying profile update success');
    await this.getSuccessMessage().waitFor({ state: 'visible' });
  }
}
