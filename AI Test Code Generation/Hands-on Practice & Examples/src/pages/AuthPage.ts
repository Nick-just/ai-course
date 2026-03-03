// ============================================================
// File: src/pages/AuthPage.ts
// Description: Page Object for authentication flows
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * AuthPage - Handles all authentication interactions
 * Supports login form with username, password, and error handling
 */
export class AuthPage extends BasePage {
  protected readonly path = '/login';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the auth/login page
   */
  async open(): Promise<void> {
    this.logger.info('Opening auth page');
    await this.navigate();
  }

  /**
   * Get username input locator
   */
  username(): Locator {
    return this.getByTestId('username-input');
  }

  /**
   * Get password input locator
   */
  password(): Locator {
    return this.getByTestId('password-input');
  }

  /**
   * Get submit button locator
   */
  submit(): Locator {
    return this.getByTestId('login-btn');
  }

  /**
   * Get error message locator
   */
  errorMessage(): Locator {
    return this.getByTestId('login-error');
  }

  /**
   * Perform login with provided credentials
   * @param user - Username or email
   * @param pass - Password
   */
  async login(user: string, pass: string): Promise<void> {
    this.logger.info(`Logging in as "${user}"`);
    await this.username().fill(user);
    await this.password().fill(pass);
    await this.submit().click();
  }
}
