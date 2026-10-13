import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { runReport } from '../utils/runReport';
import { CustomWorld } from '../support/world';

setDefaultTimeout(120 * 1000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
  const context = await browser.newContext({
    baseURL: process.env.BASE_URL || 'https://www.decathlon.in'
  });
  this.page = await context.newPage();
});

After(async function (this: CustomWorld) {
  runReport.save();                 // same as test.afterEach in the spec
  await this.page.context().close();
});

AfterAll(async function () {
  await browser.close();
});