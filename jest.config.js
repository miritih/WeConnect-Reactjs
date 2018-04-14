module.exports = {
  "bail": true,
  "verbose": true,
  "testRegex": ".*(?<!snapshot)\\.(test|spec)\\.js$",
  "collectCoverage": true,
  "collectCoverageFrom": [, "!src/index.js"],
  "coverageDirectory": "<rootDir>/src",
  "coverageThreshold": {
    "global": {
      "branches": 85,
      "function": 95,
      "lines": 95,
      "statements": 95
    }
  }
};
