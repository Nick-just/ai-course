// ============================================================
// File: src/components/Header.ts
// Description: Component Object for site header
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * Header - Represents the site header component
 * Includes navigation, cart badge, and user menu
 */
export class Header extends BaseComponent {
  /**
   * Initialize Header component
   * Scopes all queries to the header element
   */
  constructor(page: Page) {
    const headerRoot = page.locator('header');
    super(page, headerRoot);
  }

  /**
   * Get cart badge locator (shows number of items)
   */
  cartBadge(): Locator {
    return this.getByTestId('cart-badge');
  }

  /**
   * Get cart icon/link locator
   */
  cartIcon(): Locator {
    return this.getByRole('link', { name: /cart/i });
  }

  /**
   * Get cart badge count as number
   */
  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge().textContent();
    const count = parseInt(text || '0', 10);
    this.logger.info(`Cart badge count: ${count}`);
    return count;
  }

  /**
   * Click cart icon to go to cart page
   */
  async clickCart(): Promise<void> {
    this.logger.info('Clicking cart icon');
    await this.cartIcon().click();
  }
}
