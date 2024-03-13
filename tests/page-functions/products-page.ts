import {type BrowserContext, type Page} from '@playwright/test';
import {productsPageObject} from '../pageObjects/products.page';
import {pageUtils} from '../utils/page-utils';

export const productsPage = () => {
	const verifySocialNetworkLink = async (context: BrowserContext,
		page: Page, linkToVerify: string,
	) => {
		if (linkToVerify === 'facebookLink') {
			await pageUtils().verifyChildPage(
				context,
				page.locator(productsPageObject[linkToVerify]),
				'Sauce Labs',
				'https://www.facebook.com/saucelabs',
			);
		} else if (linkToVerify === 'linkedInLink') {
			await pageUtils().verifyChildPage(
				context,
				page.locator(productsPageObject[linkToVerify]),
				'Sauce Labs | LinkedIn',
				'https://www.linkedin.com/company/sauce-labs',
			);
		}
	};

	return {
		verifySocialNetworkLink: async (
			context: BrowserContext,
			page: Page,
			linkToVerify: string,
		) => verifySocialNetworkLink(context, page, linkToVerify),
	};
};
