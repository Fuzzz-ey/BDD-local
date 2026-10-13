import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_58');

export class ApplyMultipleFiltersLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly RESULT_COUNT = '[data-test-id="search-query-text"]';

    static readonly SIZE_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Size"])';

    static readonly SIZE_OPTION = `[data-test-id="filter-item-indian_size-${data.size}"]`;

    static readonly COLOR_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Color"])';

    static readonly COLOR_OPTION = `[data-test-id^="filter-item-business_color_v2-"][data-test-id$="-${data.color}"]`;

    static readonly LOADING_SPINNER = '[class*="animate-spin"]';

    static readonly SIZE_CHECKBOX = `[data-test-id="filter-checkbox-indian_size-${data.size}"]`;

    static readonly COLOR_CHECKBOX = `[data-test-id^="filter-checkbox-business_color_v2-"][data-test-id$="-${data.color}"]`;

    static readonly CARD_TITLE = '[data-test-id="product-card:product-card:title"]';

    static readonly CARD_PRICE = '[data-test-id="product-card-product-card:selling-price"]';
}
