import { clickByText, dataTestIdSelector, waitForAndClick } from '#lib/utils';
import { INFLUX } from '#root/config';
import puppeteer from 'puppeteer';

export const createSnapshot = async (headless = true): Promise<Buffer> => {
	const browser = await puppeteer.launch({
		timeout: 0,
		dumpio: !headless,
		headless,
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-translate', '--disable-extensions'],
		ignoreHTTPSErrors: true,
		defaultViewport: {
			width: 1280,
			height: 750
		}
	});

	const page = await browser.newPage();

	await page.goto(INFLUX.BASE_URL, { waitUntil: 'networkidle2' });

	await page.type(dataTestIdSelector('username'), INFLUX.INFLUX_LOGIN_USERNAME);
	await page.type(dataTestIdSelector('password'), INFLUX.INFLUX_LOGIN_PASSWORD);
	await page.click(`button[type="submit"]${dataTestIdSelector('button')}`);

	await waitForAndClick(page, dataTestIdSelector('nav-item-dashboards'));
	await clickByText(page, 'Outflux Data');
	await waitForAndClick(page, dataTestIdSelector('timerange-dropdown'));
	await page.click('div[id="Past 24h"]');
	await page.click(dataTestIdSelector('presentation-mode-toggle'));

	await page.$eval('.variables-control-bar', (element) => element.remove());
	await page.$eval('#cf-notification-container-right-top', (element) => element.remove());

	const screenshot = await page.screenshot();

	await browser.close();

	return screenshot as Buffer;
};
