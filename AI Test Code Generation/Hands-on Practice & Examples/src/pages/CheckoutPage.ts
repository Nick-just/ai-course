// ============================================================
// File: src/pages/CheckoutPage.ts
// Description: Page Object for checkout process
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CheckoutPage - Handles checkout and payment interactions
 */
export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get order total locator
   */
  total(): Locator {
    return this.getByTestId('order-total');
  }

  /**
   * Get place order button locator
   */
  placeOrder(): Locator {
    return this.getByRole('button', { name: /place order|confirm/i });
  }

  /**
   * Get order summary heading locator
   */
  orderSummary(): Locator {
    return this.getByRole('heading', { name: /order summary|review/i });
  }

  /**
   * Get order total amount
   */
  async getOrderTotal(): Promise<string> {
    const total = await this.total().textContent();
    this.logger.info(`Order total: ${total}`);
    return total || '';
  }

  /**
   * Click place order button to complete purchase
   */
  async clickPlaceOrder(): Promise<void> {
    this.logger.info('Placing order');
    await this.placeOrder().click();
  }

  /**
   * Complete checkout process
   */
  async completeCheckout(): Promise<void> {
    this.logger.info('Completing checkout');
    await this.clickPlaceOrder();
  }
}
