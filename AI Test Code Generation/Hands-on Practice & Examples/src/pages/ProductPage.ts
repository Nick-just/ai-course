import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductPage - Handles product detail and purchase interactions
 */
export class ProductPage extends BasePage {
  protected readonly path = '/product';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get product title locator
   */
  title(): Locator {
    return this.getByRole('heading', { level: 1 });
  }

  /**
   * Get product price locator
   */
  price(): Locator {
    return this.getByTestId('product-price');
  }

  /**
   * Get add to cart button locator
   */
  addToCart(): Locator {
    return this.getByRole('button', { name: /add to cart/i });
  }

  /**
   * Add product to cart
   */
  async addToCartClick(): Promise<void> {
    this.logger.info('Adding product to cart');
    await this.addToCart().click();
  }

  /**
   * Get product title text
   */
  async getTitle(): Promise<string> {
    const text = await this.title().textContent();
    return text || '';
  }

  /**
   * Get product price text
   */
  async getPrice(): Promise<string> {
    const text = await this.price().textContent();
    return text || '';
  }
}
