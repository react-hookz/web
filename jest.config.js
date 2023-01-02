module.exports = {
  projects: [
    {
      displayName: 'dom',
      transform: {
        '\\.[jt]sx?$': ['@swc/jest'],
      },
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
      setupFiles: ['./src/__tests__/setup.ts'],
    },
    {
      displayName: 'ssr',
      transform: {
        '\\.[jt]sx?$': ['@swc/jest'],
      },
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/__tests__/ssr.[jt]s?(x)'],
    },

    // needed for output bundle testing
    {
      displayName: 'dom-package',
      transform: {
        '\\.[jt]sx?$': ['@swc/jest'],
      },
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
      setupFiles: ['./src/__tests__/setup.ts'],
      moduleNameMapper: {
        '^../..$': '<rootDir>',
      },
    },
  ],
  collectCoverage: false,
  coverageDirectory: './coverage',
  collectCoverageFrom: ['./src/**/*.{ts,js,tsx,jsx}', '!**/__tests__/**', '!**/__docs__/**'],
};
