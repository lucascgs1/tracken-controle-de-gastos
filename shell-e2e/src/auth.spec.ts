import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
	test('should redirect to login when accessing root unauthenticated', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveURL(/.*\/auth\/login/);
		await expect(page.locator('h1')).toContainText('Tracken');
	});

	test('should login successfully with demo credentials', async ({ page }) => {
		await page.goto('/auth/login');

		// Fill credentials
		await page.fill('input[type="email"]', 'demo@tracken.com');
		await page.fill('input[type="password"]', 'password123');

		// Submit
		await page.click('button[type="submit"]');

		// Should redirect to dashboard
		await expect(page).toHaveURL(/.*\/dashboard/);

		// Should see dashboard summary cards
		await expect(page.locator('.summary-card')).toHaveCount(3);
	});

	test('should show validation error for invalid email', async ({ page }) => {
		await page.goto('/auth/login');

		await page.locator('input[type="email"]').fill('invalid-email');
		await page.locator('input[type="email"]').blur();

		// Error message should appear (handled by lib-tracken-input)
		const error = page.locator('.error-msg');
		await expect(error).toBeVisible();
	});
});
