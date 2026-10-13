import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_72');

export class ProductDataMatchLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly PRODUCT_CARDS = '[data-test-id="category-products-grid"] [data-test-id="product-card-link"]';

    static readonly CARD_TITLE = '[data-test-id="product-card:product-card:title"]';

    static readonly CARD_PRICE = '[data-test-id="product-card-product-card:selling-price"]';

    static readonly PDP_URL_PATTERN = /\/p\//;

    static readonly PDP_TITLE = '[data-test-id="pdp-product-info-name"]';

    static readonly PDP_PRICE = '[data-test-id="pdp-price-desktop:selling-price"]';
}
