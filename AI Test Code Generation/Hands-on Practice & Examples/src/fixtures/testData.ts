// ============================================================
// File: src/fixtures/testData.ts
// Description: Centralized test data and fixtures
// ============================================================

/**
 * Test user credentials for authentication tests
 */
export const testUsers = {
  validUser: {
    username: 'testuser@example.com',
    password: 'SecurePassword123!',
  },
  invalidUser: {
    username: 'invalid@example.com',
    password: 'WrongPassword',
  },
};

/**
 * Common test URLs
 */
export const testUrls = {
  login: '/login',
  home: '/',
  dashboard: '/dashboard',
  search: '/search',
  cart: '/cart',
  checkout: '/checkout',
};

/**
 * Common test data
 */
export const testData = {
  errorMessage: 'Invalid credentials',
  successMessage: 'Login successful',
};

/**
 * Test products for checkout flow
 */
export const testProducts = {
  laptop: {
    name: 'Pro Laptop 15',
    query: 'laptop',
    price: '$1299.99',
  },
  headphones: {
    name: 'Wireless Headphones',
    query: 'headphones',
    price: '$199.99',
  },
};

/**
 * Expected checkout totals
 */
export const checkoutData = {
  laptopTotal: '$1299.99',
  headphonesTotal: '$199.99',
};

/**
 * Search and filter test data
 */
export const searchFilters = {
  priceUnder1000: 'Price < $1000',
  priceUnder500: 'Price < $500',
  popularProducts: 'Popular',
  highRated: 'High Rated',
};

/**
 * Search queries and expected results
 */
export const searchQueries = {
  laptop: {
    query: 'Laptop',
    expectedResults: 5,
    priceThreshold: 1000,
  },
  headphones: {
    query: 'Headphones',
    expectedResults: 3,
    priceThreshold: 500,
  },
};
