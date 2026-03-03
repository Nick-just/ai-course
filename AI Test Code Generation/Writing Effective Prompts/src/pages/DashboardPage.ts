import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * DashboardPage - Page Object for the Dashboard
 * Represents user dashboard after successful login
 */
export class DashboardPage extends BasePage {
  protected readonly path = '/dashboard';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get avatar element locator
   * @returns Locator for the user avatar
   */
  avatar(): Locator {
    return this.getByRole('img', { name: /avatar|profile/i });
  }
}
