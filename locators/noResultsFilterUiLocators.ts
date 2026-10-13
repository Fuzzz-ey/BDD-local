import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_60');

export class NoResultsFilterUiLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly RESULT_COUNT = '[data-test-id="search-query-text"]';

    static readonly LOADING_SPINNER = '[class*="animate-spin"]';

    static readonly SIZE_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Size"])';

    static readonly SIZE_OPTION = `[data-test-id="filter-item-indian_size-${data.size}"]`;

    static readonly COLOR_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Color"])';

    static readonly ALL_COLOR_OPTIONS = '[data-test-id^="filter-item-business_color_v2-"]';

    static readonly CONFLICTING_COLOR_OPTION = `[data-test-id^="filter-item-business_color_v2-"][data-test-id$="-${data.color}"]`;

    static readonly CONFLICTING_FILTER_QUERY = `inStock=1&indian_size=${data.size}&business_color_v2=%23${data.colorHex}-${data.color}`;

    static readonly COLLECTIONS_TEXT = data.expectedMessage;
}