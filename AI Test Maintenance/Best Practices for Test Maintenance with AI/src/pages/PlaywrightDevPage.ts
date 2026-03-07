import { expect, type Locator, type Page } from '@playwright/test';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly installationHeader: Locator;
  readonly pomLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.installationHeader = page.getByRole('heading', { name: 'Installation', level: 1 });
    this.pomLink = page.getByRole('link', { name: 'Page Object Model' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.installationHeader).toBeVisible();
  }

  async navigateToPageObjectModel() {
    await this.getStarted();
    await this.pomLink.first().click();
  }
}
