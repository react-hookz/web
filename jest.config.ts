import { type Config } from 'jest';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __esModule = true;

export default {
	extensionsToTreatAsEsm: ['.ts'],
	projects: [
		{
			displayName: 'dom',
			moduleNameMapper: {
				'^((?:\\.{1,2}|#[^\\/]*)/.*)\\.js$': '$1',
			},
			transform: {
				'^.+\\.[tj]sx?$': '@swc/jest',
			},
			testEnvironment: 'jsdom',
			testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
			setupFiles: ['./src/__tests__/setup.ts'],
		},

		{
			displayName: 'ssr',
			moduleNameMapper: {
				'^((?:\\.{1,2}|#[^\\/]*)/.*)\\.js$': '$1',
			},
			transform: {
				'^.+\\.[tj]sx?$': '@swc/jest',
			},
			testEnvironment: 'node',
			testMatch: ['<rootDir>/src/**/__tests__/ssr.[jt]s?(x)'],
		},

		// Needed for output bundle testing
		{
			displayName: 'dom-package',
			transformIgnorePatterns: [],
			moduleNameMapper: {
				'^((?:\\.{1,2}|#[^\\/]*)/.*)\\.js$': '$1',
				'^#root/index.js$': '<rootDir>/index.js',
			},
			transform: {
				'^.+\\.[tj]sx?$': '@swc/jest',
			},
			testEnvironment: 'jsdom',
			testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
			setupFiles: ['./src/__tests__/setup.ts'],
		},
	],
	collectCoverage: false,
	coverageDirectory: './coverage',
	collectCoverageFrom: ['./src/**/*.{ts,js,tsx,jsx}', '!**/__tests__/**', '!**/__docs__/**'],
} satisfies Config;
