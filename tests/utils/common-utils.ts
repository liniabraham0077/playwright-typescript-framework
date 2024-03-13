import testData from '../data/data.json';

export const commonUtils = () => {
	const getTestData = () => testData;

	return {
		getTestData: () => getTestData(),
	};
};
