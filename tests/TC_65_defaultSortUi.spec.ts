import { test, expect } from '@playwright/test';
import { DefaultSortUiPage } from '../pages/defaultSortUiPage';
import { logger } from '../utils/logger';
import { captureScreenShot, runReport } from '../utils/runReport';
import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_65');

test.afterEach(async () => {
    runReport.save();
});

test('TC_65 - Default Sort UI', async ({ page }) => {
    const defaultSortUiPage = new DefaultSortUiPage(page);
    let selectedSort = '';

    await test.step('Navigate to the Decathlon PLP', async () => {
        await defaultSortUiPage.openPlp();
    });

    await test.step('Wait for the primary product grid to load', async () => {
        await defaultSortUiPage.waitForProductGrid();
    });

    await test.step('Scroll the sorting dropdown into the viewport', async () => {
        await defaultSortUiPage.scrollToSortDropdown();
    });

    await test.step('Locate the dropdown select element', async () => {
        await expect(defaultSortUiPage.getSortDropdown()).toBeVisible();
    });

    await test.step('Extract the inner text of the currently selected option', async () => {
        selectedSort = await defaultSortUiPage.getSelectedSortText();
    });

    await test.step("Assert the text matches the expected default (e.g., 'Relevance')", async () => {
        expect(selectedSort).toContain(data.defaultSort);
    });

    await test.step('Capture screenshot of the dropdown', async () => {
        await captureScreenShot(page, 'TC_65 Default Sort');
    });
});
