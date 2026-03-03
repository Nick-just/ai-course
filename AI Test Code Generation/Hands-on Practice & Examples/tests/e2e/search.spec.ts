// ============================================================
// File: tests/e2e/search.spec.ts
// Description: E2E tests for search with filters
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';
import { searchQueries, searchFilters } from '../../src/fixtures/testData';

test.describe('Search with Filters', () => {
  test('should filter results by price and validate each item', async ({
    searchPage,
    resultsPage,
  }) => {
    // Initialization: open search page
    await searchPage.navigate();
    await expect(searchPage.queryInput()).toBeVisible();

    // User actions: type "Laptop", apply filter "Price < $1000"
    const { query, priceThreshold } = searchQueries.laptop;
    await searchPage.queryInput().fill(query);
    await searchPage.submit().click();
    await expect(resultsPage.resultsContainer()).toBeVisible();

    // Apply price filter
    await searchPage.applyFilter(searchFilters.priceUnder1000);

    // Verification: each result price < 1000
    const allValid = await resultsPage.verifyAllPricesBelowMax(priceThreshold);
    expect(allValid).toBe(true);

    // Additional verification: validate individual items
    const count = await resultsPage.getResultCount();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const title = await resultsPage.titleOf(i);
      const price = await resultsPage.priceOf(i);
      expect(title.length).toBeGreaterThan(0);
      expect(price).toMatch(/\$\d+/);
    }
  });

  test('should display results matching search query', async ({
    searchPage,
    resultsPage,
  }) => {
    // Initialization: open search page
    await searchPage.navigate();
    await expect(searchPage.queryInput()).toBeVisible();

    // User actions: search for "Headphones"
    const { query } = searchQueries.headphones;
    await searchPage.queryInput().fill(query);
    await searchPage.submit().click();

    // Verification: results are displayed
    const count = await resultsPage.getResultCount();
    expect(count).toBeGreaterThan(0);

    // Verify each result has title and price
    for (let i = 0; i < Math.min(count, 3); i++) {
      const title = await resultsPage.titleOf(i);
      const price = await resultsPage.priceOf(i);

      expect(title).toBeTruthy();
      expect(price).toBeTruthy();
      expect(price).toMatch(/\$\d+/);
    }
  });

  test('should apply multiple filters and validate results', async ({
    searchPage,
    resultsPage,
  }) => {
    // Initialization: open search page
    await searchPage.navigate();

    // User actions: search and apply filters
    const { query, priceThreshold } = searchQueries.laptop;
    await searchPage.queryInput().fill(query);
    await searchPage.submit().click();

    // Apply first filter
    await searchPage.applyFilter(searchFilters.priceUnder1000);
    let count = await resultsPage.getResultCount();
    expect(count).toBeGreaterThan(0);

    // Verification: all prices below threshold
    let allValid = await resultsPage.verifyAllPricesBelowMax(priceThreshold);
    expect(allValid).toBe(true);

    // Apply additional filter (e.g., high-rated)
    await searchPage.applyFilter(searchFilters.highRated);
    count = await resultsPage.getResultCount();

    // Verification: results still valid
    allValid = await resultsPage.verifyAllPricesBelowMax(priceThreshold);
    expect(allValid).toBe(true);
  });
});
