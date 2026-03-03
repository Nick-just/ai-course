// ============================================================
// File: src/pages/SearchPage.ts
// Description: Page Object for product search
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SearchPage - Handles product search interactions
 */
export class SearchPage extends BasePage {
  protected readonly path = '/search';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get search query input locator
   */
  queryInput(): Locator {
    return this.getByTestId('search-input');
  }

  /**
   * Get submit/search button locator
   */
  submit(): Locator {
    return this.getByRole('button', { name: /search/i });
  }

  /**
   * Get product result locator by product name
   * @param name - Product name to search for
   */
  productResult(name: string): Locator {
    return this.getByRole('link', { name: new RegExp(name, 'i') });
  }

  /**
   * Perform a product search
   * @param query - Search query string
   */
  async search(query: string): Promise<void> {
    this.logger.info(`Searching for "${query}"`);
    await this.queryInput().fill(query);
    await this.submit().click();
  }

  /**
   * Search and select a product by name
   * @param query - Search query string
   * @param productName - Product name to click
   */
  async searchAndSelectProduct(
    query: string,
    productName: string,
  ): Promise<void> {
    this.logger.info(`Searching for "${query}" and selecting "${productName}"`);
    await this.search(query);
    await this.productResult(productName).click();
  }

  /**
   * Apply a filter to search results
   * @param filterName - Filter name (e.g., "Price < $1000")
   */
  async applyFilter(filterName: string): Promise<void> {
    this.logger.info(`Applying filter: "${filterName}"`);
    await this.getByRole('button', { name: new RegExp(filterName, 'i') }).click();
  }
}
