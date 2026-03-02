// ============================================================
// File: src/components/BaseComponent.ts
// Description: Abstract base for reusable UI component objects
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { Logger } from '../utils/logger';

/**
 * Abstract base class for Component Objects.
 * A component represents a reusable UI fragment (e.g. navbar, modal, form)
 * that can appear on multiple pages.
 */
export abstract class BaseComponent {
  protected readonly page: Page;
  protected readonly root: Locator;
  protected readonly logger: Logger;

  /**
   * @param page  - Playwright Page instance.
   * @param root  - Root locator that scopes all child queries to this component.
   */
  constructor(page: Page, root: Locator) {
    this.page = page;
    this.root = root;
    this.logger = new Logger(this.constructor.name);
  }

  // ── Scoped selector helpers ─────────────────────────────────

  /** Locate a child element by accessible role within this component. */
  protected getByRole(
    role: Parameters<Locator['getByRole']>[0],
    options?: Parameters<Locator['getByRole']>[1],
  ): Locator {
    return this.root.getByRole(role, options);
  }

  /** Locate a child element by label within this component. */
  protected getByLabel(text: string | RegExp): Locator {
    return this.root.getByLabel(text);
  }

  /** Locate a child element by test-id within this component. */
  protected getByTestId(testId: string | RegExp): Locator {
    return this.root.getByTestId(testId);
  }

  // ── Visibility ──────────────────────────────────────────────

  /** Check whether the component root is visible. */
  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  /** Wait until the component root becomes visible. */
  async waitForVisible(): Promise<void> {
    this.logger.info('Waiting for component to be visible');
    await this.root.waitFor({ state: 'visible' });
  }
}
