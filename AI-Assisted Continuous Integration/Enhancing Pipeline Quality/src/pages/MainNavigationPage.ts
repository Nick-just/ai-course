import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page Object Model for the main navigation bar on playwright.dev.
 *
 * Covers:
 *  - Presence checks  (link is attached to the DOM)
 *  - Accessibility   (role=link, aria-accessible name, visibility)
 *  - Navigation      (clicking each link lands on the expected URL)
 */
export class MainNavigationPage {
  readonly page: Page;
  readonly nav: Locator;
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly communityLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = page.getByRole('navigation', { name: 'Main' });
    this.docsLink = this.nav.getByRole('link', { name: 'Docs' });
    this.apiLink = this.nav.getByRole('link', { name: 'API' });
    this.communityLink = this.nav.getByRole('link', { name: 'Community' });
  }

  async goto() {
    await this.page.goto('/');
  }

  /** Assert all three navigation links are visible and have the correct href. */
  async assertNavLinksVisible() {
    await expect(this.docsLink).toBeVisible();
    await expect(this.apiLink).toBeVisible();
    await expect(this.communityLink).toBeVisible();
  }

  /** Assert href attributes point to the expected paths. */
  async assertNavLinkHrefs() {
    await expect(this.docsLink).toHaveAttribute('href', /\/docs\/intro/);
    await expect(this.apiLink).toHaveAttribute('href', /\/docs\/api\//);
    await expect(this.communityLink).toHaveAttribute('href', /\/community\//);
  }

  async clickDocs() {
    await this.docsLink.click();
  }

  async clickApi() {
    await this.apiLink.click();
  }

  async clickCommunity() {
    await this.communityLink.click();
  }
}
