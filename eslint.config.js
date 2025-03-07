import baseConfig from '@react-hookz/eslint-config/base.js';
import mdConfig from '@react-hookz/eslint-config/md.js';
import reactConfig from '@react-hookz/eslint-config/react.js';
import typescriptConfig from '@react-hookz/eslint-config/typescript.js';
import vitestConfig from '@react-hookz/eslint-config/vitest.js';

/** @typedef {import('eslint').Linter} Linter */
/** @type {Linter.Config[]} */
const config = [
	{
		ignores: ['.idea', 'node_modules', 'dist', 'coverage', 'CHANGELOG.md'],
	},
	...baseConfig,
	...reactConfig,
	...mdConfig,
	...typescriptConfig,
	...vitestConfig,
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/no-deprecated': 'off',
		},
	},
];

export default config;
