import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_73');

export class InvalidSearchQueryResultsLocators {

    static readonly HOME_URL = '/';

    static readonly GLOBAL_HEADER = '[data-test-id="header-desktop:header"]';

    static readonly SEARCH_ROLE = 'search';

    static readonly SEARCHBOX_ROLE = 'searchbox';

    static readonly SEARCH_PRODUCT_CARDS = '[data-test-id="search-products-grid"] [data-test-id="product-card-link"]';

    static readonly NO_RESULTS_TEXT = data.noResultsText;
}
