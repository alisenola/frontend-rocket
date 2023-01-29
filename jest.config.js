// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    // "node_modules/(?!axios/.*)"
  ],
};

module.exports = config;
