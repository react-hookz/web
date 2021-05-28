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
  ],
  coverageDirectory: './coverage',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
};
