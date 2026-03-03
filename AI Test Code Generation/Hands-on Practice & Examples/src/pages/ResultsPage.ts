// ============================================================
// File: src/pages/ResultsPage.ts
// Description: Page Object for search results
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ResultsPage - Handles search results and filtering
 * Provides methods to validate collections of products
 */
export class ResultsPage extends BasePage {
  protected readonly path = '/results';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get all result items collection
   */
  items(): Locator {
    return this.getByTestId('result-item');
  }

  /**
   * Get results container
   */
  resultsContainer(): Locator {
    return this.getByTestId('results');
  }

  /**
   * Get title of result item at given index
   * @param index - Zero-based index of the result item
   */
  async titleOf(index: number): Promise<string> {
    const item = this.items().nth(index);
    const title = await item.locator('.title').textContent();
    return title?.trim() || '';
  }

  /**
   * Get price of result item at given index (as string with $)
   * @param index - Zero-based index of the result item
   */
  async priceOf(index: number): Promise<string> {
    const item = this.items().nth(index);
    const price = await item.locator('.price').textContent();
    return price?.trim() || '';
  }

  /**
   * Get numeric price value from price string (e.g., "$999" → 999)
   * @param priceStr - Price string (e.g., "$999")
   */
  private parsePrice(priceStr: string): number {
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  /**
   * Get all prices from results as numbers
   */
  async getAllPrices(): Promise<number[]> {
    const count = await this.items().count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const priceStr = await this.priceOf(i);
      prices.push(this.parsePrice(priceStr));
    }
    this.logger.info(`Extracted ${prices.length} prices: ${prices.join(', ')}`);
    return prices;
  }

  /**
   * Verify all result prices are below a threshold
   * @param maxPrice - Maximum allowed price (numeric)
   */
  async verifyAllPricesBelowMax(maxPrice: number): Promise<boolean> {
    const prices = await this.getAllPrices();
    const allValid = prices.every((price) => price <= maxPrice);
    this.logger.info(
      `Verification: All prices below $${maxPrice}? ${allValid}`,
    );
    return allValid;
  }

  /**
   * Get count of results
   */
  async getResultCount(): Promise<number> {
    const count = await this.items().count();
    this.logger.info(`Found ${count} results`);
    return count;
  }
}
