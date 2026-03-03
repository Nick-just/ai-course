// ============================================================
// File: tests/e2e/review.spec.ts
// Description: E2E tests for product reviews
// Demonstrates stable data-testid selectors (Exercise 4 fix)
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';

test.describe('Product Reviews', () => {
  test('should submit a review with stable selectors', async ({ reviewPage }) => {
    // Initialization: navigate to review page
    await reviewPage.navigate();
    await expect(reviewPage.reviewTitle()).toBeVisible();

    // User actions: fill review form
    const reviewData = {
      rating: '5',
      title: 'Excellent product!',
      text: 'Great quality and fast delivery. Highly recommended!',
    };

    await reviewPage.submitReview(
      reviewData.rating,
      reviewData.title,
      reviewData.text,
    );

    // Verification: success message visible
    // ✅ Uses stable data-testid="review-success-message"
    // (No longer breaks on CSS refactor or aria-label rename)
    await expect(reviewPage.successMessage()).toBeVisible();
  });

  test('should display review form elements', async ({ reviewPage }) => {
    // Initialization: navigate to review page
    await reviewPage.navigate();

    // Verification: all form elements are visible with stable selectors
    // ✅ data-testid="review-rating"
    await expect(reviewPage.ratingInput()).toBeVisible();

    // ✅ data-testid="review-title-input"
    await expect(reviewPage.reviewTitle()).toBeVisible();

    // ✅ data-testid="review-body"
    await expect(reviewPage.reviewText()).toBeVisible();

    // ✅ data-testid="submit-review-btn"
    await expect(reviewPage.submitButton()).toBeVisible();
  });
});
