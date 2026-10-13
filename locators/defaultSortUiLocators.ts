import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_65');

export class DefaultSortUiLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly SORT_BUTTON = '[data-test-id="sort-bar-desktop:dropdown-button"]';
}
