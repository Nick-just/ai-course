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

  // ── Assertions helpers ──────────────────────────────────────

  /** Return the error message locator shown on invalid credentials. */
  getErrorMessage() {
    return this.getByTestId('login-error');
  }
    // ── Remember Me ─────────────────────────────────────────────

    /** Return the "Remember me" checkbox locator. */
    rememberMeCheckbox() {
      return this.getByTestId('remember-me');
    }

    /** Click the "Remember me" checkbox. */
    async checkRememberMe(): Promise<void> {
      this.logger.info('Checking Remember Me checkbox');
      await this.rememberMeCheckbox().click();
    }

    /**
     * Perform login with Remember Me option.
     *
     * @param username - User email or username.
     * @param password - User password.
     * @param rememberMe - Whether to check the Remember Me checkbox.
     */
    async loginWithRememberMe(
      username: string,
      password: string,
      rememberMe: boolean = false,
    ): Promise<void> {
      this.logger.info(
        `Logging in as "${username}" (Remember Me: ${rememberMe})`,
      );
      await this.enterUsername(username);
      await this.enterPassword(password);
      if (rememberMe) {
        await this.checkRememberMe();
      }
      await this.clickSignIn();
    }
  }
