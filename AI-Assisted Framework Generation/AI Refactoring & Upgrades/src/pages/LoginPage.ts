// ============================================================
// File: src/pages/LoginPage.ts
// Description: Page Object for the Login page
// ============================================================

import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object representing the Login page.
 * Exposes semantic methods for authentication flows.
 */
export class LoginPage extends BasePage {
  protected readonly path = '/login';

  constructor(page: Page) {
    super(page);
  }

  // ── Actions ─────────────────────────────────────────────────

  /** Fill in the username/email field. */
  async enterUsername(username: string): Promise<void> {
    await this.fillByLabel('Email', username);
  }

  /** Fill in the password field. */
  async enterPassword(password: string): Promise<void> {
    await this.fillByLabel('Password', password);
  }

  /** Click the primary Sign-in button. */
  async clickSignIn(): Promise<void> {
    this.logger.info('Clicking Sign In button');
    await this.getByRole('button', { name: 'Sign in' }).click();
  }

  /**
   * Perform a complete login with the given credentials.
   *
   * @param username - User email or username.
   * @param password - User password.
   */
  async login(username: string, password: string): Promise<void> {
    this.logger.info(`Logging in as "${username}"`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  /**
   * Navigate to login page and perform complete authentication.
   * Combines navigate + login in one semantic flow.
   *
   * @param username - User email or username.
   * @param password - User password.
   */
  async navigateAndLogin(username: string, password: string): Promise<void> {
    await this.navigate();
    await this.login(username, password);
  }

  // ── Assertions helpers ──────────────────────────────────────

  /** Return the error message locator shown on invalid credentials. */
  getErrorMessage() {
    return this.getByTestId('login-error');
  }
}
