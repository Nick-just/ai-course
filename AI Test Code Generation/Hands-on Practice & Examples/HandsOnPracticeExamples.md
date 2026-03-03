# Hands-On Practice & Examples

## Exercise 1 — Authentication Flow

**Objective:** Practice structuring multi-step authentication scenarios using Page Objects.

**Deliverables:**
- `AuthPage`: `open()`, `username()`, `password()`, `submit()`, `errorMessage()`, `login(user, pass)`
- `HomePage`: `avatar()` — verification element after successful login
- `testData.ts`: Centralized test credentials (valid/invalid users)
- `auth.spec.ts`: Two test scenarios

**Key Patterns:**
- ✅ Semantic page methods with JSDoc
- ✅ Web-first assertions (`toBeVisible()`, `toHaveURL()`)
- ✅ Test data centralization
- ✅ Fixture injection via `baseTest`
- ✅ Test phases: Initialization → Actions → Verification

**Tests:**
1. Valid login → Dashboard URL + avatar visible
2. Invalid login → Error message visible

---

## Exercise 2 — Checkout Flow (Cart + Total)

**Objective:** Practice multi-step business-critical flows: search → cart → checkout with total verification.

**Deliverables:**
- `SearchPage`: `queryInput()`, `submit()`, `productResult(name)`, `searchAndSelectProduct()`
- `ProductPage`: `title()`, `price()`, `addToCart()`, `addToCartClick()`
- `CartPage`: `items()`, `proceedToCheckout()`, `getItemCount()`, `getCartTotal()`
- `CheckoutPage`: `total()`, `placeOrder()`, `getOrderTotal()`
- `Header` component: `cartBadge()`, `getCartBadgeCount()`, `clickCart()`
- `testData.ts`: Product test data + expected totals
- `checkout.spec.ts`: Multi-product flow scenarios

**Key Patterns:**
- ✅ Component composition (Header in Cart flow)
- ✅ Multi-step user flows with phase comments
- ✅ Number assertions (`toBeGreaterThan()`, `toBe()`)
- ✅ Text matching (`toContainText()`)
- ✅ Fixture auto-provisioning (9 fixtures)

**Tests:**
1. Single product: Search → Add to cart → Verify badge → Checkout → Total match
2. Multiple products: Add 2 items → Verify badge count (2) → Cart items count (2)

---

## Exercise 3 — Search with Filters

**Objective:** Practice filtering results and looping through collections to validate conditions dynamically.

**Deliverables:**
- `SearchPage`: `queryInput()`, `submit()`, `applyFilter(filterName)` — new filter method
- `ResultsPage`: `items()`, `titleOf(index)`, `priceOf(index)`, `getAllPrices()`, `verifyAllPricesBelowMax(maxPrice)`
- `testData.ts`: Filter + search query test data with price thresholds
- `search.spec.ts`: Three test scenarios with collection validation

**Key Patterns:**
- ✅ Collection loops (`.nth(index)` pattern)
- ✅ Price parsing (Extract numeric value from "$999")
- ✅ Helper methods for batch validation (`getAllPrices()`, `verifyAllPricesBelowMax()`)
- ✅ Dynamic iteration over result sets
- ✅ Positive + negative assertions on collections

**Tests:**
1. Filter by price: Search "Laptop" → Apply "Price < $1000" → All prices < 1000 ✓
2. Display results: Search "Headphones" → Iterate & verify title + price format ✓
3. Multiple filters: Apply price + rating filters → Validate all conditions ✓

---

## Exercise 4 — Locator Fix

**Objective:** Practice targeted locator repairs when UI changes. Fix brittle selectors without regenerating entire Page Objects.

**Deliverables:**
- `ReviewPage` (BUGGY): Shows common selector anti-patterns (CSS class-based, xpath, aria-label, text-based)
- `ReviewPage` (FIXED): Replaced with stable `data-testid` equivalents
- `review.spec.ts`: Demonstrates working tests with corrected locators

**Buggy Locators → Fixed Locators:**
| Buggy | Issue | Fixed |
|-------|-------|-------|
| `div[class*="rating"] input[type="radio"]` | Breaks on CSS refactor | `data-testid="review-rating"` |
| `input[aria-label="Review Title"]` | Breaks if label renamed | `data-testid="review-title-input"` |
| `textarea.review-body-input` | Class-dependent | `data-testid="review-body"` |
| `button { name: "Submit Review" }` | Breaks if text changes | `data-testid="submit-review-btn"` |
| Complex xpath with `:has-text()` | Fragile selector | `data-testid="review-success-message"` |

**Key Patterns:**
- ✅ Scope fixes narrowly (locators only)
- ✅ Keep method signatures unchanged
- ✅ Use stable `data-testid` per convention
- ✅ Avoid brittle selectors: no CSS classes, xpath, aria-label, text matching
- ✅ Output corrected code only (minimal diff)

**Tests:**
1. Submit review: Fill form → Success message visible ✓
2. Form visibility: All elements present & visible ✓

---

## Exercise 5 — Utility Fix

**Objective:** Practice minimal, safe fixes to utility functions. Add null/undefined guards without rewriting logic.

**Deliverables:**
- `dateHelper.ts`: Added null/undefined guards and safe defaults
- `tests/unit/dateHelper.spec.ts`: Unit tests for edge cases

**Key Patterns:**
- ✅ Minimal changes: Guard clauses only
- ✅ Type signatures updated for null/undefined
- ✅ Safe defaults (empty string, 0)
- ✅ Logging for edge cases
- ✅ Core logic unchanged

**Tests (Unit):**
1. Format valid date → Correct format ✓
2. Format null/undefined → Empty string ✓
3. Parse null/undefined → Empty string ✓
4. Days between valid dates → Correct difference ✓
5. Days between null/undefined → 0 ✓

---

## Framework Summary

**Stack:** TypeScript + Playwright + POM/COM  
**Base Classes:** `BasePage`, `BaseComponent`  
**Utilities:** `Logger`, `EnvHelper`  
**Assertions:** Web-first only (no `waitForSelector`, no hard waits)  
**Selectors:** `getByRole()`, `getByLabel()`, `getByTestId()` only  
**Test Setup:** Fixture-based injection in `baseTest.ts`
