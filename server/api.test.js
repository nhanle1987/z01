const fetch = require('node-fetch');
const { host, tests } = require('../testcases/api');

tests.forEach(testCase => {
  describe(testCase.name, () => {
    test(testCase.description, async () => {
      const options = {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      if (testCase.body) {
        options.method = 'POST';
        options.body = JSON.stringify(testCase.body);
      }
      const res = await fetch(host + testCase.url, options);
      const status = res.status;
      const data = await res.json();
      return expect({status, data}).toEqual(testCase.expectedResponseData);
    });
  });
});