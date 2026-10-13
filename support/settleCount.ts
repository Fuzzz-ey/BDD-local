import { Page } from '@playwright/test';

const RESULT_COUNT = '[data-test-id="search-query-text"]';

// Returns the result count text once it has stopped changing for stableMs.
export async function settleResultCount(
  page: Page,
  stableMs = 2000,
  timeoutMs = 30000
): Promise<string> {
  const read = async () => (await page.locator(RESULT_COUNT).innerText()).trim();
  const start = Date.now();
  let last = await read();
  let lastChange = Date.now();

  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 300));
    const current = await read();
    if (current !== last) {
      last = current;
      lastChange = Date.now();
    } else if (Date.now() - lastChange >= stableMs) {
      return last;
    }
  }
  throw new Error(`Result count did not settle within ${timeoutMs}ms (last: ${last})`);
}