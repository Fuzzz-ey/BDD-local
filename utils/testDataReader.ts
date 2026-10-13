import fs from 'fs';
import path from 'path';

type TestDataFile = Record<string, Record<string, string>>;

const DATA_FILE = path.join(process.cwd(), 'test-data', 'shashiTestData.json');
const testData: TestDataFile = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8').replace(/^\uFEFF/, ''));

/**
 * Author Name: Fuzelur Rahaman
 * Method Name: getTestData
 * Description: Returns the test data of one test case merged with the common data.
 * Parameter: testId: string
 * Return Type: Record<string, string>
 */
export function getTestData(testId: string): Record<string, string> {
    const data = testData[testId];
    if (!data) {
        throw new Error(`No test data found for ${testId} in ${DATA_FILE}`);
    }
    return { ...testData.common, ...data };
}
