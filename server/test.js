const { reset } = require("./logic");
const unitTestCases = require("../testcases/unit");

unitTestCases.forEach(testCase => {
  describe(testCase.name, () => {
    test(testCase.description, () => {
      expect(testCase.function.apply(null, testCase.dataIn)).toEqual(testCase.expectedOutput);
    });
  });
});
