import { type Config } from 'jest';

const cfg: Config = {
	projects: [
		{
			displayName: 'dom',
			transform: {
				'\\.[jt]sx?$': '@swc/jest',
			},
			testEnvironment: 'jsdom',
			testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
			setupFiles: ['./src/__tests__/setup.ts'],
		},

		{
			displayName: 'ssr',
			transform: {
				'\\.[jt]sx?$': '@swc/jest',
			},
			testEnvironment: 'node',
			testMatch: ['<rootDir>/src/**/__tests__/ssr.[jt]s?(x)'],
		},

		// Needed for output bundle testing
		{
			displayName: 'dom-package',
			transformIgnorePatterns: [],
			transform: {
				'\\.[jt]sx?$': '@swc/jest',
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

export default cfg;
