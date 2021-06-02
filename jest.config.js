module.exports = {
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
    },
    {
      displayName: 'ssr',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/__tests__/ssr.[jt]s?(x)'],
    },

    // needed for output bundle testing
    {
      displayName: 'dom-cjs',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
      moduleNameMapper: {
        '^../..$': '<rootDir>/cjs',
      },
    },
    {
      displayName: 'dom-package',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
      moduleNameMapper: {
        '^../..$': '<rootDir>',
      },
    },
  ],
  coverageDirectory: './coverage',
  collectCoverage: false,
};
