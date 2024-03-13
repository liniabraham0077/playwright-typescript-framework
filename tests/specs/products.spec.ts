import {test} from '@playwright/test';
import {loginPage} from '../page-functions/login-page';
import {productsPage} from '../page-functions/products-page';

test.describe('@smoke: Login as a standard user to verify the products page and logout from the application', () => {
	test.only('Login to App as a standard user and verify navigation to social network links', async ({
		browser,
	}) => {
		await test.step('Open the APP and login', async () => {
			const context = await browser.newContext();
			const page = await context.newPage();
			await loginPage().navigateToUrl(page, 'TEST_HOSTNAME', '/');
			await loginPage().verifyLoginPageElements(page);
			await loginPage().login(page, 'standardUser');
			await productsPage().verifySocialNetworkLink(
				context,
				page,
				'facebookLink',
			);
			await productsPage().verifySocialNetworkLink(
				context,
				page,
				'linkedInLink',
			);
			await page.close();
		});
	});
});
