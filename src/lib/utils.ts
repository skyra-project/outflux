import type { Page } from 'puppeteer';

const escapeXpathString = (str: string) => {
	const splittedQuotes = str.replace(/'/g, `', "'", '`);
	return `concat('${splittedQuotes}', '')`;
};

export const clickByText = async (page: Page, text: string) => {
	const escapedText = escapeXpathString(text);
	const handlers = await page.$x(`//span[contains(text(), ${escapedText})]`);

	if (handlers.length > 0) {
		await handlers[0].click();
	} else {
		throw new Error(`Text not found: ${text}`);
	}
};

export const dataTestIdSelector = (id: string) => `[data-testid="${id}"]`;

export const waitForAndClick = async (page: Page, selector: string) => {
	await page.waitForSelector(selector);
	await page.click(selector);
};

export const waitForAndType = async (page: Page, selector: string, textToType: string) => {
	await page.waitForSelector(selector);
	await page.type(selector, textToType);
};
