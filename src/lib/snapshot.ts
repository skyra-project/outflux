import { clickByText, dataTestIdSelector, waitForAndClick, waitForAndType } from '#lib/utils';
import { INFLUX } from '#root/config';
import puppeteer from 'puppeteer';

export const createSnapshot = async (headless = true): Promise<Buffer> => {
	const browser = await puppeteer.launch({
		timeout: 0,
		dumpio: !headless,
		headless,
		defaultViewport: {
			width: 1920,
			height: 1080
		}
	});

	const page = await browser.newPage();

	await page.goto(INFLUX.BASE_URL, { waitUntil: 'networkidle2' });

	await waitForAndType(page, dataTestIdSelector('username'), INFLUX.INFLUX_LOGIN_USERNAME);
	await waitForAndType(page, dataTestIdSelector('password'), INFLUX.INFLUX_LOGIN_PASSWORD);
	await waitForAndClick(page, `button[type="submit"]${dataTestIdSelector('button')}`);

	await waitForAndClick(page, dataTestIdSelector('nav-item-dashboards'));
	await clickByText(page, 'Outflux Data');
	await waitForAndClick(page, dataTestIdSelector('timerange-dropdown'));
	await waitForAndClick(page, 'div[id="Past 24h"]');
	await waitForAndClick(page, dataTestIdSelector('presentation-mode-toggle'));

	await page.$eval('.variables-control-bar', (element) => element.remove());
	await page.$eval('#cf-notification-container-right-top', (element) => element.remove());

	const screenshot = await page.screenshot({ fullPage: true });

	await browser.close();

	return screenshot as Buffer;
};
