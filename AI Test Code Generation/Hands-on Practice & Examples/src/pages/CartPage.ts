// ============================================================
// File: src/pages/CartPage.ts
// Description: Page Object for shopping cart
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage - Handles cart management and checkout flow
 */
export class CartPage extends BasePage {
  protected readonly path = '/cart';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get all cart items locator
   */
  items(): Locator {
    return this.getByTestId('cart-item');
  }

  /**
   * Get cart total locator
   */
  cartTotal(): Locator {
    return this.getByTestId('cart-total');
  }

  /**
   * Get proceed to checkout button locator
   */
  proceedToCheckout(): Locator {
    return this.getByTestId('checkout-btn');
  }

  /**
   * Get cart item count
   */
  async getItemCount(): Promise<number> {
    const count = await this.items().count();
    this.logger.info(`Cart contains ${count} items`);
    return count;
  }

  /**
   * Get cart total amount
   */
  async getCartTotal(): Promise<string> {
    const total = await this.cartTotal().textContent();
    this.logger.info(`Cart total: ${total}`);
    return total || '';
  }

  /**
   * Click proceed to checkout button
   */
  async clickProceedToCheckout(): Promise<void> {
    this.logger.info('Proceeding to checkout');
    await this.proceedToCheckout().click();
  }
}
