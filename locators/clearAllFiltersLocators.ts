import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_62');

export class ClearAllFiltersLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly RESULT_COUNT = '[data-test-id="search-query-text"]';

    static readonly SIZE_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Size"])';

    static readonly SIZE_OPTION = `[data-test-id="filter-item-indian_size-${data.size}"]`;

    static readonly COLOR_ACCORDION = '[data-test-id="filter-sidebar-desktop:container"] button[aria-expanded]:has([data-test-id="title:Color"])';

    static readonly COLOR_OPTION = `[data-test-id^="filter-item-business_color_v2-"][data-test-id$="-${data.color}"]`;

    static readonly LOADING_SPINNER = '[class*="animate-spin"]';

    static readonly FILTER_SIDEBAR = '[data-test-id="filter-sidebar-desktop:container"]';

    static readonly CLEAR_ALL = '[data-test-id="filter-sidebar-desktop:clear-all-filters-button"]';

    static readonly CHECKED_FILTERS = '[data-test-id="filter-sidebar-desktop:container"] input[type="checkbox"]:checked';
}
