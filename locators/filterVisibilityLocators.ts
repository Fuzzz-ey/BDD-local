import { getTestData } from '../utils/testDataReader';

const data = getTestData('TC_55');

export class FilterVisibilityLocators {

    static readonly PLP_URL = data.plpUrl;

    static readonly FILTER_SIDEBAR = '[data-test-id="filter-sidebar-desktop:container"]';

    static readonly SIZE_FILTER = '[data-test-id="filter-sidebar-desktop:container"] [data-test-id="title:Size"]';

    static readonly COLOR_FILTER = '[data-test-id="filter-sidebar-desktop:container"] [data-test-id="title:Color"]';
}
