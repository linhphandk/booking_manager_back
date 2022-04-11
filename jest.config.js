/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  'preset': 'ts-jest',
  'testEnvironment': 'node',
  'globalSetup': '<rootDir>/src/test/globalSetup.ts',
  'globalTeardown': '<rootDir>/src/test/globalTeardown.ts',
  'setupFilesAfterEnv': [
    '<rootDir>/src/test/setupFile.ts',
  ],
};
