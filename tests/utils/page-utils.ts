import {
	type BrowserContext, type Page, type Locator, expect,
} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export const pageUtils = () => {
	const navigateTo = async (page: Page, hostname: string, path: string) => {
		const url = process.env[hostname] + path;
		await page.goto(url);
		await page.waitForLoadState('domcontentloaded');
	};

	const verifyChildPage = async (context: BrowserContext, locator: Locator, title: string, url: string) => {
		const [childPage] = await Promise.all([
			context.waitForEvent('page'),
			locator.click(),
		]);
		await childPage.waitForLoadState('networkidle');
		expect(await childPage.title()).toContain(title);
		expect(childPage.url()).toContain(url);
		await childPage.close();
	};

	return {
		navigateTo: async (page: Page, hostname: string, path: string) =>
			navigateTo(page, hostname, path),
		verifyChildPage: async (context: BrowserContext, locator: Locator, title: string, url: string) => verifyChildPage(context, locator, title, url),
	};
};
