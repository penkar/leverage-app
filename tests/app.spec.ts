import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Has the correct title', async ({ page }) => {
  await expect(page).toHaveTitle('Capper Collection');
  await expect(page.getByRole('heading', { name: 'Capper' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Collection' })).toBeVisible();
});

test('renders the episode list along the bottom', async ({ page }) => {
  const episodeOne = page.getByText('The Nigerian Job');
  const episodeOneLink = page.locator('#episode-0 .card-footer a');
  await expect(episodeOne).toBeVisible();
  await expect(episodeOneLink).toHaveAttribute(
    'href',
    'https://youtu.be/YM6-fBB7yQY?si=CC9A1LwVBTDNguaL',
  );
  await expect(episodeOneLink).toHaveAttribute('target', '_blank');
  await expect(episodeOneLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('renders the Event Types button and filers', async ({ page }) => {
  const eventTypeButton = page.getByRole('button', { name: 'Event Types' });
  await expect(eventTypeButton).toBeVisible();
});

test('clicking on an event type filter hides unrelated events', async ({
  page,
}) => {
  const exInsuranceInvestigation = page.getByText('Ex-insurance investigator');
  const ceoBeringAerospace = page.locator('#events .event', {
    hasText: 'The CEO of Bering Aerospace.',
  });

  await expect(exInsuranceInvestigation).toBeVisible();
  await expect(ceoBeringAerospace.first()).not.toHaveClass(/hide/);
  const titleDropCheckbox = page.getByRole('checkbox', {
    name: 'Title Drop',
  });
  await expect(titleDropCheckbox).not.toBeVisible();

  const eventTypeButton = page.getByRole('button', { name: 'Event Types' });
  await expect(eventTypeButton).toBeVisible();

  await eventTypeButton.click();
  await expect(titleDropCheckbox).toBeVisible();

  await titleDropCheckbox.click();
  await expect(ceoBeringAerospace.first()).toHaveClass(/hide/);
});

test('renders cover page and content sections', async ({ page }) => {
  const contentSection = page.locator('#content');
  await contentSection.scrollIntoViewIfNeeded();

  await expect
    .poll(async () => page.evaluate(() => window.scrollY))
    .toBeGreaterThanOrEqual(1);
});

test('hoverinv over an event will increase the scale', async ({ page }) => {
  const event = page.locator('#events .event', {
    hasText: 'The CEO of Bering Aerospace.',
  });
  await expect(event.first()).toHaveCSS(
    'transform',
    'matrix(1, 0, 0, 1, 0, 0)',
  );

  await event.first().hover();
  await expect(event.first()).toHaveCSS(
    'transform',
    'matrix(1.05, 0, 0, 1.05, 0, 0)',
  );
});
