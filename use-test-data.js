const fs = require('fs');
const path = require('path');

const testData = {
  common: { plpUrl: '/c/tshirts-26201', lowToHighLabel: 'Price (low \u2192 high)' },
  TC_55: {},
  TC_56: { size: 'M' },
  TC_57: { color: 'Black' },
  TC_58: { size: 'L', color: 'Blue' },
  TC_59: { size: 'S', color: 'Red' },
  TC_60: { size: 'XS', color: 'Turquoise', colorHex: '43C6C6', expectedMessage: 'Explore all our collections' },
  TC_61: { size: 'M', color: 'Black' },
  TC_62: { size: 'M', color: 'Black' },
  TC_63: { size: 'XL', color: 'Grey' },
  TC_64: { size: 'M' },
  TC_65: { defaultSort: 'Most relevant' },
  TC_66: { highToLowOption: 'Price (high \u2192 low)', discountOption: 'Highest discount' },
  TC_67: {},
  TC_68: {},
  TC_69: { color: 'White' },
  TC_70: { sortParam: 'sort=dsi_pim_migration_category_price_asc' },
  TC_71: {},
  TC_72: {},
  TC_73: { searchText: 'XYZ999INVALID!', noResultsText: 'Sorry, No Results Found...!' },
  TC_74: {}
};

const reader = [
  "import fs from 'fs';",
  "import path from 'path';",
  '',
  'type TestDataFile = Record<string, Record<string, string>>;',
  '',
  "const DATA_FILE = path.join(process.cwd(), 'test-data', 'shashiTestData.json');",
  "const testData: TestDataFile = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8').replace(/^\\uFEFF/, ''));",
  '',
  '/**',
  ' * Author Name: Fuzelur Rahaman',
  ' * Method Name: getTestData',
  " * Description: Returns the test data of one test case merged with the common data.",
  ' * Parameter: testId: string',
  ' * Return Type: Record<string, string>',
  ' */',
  'export function getTestData(testId: string): Record<string, string> {',
  '    const data = testData[testId];',
  '    if (!data) {',
  '        throw new Error(`No test data found for ${testId} in ${DATA_FILE}`);',
  '    }',
  '    return { ...testData.common, ...data };',
  '}',
  ''
].join('\n');

fs.mkdirSync('test-data', { recursive: true });
fs.writeFileSync(path.join('test-data', 'shashiTestData.json'), JSON.stringify(testData, null, 4) + '\n', 'utf8');
fs.writeFileSync(path.join('utils', 'testDataReader.ts'), reader, 'utf8');
console.log('CREATED  test-data/shashiTestData.json');
console.log('CREATED  utils/testDataReader.ts');

const locatorTc = {
  filterVisibility: 'TC_55', applySingleSizeFilter: 'TC_56', applySingleColorFilter: 'TC_57',
  applyMultipleFilters: 'TC_58', resultCountAccuracy: 'TC_59', noResultsFilterUi: 'TC_60',
  deselectSingleFilter: 'TC_61', clearAllFilters: 'TC_62', filterUrlParameter: 'TC_63',
  filterPersistence: 'TC_64', defaultSortUi: 'TC_65', sortOptionsVisibility: 'TC_66',
  applyLowToHighSort: 'TC_67', sortOrderAccuracy: 'TC_68', sortWithActiveFilter: 'TC_69',
  sortUrlParameter: 'TC_70', navigateToPdp: 'TC_71', productDataMatch: 'TC_72',
  invalidSearchQueryResults: 'TC_73', backNavigationState: 'TC_74'
};

const colorSel = (kind) => '`[data-test-id^="filter-' + kind + '-business_color_v2-"][data-test-id$="-${data.color}"]`';
const locatorValues = {
  PLP_URL: 'data.plpUrl',
  SIZE_OPTION: '`[data-test-id="filter-item-indian_size-${data.size}"]`',
  SIZE_CHECKBOX: '`[data-test-id="filter-checkbox-indian_size-${data.size}"]`',
  COLOR_OPTION: colorSel('item'),
  COLOR_CHECKBOX: colorSel('checkbox'),
  CONFLICTING_COLOR_OPTION: colorSel('item'),
  CONFLICTING_FILTER_QUERY: '`inStock=1&indian_size=${data.size}&business_color_v2=%23${data.colorHex}-${data.color}`',
  COLLECTIONS_TEXT: 'data.expectedMessage',
  LOW_TO_HIGH: 'data.lowToHighLabel',
  SORT_PARAM: 'data.sortParam',
  NO_RESULTS_TEXT: 'data.noResultsText'
};

let changed = 0;
function save(file, before, after) {
  if (after !== before) { fs.writeFileSync(file, after, 'utf8'); changed++; console.log('UPDATED  ' + file); }
  else console.log('no change ' + file);
}
function addHeader(s, nl, tc) {
  const lines = s.split(nl);
  let last = -1;
  lines.forEach((l, i) => { if (l.startsWith('import ')) last = i; });
  const header = ["import { getTestData } from '../utils/testDataReader';", ''];
  const dataLine = [`const data = getTestData('${tc}');`, ''];
  if (last === -1) { lines.unshift(...header, ...dataLine); }
  else { lines.splice(last + 1, 0, header[0]); lines.splice(last + 2, 0, '', dataLine[0]); }
  return lines.join(nl);
}

for (const f of fs.readdirSync('locators').filter(f => f.endsWith('Locators.ts'))) {
  const file = path.join('locators', f);
  const tc = locatorTc[f.replace(/Locators\.ts$/, '')];
  const before = fs.readFileSync(file, 'utf8');
  if (!tc || before.includes('getTestData')) { console.log('no change ' + file); continue; }
  const nl = before.includes('\r\n') ? '\r\n' : '\n';
  let s = before;
  let used = false;
  for (const [name, value] of Object.entries(locatorValues)) {
    const re = new RegExp(`(static readonly ${name} = )[^\\r\\n]*;`);
    if (re.test(s)) { s = s.replace(re, (m, p) => p + value + ';'); used = true; }
  }
  if (used) s = addHeader(s, nl, tc);
  save(file, before, s);
}

const specEdits = [
  ["toContain('Most relevant')", 'toContain(data.defaultSort)'],
  ["toContain('Price (low \\u2192 high)')", 'toContain(data.lowToHighLabel)'],
  ["toContainText('Price (low \\u2192 high)')", 'toContainText(data.lowToHighLabel)'],
  ["toContain('Price (high \\u2192 low)')", 'toContain(data.highToLowOption)'],
  ["toContain('Highest discount')", 'toContain(data.discountOption)'],
  ["toHaveText('Explore all our collections')", 'toHaveText(data.expectedMessage)'],
  ["const searchText = 'XYZ999INVALID!';", 'const searchText = data.searchText;'],
  ["expect(currentUrl).toContain('XL');", 'expect(currentUrl).toContain(data.size);'],
  ['expect(currentUrl).toMatch(/grey/i);', 'expect(currentUrl.toLowerCase()).toContain(data.color.toLowerCase());']
];

for (const f of fs.readdirSync('tests').filter(f => f.endsWith('.spec.ts'))) {
  const file = path.join('tests', f);
  const tcMatch = f.match(/^(TC_\d+)/);
  const before = fs.readFileSync(file, 'utf8');
  if (!tcMatch || before.includes('getTestData')) { console.log('no change ' + file); continue; }
  const nl = before.includes('\r\n') ? '\r\n' : '\n';
  let s = before;
  for (const [a, b] of specEdits) s = s.split(a).join(b);
  if (s !== before) s = addHeader(s, nl, tcMatch[1]);
  save(file, before, s);
}
console.log('Files changed: ' + changed);
