// ============================================================
// File: src/pages/ReviewPage.ts
// Description: Page Object for product reviews
// ============================================================

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ReviewPage - Handles product review interactions
 * Uses stable data-testid selectors per framework convention
 */
export class ReviewPage extends BasePage {
  protected readonly path = '/product/reviews';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get review rating input
   */
  ratingInput(): Locator {
    return this.getByTestId('review-rating');
  }

  /**
   * Get review title input
   */
  reviewTitle(): Locator {
    return this.getByTestId('review-title-input');
  }

  /**
   * Get review text area
   */
  reviewText(): Locator {
    return this.getByTestId('review-body');
  }

  /**
   * Get submit review button
   */
  submitButton(): Locator {
    return this.getByTestId('submit-review-btn');
  }

  /**
   * Get review success message
   */
  successMessage(): Locator {
    return this.getByTestId('review-success-message');
  }

  /**
   * Submit a review
   */
  async submitReview(
    rating: string,
    title: string,
    text: string,
  ): Promise<void> {
    this.logger.info(`Submitting review: "${title}"`);
    await this.ratingInput().first().click();
    await this.reviewTitle().fill(title);
    await this.reviewText().fill(text);
    await this.submitButton().click();
  }
}
