import { test, expect } from '@playwright/test';
for (const reverse of [false, true]) for (const direction of ['top', 'bottom', 'left', 'right']) {
 test(`${direction}, reverse=${reverse}: whole rows only`, async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Reverse JSX order').setChecked(reverse);
  await page.getByLabel('Overflow edge').selectOption(direction);
  for (const gap of [8, 0, 24]) {
  await page.getByLabel('Gap', { exact: true }).fill(String(gap));
  for (const itemSize of [64, 20, 48, 100, 160]) {
  await page.getByLabel('Item size', { exact: true }).fill(String(itemSize));
  for (const height of [0, itemSize - 1, itemSize, itemSize + gap, 2 * itemSize + gap - 1, 2 * itemSize + gap, 512]) {
   await page.getByLabel(direction === 'left' || direction === 'right' ? 'Available width' : 'Available height').fill(String(height));
   const names = ['Alpha','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel'];
   if (reverse) names.reverse();
   const count = Math.min(8, Math.floor((height + gap) / (itemSize + gap)));
   const visible = (direction === 'bottom' || direction === 'right') ? names.slice(0,count) : names.slice(8-count);
   await expect(page.getByRole('button')).toHaveCount(count);
   for (const name of visible) await expect(page.getByRole('button', { name: new RegExp(name) })).toBeVisible();
   const horizontal = direction === 'left' || direction === 'right';
   const boxes = await page.getByRole('button').evaluateAll(elements => elements.map(element => {
     const { x, y, width, height } = element.getBoundingClientRect();
     return { x, y, width, height };
   }));
   for (let i = 0; i < boxes.length; i++) {
     expect(horizontal ? boxes[i].width : boxes[i].height).toBe(itemSize);
     if (i > 0) expect(horizontal ? boxes[i].x - boxes[i - 1].x : boxes[i].y - boxes[i - 1].y).toBe(itemSize + gap);
   }
  }
  }
  }
 });
}

test('slider tracks stay fixed as their value labels change', async ({ page }) => {
  await page.goto('/');
  for (const viewport of [960, 600]) {
    await page.setViewportSize({ width: viewport, height: 900 });
    for (const label of ['Available height', 'Available width']) {
      const slider = page.getByLabel(label);
      await slider.fill('9');
      const initial = await slider.boundingBox();
      for (const value of ['10', '99', '100', '520']) {
        await slider.fill(value);
        expect(await slider.boundingBox()).toEqual(initial);
      }
    }
  }
});

test('optional reveal transition respects overflow and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const item = page.locator('button').filter({ hasText: 'Alpha' }).locator('..');
  await expect(item).toHaveCSS('transition-duration', '0s');
  await page.getByLabel('Animate reveals').check();
  await expect(item).toHaveCSS('transition-duration', '0.18s');
  await page.getByLabel('Available height', { exact: true }).fill('63');
  await expect(item).toHaveCSS('visibility', 'hidden');
  await expect(item).toHaveCSS('transition-duration', '0s');
  await page.getByLabel('Available height', { exact: true }).fill('64');
  await expect(item).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(item).toHaveCSS('transition-duration', '0s');
});
