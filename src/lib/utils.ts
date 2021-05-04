import type { Page } from 'puppeteer';

export const dataTestIdSelector = (id: string) => `[data-testid="${id}"]`;

export const waitForAndClick = async (page: Page, selector: string) => {
	await page.waitForSelector(selector);
	await page.click(selector);
};

export const waitForAndType = async (page: Page, selector: string, textToType: string) => {
	await page.waitForSelector(selector);
	await page.type(selector, textToType);
};
