// ============================================================
// File: src/components/NavigationBar.ts
// Description: Component Object for the site-wide navigation bar
// ============================================================

import { type Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * Component Object for the top navigation bar.
 * Re-usable across any page that renders the shared header.
 */
export class NavigationBar extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByRole('navigation', { name: 'Main' }));
  }

  // ── Link accessors ─────────────────────────────────────────

  /** Click the "Home" navigation link. */
  async goToHome(): Promise<void> {
    this.logger.info('Navigating to Home via navbar');
    await this.getByRole('link', { name: 'Home' }).click();
  }

  /** Click the "Profile" navigation link. */
  async goToProfile(): Promise<void> {
    this.logger.info('Navigating to Profile via navbar');
    await this.getByRole('link', { name: 'Profile' }).click();
  }

  /** Click the "Settings" navigation link. */
  async goToSettings(): Promise<void> {
    this.logger.info('Navigating to Settings via navbar');
    await this.getByRole('link', { name: 'Settings' }).click();
  }

  // ── User menu ──────────────────────────────────────────────

  /** Open the user avatar dropdown menu. */
  async openUserMenu(): Promise<void> {
    this.logger.info('Opening user menu');
    await this.getByTestId('user-avatar').click();
  }

  /** Click the Sign-out option inside the user menu. */
  async signOut(): Promise<void> {
    await this.openUserMenu();
    this.logger.info('Signing out');
    await this.getByRole('menuitem', { name: 'Sign out' }).click();
  }
}
