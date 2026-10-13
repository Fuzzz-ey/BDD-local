import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_70');

export class SortUrlParameterLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly SORT_BUTTON = '[data-test-id="sort-bar-desktop:dropdown-button"]';

    static readonly SORT_LIST = '[data-test-id="sort-bar-desktop:dropdown-list"]';

    static readonly LOW_TO_HIGH = data.lowToHighLabel;

    static readonly LOW_TO_HIGH_OPTION = '[data-test-id$="_price_asc"]';

    static readonly SORT_PARAM = data.sortParam;
}