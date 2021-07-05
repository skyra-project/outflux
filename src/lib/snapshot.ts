import { dataTestIdSelector, waitForAndClick, waitForAndType } from '#lib/utils';
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

	await waitForAndType(page, dataTestIdSelector('username'), INFLUX.INFLUX_LOGIN_USERNAME);
	await waitForAndType(page, dataTestIdSelector('password'), INFLUX.INFLUX_LOGIN_PASSWORD);
	await waitForAndClick(page, `button[type="submit"]${dataTestIdSelector('button')}`);

	await waitForAndClick(page, dataTestIdSelector('nav-item-dashboards'));
	await waitForAndClick(page, `${dataTestIdSelector('dashboard-card')}:nth-child(3) > div > div > span`);
	await waitForAndClick(page, dataTestIdSelector('timerange-dropdown'));
	await waitForAndClick(page, 'div[id="Past 30d"]');
	await waitForAndClick(page, dataTestIdSelector('presentation-mode-toggle'));

	await page.$eval('.variables-control-bar', (element) => element.remove());
	await page.$eval('#cf-notification-container-right-top', (element) => element.remove());

	await page.mouse.click(0, 0);

	const screenshot = await page.screenshot();

	await browser.close();

	return screenshot as Buffer;
};
