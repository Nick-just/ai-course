# Legacy Test Analysis Report — Chapter 2
**Test File**: `tests/main.navigation.spec.ts`  
**Status**: ⚠️ **No code changes applied in Chapter 2.** Degradations left in place for Chapter 3 refactoring.

---

## Degradations Introduced

### 1. ❌ Brittle ID Selector (line ~82)
```typescript
// Changed FROM: await nav.clickDocs();
// Changed TO:   await page.locator('#docs').click();
```
**Why it's a problem**: Breaks on DOM refactors; no accessibility enforcement; violates POM encapsulation.

### 2. ❌ Fixed Wait (line ~84)
```typescript
await page.waitForTimeout(2000); // Instead of state-based assertion
```
**Why it's a problem**: Introduces flakiness, wastes time, unreliable on CI/CD with network variance.

---

## Critical Issues Found

| Issue | Severity | Fix |
|-------|----------|-----|
| Brittle ID selector for Docs link | 🔴 CRITICAL | Revert to POM: `nav.clickDocs()` |
| Fixed 2-second wait | 🔴 CRITICAL | Use state-based assertion: `toHaveURL()` |
| Inconsistent POM usage | 🟠 HIGH | Standardize all navigation through POM |
| Missing accessibility assertions in Docs test | 🟠 HIGH | Add `toHaveAccessibleName()` checks |
| No explicit per-link visibility check | 🟠 HIGH | Add `toBeVisible()` before click |
| No ARIA landmark verification | 🟡 MEDIUM | Assert `nav.nav` visible in setup |
| Missing page load validation beyond URL | 🟡 MEDIUM | Add secondary markers (breadcrumb, heading level) |
| No keyboard accessibility testing | 🟡 MEDIUM | Add Tab-navigation and focus tests |
| Missing edge cases (deleted link, disabled state) | 🟡 MEDIUM | Add negative test cases |
| No performance baseline | 🟡 MEDIUM | Add explicit timeout: `{ timeout: 5000 }` |

---

## Additional Findings (Beyond AI Analysis)

**Issue #1**: Test validates URL + heading but not full page load state. Could pass on error pages with coincidental headings.  
**Issue #2**: No keyboard accessibility checks (Tab, Enter, focus outline visible).  
**Issue #3**: Implicit test reset (via `beforeEach`) hides ordering dependencies; should add explicit `toHaveURL('/')` check at start.  
**Issue #4**: No negative/edge cases: missing link, disabled link, new tab open.  
**Issue #5**: No performance measurement or timeout validation for navigation speed.

---

## Priority Fix Checklist

### 🔴 CRITICAL
- [ ] **C1**: Revert `#docs` to `nav.clickDocs()` (role-based, POM)
- [ ] **C2**: Replace `waitForTimeout(2000)` with `toHaveURL()` auto-retry
- [ ] **C3**: Add heading visibility check to degraded Docs test
- [ ] **C4**: Standardize all navigation through POM (no direct `page.locator()`)

### 🟠 HIGH
- [ ] **H1**: Add `toBeVisible()` before clicking each link
- [ ] **H2**: Add `toHaveAccessibleName()` in individual navigation tests
- [ ] **H3**: Add `await expect(nav.nav).toBeVisible()` in setup
- [ ] **H4**: Ensure API & Community tests remain POM-consistent

### 🟡 MEDIUM
- [ ] **M1-M5**: Add edge cases, keyboard tests, page load markers, start assertion, timeout validation

---

## Impact Notes

| Issue | Impact | Consequence |
|-------|--------|-------------|
| Fixed timeouts 🔴 | Flakiness + Slowness | Fails on CI if network slow; wastes 2-3s per run |
| Brittle selectors 🔴 | False negatives | ID refactor breaks test; 30min debug time |
| Inconsistent POM 🟠 | Duplication + Confusion | New devs unsure which pattern to follow |
| Missing accessibility 🟠 | Accessibility regressions | Hidden link passes test; ships inaccessible feature |
| No edge cases 🟡 | Incomplete coverage | Deleted link slips through if conditionally rendered |
| No page load validation 🟡 | False positives | Test passes on error pages with lucky headings |

---

## Verification (Chapter 2 Complete)

✅ Degraded spec at: `tests/main.navigation.spec.ts`  
✅ Report at: `docs/legacy-test-analysis.md`  
✅ Report states: "No code changes applied in Chapter 2"  
✅ Degradations remain unfixed (ready for Chapter 3)

**Next Steps**: Use this report to refactor and fix all issues in Chapter 3.

---

**End of Report**
