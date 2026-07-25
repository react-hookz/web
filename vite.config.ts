import type {OxlintConfig} from 'oxlint';
import {defineConfig} from 'vite-plus';
import javascript from '@ver0/oxlint-config/javascript.js';
import typescript from '@ver0/oxlint-config/typescript.js';
import react from '@ver0/oxlint-config/react.js';
import browser from '@ver0/oxlint-config/browser.js';
import vitest from '@ver0/oxlint-config/vitest.js';

// Composed via extends after the presets so these overrides apply last.
const repoOverrides: OxlintConfig = {
	rules: {
		// Hook parameters are inherently mutable platform types
		// (DOM elements, React refs, dependency lists).
		'typescript/prefer-readonly-parameter-types': 'off',
		// Single-use type parameters in exported hooks are public API --
		// removing one changes the generic arity and breaks explicit callers.
		'typescript/no-unnecessary-type-parameters': 'off',
		// The base rule lacks typescript/require-await's exemption for async
		// functions that return a promise, which promise-function-async and
		// typescript/return-await force into exactly that shape. The
		// type-aware variant stays on.
		'require-await': 'off',
	},
	overrides: [
		{
			files: ['**/*.test.ts'],
			plugins: ['vitest'],
			rules: {
				// Tests are uniformly async for renderHook symmetry.
				'typescript/require-await': 'off',
				'typescript/strict-void-return': 'off',
				'typescript/unbound-method': 'off',
				'vitest/no-conditional-in-test': 'off',
				'vitest/require-mock-type-parameters': 'off',
				'vitest/expect-expect': [
					'error',
					{
						assertFunctionNames: ['expect', 'expectResultValue'],
					},
				],
			},
		},
	],
};

export default defineConfig({
	test: {
		dir: './src',
		setupFiles: ['./src/util/testing/setup/react-hooks.test.ts', './src/util/testing/setup/vibrate.test.ts'],
		passWithNoTests: true,
		// Node >= 25 ships Web Storage globals; without --localstorage-file
		// they are non-functional stubs that shadow jsdom's storage in workers.
		execArgv: ['--no-experimental-webstorage'],
		projects: [
			{
				extends: true,
				test: {
					name: 'DOM',
					include: ['**/*.dom.test.ts'],
					environment: 'jsdom',
				},
			},
			{
				extends: true,
				test: {
					name: 'SSR',
					include: ['**/*.ssr.test.ts'],
					environment: 'node',
				},
			},
		],
	},
	lint: {
		options: {typeCheck: true},
		extends: [javascript, typescript, react, browser, vitest, repoOverrides],
		ignorePatterns: ['.claude', '.idea', 'dist', 'coverage', 'CHANGELOG.md'],
	},
	fmt: {
		useTabs: true,
		tabWidth: 2,
		printWidth: 120,
		endOfLine: 'lf',
		trailingComma: 'all',
		semi: true,
		singleQuote: true,
		bracketSameLine: true,
		bracketSpacing: false,
		jsxBracketSameLine: false,
		jsxSingleQuote: true,
		arrowParens: 'always',
		proseWrap: 'always',
		ignorePatterns: ['.claude', '.idea', 'dist', 'coverage', 'CHANGELOG.md'],
	},
});
