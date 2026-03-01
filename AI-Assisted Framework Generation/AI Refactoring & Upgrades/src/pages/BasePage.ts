// ============================================================
// File: src/pages/BasePage.ts
// Description: Abstract base page providing shared page helpers
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * Abstract base class for all Page Objects.
 * Encapsulates common navigation, waiting, and element-interaction helpers
 * so concrete pages stay thin and focused on page-specific behaviour.
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger: Logger;

  /** Every concrete page must declare its own path (appended to baseURL). */
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger(this.constructor.name);
  }

  // ── Navigation ──────────────────────────────────────────────

  /** Navigate to this page's path using the configured baseURL. */
  async navigate(): Promise<void> {
    this.logger.info(`Navigating to ${this.path}`);
    await this.page.goto(this.path);
  }

  /** Return the current page URL. */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /** Return the page title. */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  // ── Selector helpers (approved strategies only) ─────────────

  /** Locate an element by its accessible role and optional name. */
  protected getByRole(
    role: Parameters<Page['getByRole']>[0],
    options?: Parameters<Page['getByRole']>[1],
  ): Locator {
    return this.page.getByRole(role, options);
  }

  /** Locate an element by its associated label text. */
  protected getByLabel(text: string | RegExp): Locator {
    return this.page.getByLabel(text);
  }

  /** Locate an element by its `data-testid` attribute. */
  protected getByTestId(testId: string | RegExp): Locator {
    return this.page.getByTestId(testId);
  }

  // ── Interaction helpers ─────────────────────────────────────

  /** Click an element identified by test-id. */
  protected async clickByTestId(testId: string): Promise<void> {
    this.logger.info(`Clicking element [data-testid="${testId}"]`);
    await this.getByTestId(testId).click();
  }

  /** Fill an input identified by its label. */
  protected async fillByLabel(label: string, value: string): Promise<void> {
    this.logger.info(`Filling "${label}" with value`);
    await this.getByLabel(label).fill(value);
  }

  // ── Waiting helpers ─────────────────────────────────────────

  /** Wait for a specific URL pattern to be reached. */
  async waitForUrl(urlPattern: string | RegExp): Promise<void> {
    this.logger.info(`Waiting for URL: ${urlPattern}`);
    await this.page.waitForURL(urlPattern);
  }

  /** Wait for the page to reach the specified load state. */
  async waitForLoadState(
    state?: 'load' | 'domcontentloaded' | 'networkidle',
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }
}
