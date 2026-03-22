import { expect, test } from '@playwright/test';

test('renders cover page and content sections', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Capper' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Collection' })).toBeVisible();

  const titleDropCheckbox = page.getByRole('checkbox', { name: 'Title Drop' });
  await expect(titleDropCheckbox).not.toBeVisible();

  const eventTypeButton = page.getByRole('button', { name: 'Event Types' });
  await expect(eventTypeButton).toBeVisible();
  
  await eventTypeButton.click();
  await expect(titleDropCheckbox).toBeVisible();

  const contentSection = page.locator('#content');
  await contentSection.scrollIntoViewIfNeeded();

  await expect
    .poll(async () => page.evaluate(() => window.scrollY))
    .toBeGreaterThanOrEqual(1);
});
