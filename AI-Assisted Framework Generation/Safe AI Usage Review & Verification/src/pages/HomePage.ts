// ============================================================
// File: src/pages/HomePage.ts
// Description: Page Object for the Home / Dashboard page
// ============================================================

import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavigationBar } from '../components/NavigationBar';

/**
 * Page Object representing the Home (Dashboard) page.
 * Composes the shared {@link NavigationBar} component.
 */
export class HomePage extends BasePage {
  protected readonly path = '/';

  /** Shared navigation bar component available on this page. */
  readonly navigationBar: NavigationBar;

  constructor(page: Page) {
    super(page);
    this.navigationBar = new NavigationBar(page);
  }

  // ── Element accessors ───────────────────────────────────────

  /** Return the main welcome heading locator. */
  getWelcomeHeading() {
    return this.getByRole('heading', { name: /welcome/i });
  }

  /** Return the dashboard content area locator. */
  getDashboardContent() {
    return this.getByTestId('dashboard-content');
  }

  // ── Actions ─────────────────────────────────────────────────

  /** Click the "Get Started" call-to-action button. */
  async clickGetStarted(): Promise<void> {
    this.logger.info('Clicking Get Started');
    await this.getByRole('button', { name: 'Get Started' }).click();
  }
}
