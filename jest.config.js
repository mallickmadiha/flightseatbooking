module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // moduleNameMapper: {
  //   "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/path/to/your/mocks/file.js",
  // },
  // transform: {
  //   "^.+\\.js$": "babel-jest"
  // },
};
