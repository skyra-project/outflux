import { INFLUX } from '@root/config';
import puppeteer from 'puppeteer';

export class DashboardManager {
	// @ts-ignore TODO: Remove this when browser is used
	private browser!: puppeteer.Browser;

	public async Init() {
		this.browser = await puppeteer.launch({
			timeout: 0,
			defaultViewport: {
				width: 4096,
				height: 2160
			}
		});
	}

	// @ts-ignore TODO: Remove this once login is used
	private async login(page: puppeteer.Page) {
		await page.goto(INFLUX.BASE_URL, { waitUntil: 'networkidle2' });

		await page.type('[name=username]', INFLUX.INFLUX_LOGIN_USERNAME);
		await page.type('[name=password]', INFLUX.INFLUX_LOGIN_PASSWORD);
		await page.click('.cf-button-primary');

		await page.waitForNavigation({
			waitUntil: ['load', 'domcontentloaded', 'networkidle2']
		});
	}
}
