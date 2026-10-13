import { test, expect } from '@playwright/test';
import { ProductDataMatchPage } from '../pages/productDataMatchPage';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';

test.afterEach(async () => {
    runReport.save();
});

test('TC_72 - Product Data Match', async ({ page }) => {
    const productDataMatchPage = new ProductDataMatchPage(page);
    let plpTitle = '';
    let plpPrice = 0;
    let pdpTitle = '';
    let pdpPrice = 0;

    await test.step('Navigate to the PLP and wait for idle state', async () => {
        await productDataMatchPage.openPlp();
        await productDataMatchPage.waitForPageLoad();
    });

    await test.step('Locate the first product card', async () => {
        await expect(productDataMatchPage.getProductCards().first()).toBeVisible();
    });

    await test.step('Extract the exact product title string from the PLP card', async () => {
        plpTitle = await productDataMatchPage.getCardTitleText(0);
    });

    await test.step('Extract the exact product price string from the PLP card', async () => {
        plpPrice = await productDataMatchPage.getCardPrice(0);
    });

    await test.step('Click the product card to navigate to the PDP', async () => {
        await productDataMatchPage.clickFirstProductCard();
    });

    await test.step('Wait for the PDP to fully render', async () => {
        await productDataMatchPage.waitForPdp();
    });

    await test.step('Extract the main product header string on the PDP', async () => {
        pdpTitle = await productDataMatchPage.getPdpTitleText();
    });

    await test.step('Extract the main price string on the PDP', async () => {
        pdpPrice = await productDataMatchPage.getPdpPrice();
    });

    await test.step('Assert the PLP title matches the PDP title', async () => {
        logger.info(`TC_72 PLP: ${plpTitle} | PDP: ${pdpTitle}`);
        expect(plpTitle).toContain(pdpTitle);
    });

    await test.step('Assert the PLP price matches the PDP price', async () => {
        expect(pdpPrice).toBe(plpPrice);
    });
});
