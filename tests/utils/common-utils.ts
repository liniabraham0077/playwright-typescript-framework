import testData from '../data/data.json';

export const commonUtils = () => {
  const getTestData = async () => {
   return testData;
  };

  return {
    getTestData: async () => getTestData(),
  };
};
