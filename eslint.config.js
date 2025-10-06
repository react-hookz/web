import {buildConfig} from '@ver0/eslint-config';

/** @typedef {import('eslint').Linter} Linter */
/** @type {Linter.Config[]} */
const config = [
	{
		ignores: ['.idea', 'node_modules', 'dist', 'coverage', 'CHANGELOG.md'],
	},
	...buildConfig({
		globals: 'browser',
		prettier: true,
		typescript: true,
		json: true,
		markdown: true,
		react: true,
		vitest: true,
	}),
	{
		files: ['**/*.test.ts'],
		rules: {
			'@typescript-eslint/no-empty-function': 'off',
			'vitest/expect-expect': [
				'error',
				{
					assertFunctionNames: ['expect', 'expectResultValue'],
				},
			],
		},
	},
	{
		files: ['**/*.md'],
		rules: {
			'markdown/no-missing-label-refs': 'off',
		},
	},
	{
		files: ['README.md'],
		rules: {
			'markdown/heading-increment': 'off',
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/no-deprecated': 'off',
		},
	},
];

export default config;
