import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_69');

export class SortWithActiveFilterLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly RESULT_COUNT = '[data-test-id="search-query-text"]';

    static readonly COLOR_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Color"])';

    static readonly COLOR_OPTION = `[data-test-id^="filter-item-business_color_v2-"][data-test-id$="-${data.color}"]`;

    static readonly LOADING_SPINNER = '[class*="animate-spin"]';

    static readonly SORT_BUTTON = '[data-test-id="sort-bar-desktop:dropdown-button"]';

    static readonly SORT_LIST = '[data-test-id="sort-bar-desktop:dropdown-list"]';

    static readonly SORT_OPTION_ROLE = 'option';

    static readonly LOW_TO_HIGH = data.lowToHighLabel;

    static readonly LOW_TO_HIGH_OPTION = '[data-test-id$="_price_asc"]';

    static readonly CARD_PRICE = '[data-test-id="product-card-product-card:selling-price"]';

    static readonly COLOR_CHECKBOX = `[data-test-id^="filter-checkbox-business_color_v2-"][data-test-id$="-${data.color}"]`;
}
