import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_57');

export class ApplySingleColorFilterLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly RESULT_COUNT = '[data-test-id="search-query-text"]';

    static readonly COLOR_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Color"])';

    static readonly COLOR_OPTION = `[data-test-id^="filter-item-business_color_v2-"][data-test-id$="-${data.color}"]`;

    static readonly LOADING_SPINNER = '[class*="animate-spin"]';

    static readonly COLOR_CHECKBOX = `[data-test-id^="filter-checkbox-business_color_v2-"][data-test-id$="-${data.color}"]`;

    static readonly CARD_IMAGE = '[data-test-id="product-card-product-image:img"]';
}
