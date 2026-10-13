import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';

export class CustomWorld extends World {
  page!: Page;
  [key: string]: any;   // holds each flow's page object (filterVisibilityPage, etc.)
}

setWorldConstructor(CustomWorld);