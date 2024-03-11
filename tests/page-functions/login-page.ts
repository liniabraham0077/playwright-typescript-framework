import { expect, Page } from "@playwright/test";
import { loginPageObject } from "../pageObjects/login.page";
import { commonUtils } from "../utils/common-utils";
import { pageUtils } from "../utils/page-utils";

export const loginPage = () => {

    const navigateToUrl = async (page: Page, hostname: string, path: string) => {
        await pageUtils().navigateTo(page, hostname, path);
    };

    const verifyLoginPageElements = async(page: Page) => {
        await expect(page.locator(loginPageObject.loginPageLogo)).toBeVisible();
        await expect(await page.title()).toBe("Swag Labs");
         await expect(
           page.locator(loginPageObject.username)
         ).toBeVisible();
           await expect(page.locator(loginPageObject.password)).toBeVisible();
                      await expect(
                        page.locator(loginPageObject.loginButton)
                      ).toBeEnabled();
    }
     const login = async (page: Page, userType: string) => {
        const testData = await commonUtils().getTestData();

        await page
          .locator(loginPageObject.username)
          .fill(testData[userType].username);
        await page
          .locator(loginPageObject.password)
          .fill(testData[userType].password);
        await page.locator(loginPageObject.loginButton).click();
     };

    return {
      navigateToUrl: async (page: Page, hostname: string, path: string) => navigateToUrl(page, hostname, path),
      verifyLoginPageElements: async (page: Page) =>
        verifyLoginPageElements(page),
      login: async (page: Page, userType: string) => login(page, userType),
    };
}