module.exports = {
  projects: [
    {
      displayName: 'dom',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
      setupFiles: ['./src/__tests__/setup.ts'],
    },
    {
      displayName: 'ssr',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/__tests__/ssr.[jt]s?(x)'],
    },

    // needed for output bundle testing
    {
      displayName: 'dom-package',
      preset: 'ts-jest',
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
