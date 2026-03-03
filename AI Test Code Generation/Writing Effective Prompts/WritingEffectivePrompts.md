# Writing Effective Prompts for Test Automation

## Core Principles

### 1. **Structural Clarity**
- Use Page Object Model (POM) + Component Object Model (COM) patterns
- Import existing base classes: `BasePage`, `BaseComponent`
- Provide typed fixtures for reusable components
- Keep test logic DRY with parameterized helper methods

### 2. **Selector Strategy**
- **Only approved methods:** `getByRole()`, `getByLabel()`, `getByTestId()`
- Return locators from getters for test flexibility
- Centralize selectors in helper methods
- Avoid raw `page.locator()` in test files

### 3. **Web-First Assertions**
- Use `await expect().toBeVisible()`, `toHaveURL()`, `toBeEnabled()`
- Replace `waitForSelector()` and `waitForTimeout()` with web-first patterns
- Let Playwright handle implicit waits via locator strategies
- No hard delays—trust auto-wait mechanisms

### 4. **Test Data Management**
- Extract hard-coded credentials to `.env` files
- Move shared test data to `src/fixtures/testData.ts`
- Use environment helpers: `envHelper.getEnvVariable()`
- Keep tests focused on behavior, not data setup

### 5. **Method Consolidation**
- Reduce 3+ similar methods → 1 parameterized method
- Extract common test flows as reusable helpers with JSDoc
- Aim for 20-30% fewer lines without losing coverage
- Employ fixture-based test setup for consistency

## Best Practices

✅ Descriptive test names → Clearly state the scenario  
✅ Fixture injection → Auto-provision page objects  
✅ Logger utility → Track test flow via `logger.info()`  
✅ Typed methods → Include parameter/return types  
✅ Comments → Mark Initialization, Actions, Verification phases  
✅ Parallel execution ready → Isolated test state

## Next Steps
- Centralize test credentials in `.env`
- Setup API mocking for faster executions
- Enable CI/CD pipeline integration
- Configure parallel test runs
