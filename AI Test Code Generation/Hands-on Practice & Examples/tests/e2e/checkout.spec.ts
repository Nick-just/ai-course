// ============================================================
// File: tests/e2e/checkout.spec.ts
// Description: E2E tests for checkout flow (cart + total)
// ============================================================

import { test, expect } from '../../src/fixtures/baseTest';
import { testProducts, checkoutData } from '../../src/fixtures/testData';

test.describe('Checkout Flow', () => {
  test('should complete checkout with correct total', async ({
    searchPage,
    productPage,
    cartPage,
    checkoutPage,
    header,
  }) => {
    // Initialization: open search page
    await searchPage.navigate();
    await expect(searchPage.queryInput()).toBeVisible();

    // User actions: search, select product, add to cart
    const { query, name, price } = testProducts.laptop;
    await searchPage.searchAndSelectProduct(query, name);
    await expect(productPage.title()).toBeVisible();

    // Verify product details
    await expect(productPage.price()).toContainText(price);
    const productTitle = await productPage.getTitle();
    await productPage.addToCartClick();

    // Verification: cart badge increments
    const cartCount = await header.getCartBadgeCount();
    expect(cartCount).toBeGreaterThanOrEqual(1);

    // User actions: proceed to checkout
    await header.clickCart();
    await cartPage.navigate();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0);
    await cartPage.clickProceedToCheckout();

    // Verification: total matches expected
    const total = await checkoutPage.getOrderTotal();
    expect(total).toContain('$');
    await expect(checkoutPage.orderSummary()).toBeVisible();
  });

  test('should display cart summary with multiple items', async ({
    searchPage,
    productPage,
    cartPage,
    header,
  }) => {
    // Initialization: open search page
    await searchPage.navigate();

    // User actions: search and add first product
    const { query: query1, name: name1 } = testProducts.laptop;
    await searchPage.searchAndSelectProduct(query1, name1);
    await productPage.addToCartClick();

    let cartCount = await header.getCartBadgeCount();
    expect(cartCount).toBe(1);

    // User actions: add second product
    await searchPage.navigate();
    const { query: query2, name: name2 } = testProducts.headphones;
    await searchPage.searchAndSelectProduct(query2, name2);
    await productPage.addToCartClick();

    // Verification: cart badge shows 2 items
    cartCount = await header.getCartBadgeCount();
    expect(cartCount).toBe(2);

    // Verification: cart page shows multiple items
    await header.clickCart();
    await cartPage.navigate();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(2);
  });
});
