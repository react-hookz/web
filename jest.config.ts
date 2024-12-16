import { type Config } from 'jest';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __esModule = true;

const moduleNameMapper: Config['moduleNameMapper'] = {
	'^((?:\\.{1,2}|#[^\\/]*)/.*)\\.[tj]sx?$': '$1',
};

const transform: Config['transform'] = {
	'^.+\\.[tj]sx?$': ['@swc/jest', { module: { type: 'commonjs' } }],
};

export default {
	extensionsToTreatAsEsm: ['.ts'],
	testEnvironment: 'node',
	projects: [
		{
			displayName: 'dom',
			moduleNameMapper,
			transform,
			testEnvironment: 'jsdom',
			testMatch: ['<rootDir>/src/**/__tests__/dom.[jt]s?(x)'],
			setupFiles: ['./src/__tests__/setup.ts'],
		},

		{
			displayName: 'ssr',
			moduleNameMapper,
			transform,
			testEnvironment: 'node',
			testMatch: ['<rootDir>/src/**/__tests__/ssr.[jt]s?(x)'],
		},
	],
	collectCoverage: false,
	coverageDirectory: './coverage',
	collectCoverageFrom: ['./src/**/*.{ts,js,tsx,jsx}', '!**/__tests__/**', '!**/__docs__/**'],
} satisfies Config;
