import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_71');

export class NavigateToPdpLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly CARD_TITLE = '[data-test-id="product-card:product-card:title"]';

    static readonly PDP_URL_PATTERN = /\/p\//;

    static readonly PDP_TITLE = '[data-test-id="pdp-product-info-name"]';
}
