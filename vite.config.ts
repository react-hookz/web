import type {OxlintConfig} from 'vite-plus/lint';
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
	},
	overrides: [
		{
			files: [
				'src/useCustomCompareEffect/index.ts',
				'src/useFirstMountState/index.ts',
				'src/useList/index.ts',
				'src/useMap/index.ts',
				'src/usePrevious/index.ts',
				'src/useRenderCount/index.ts',
				'src/useSet/index.ts',
				'src/useSyncedRef/index.ts',
			],
			plugins: ['react'],
			rules: {
				// These hooks expose render-time ref state as part of their public API.
				// Moving those reads or writes into effects changes their behavior.
				'react/refs': 'off',
			},
		},
		{
			files: ['src/useCustomCompareEffect/index.ts', 'src/useWindowSize/index.ts'],
			plugins: ['react'],
			rules: {
				// These public APIs accept a hook and invoke it unconditionally.
				// Keep react/rules-of-hooks; opt out of the new compiler restriction.
				'react/hooks': 'off',
			},
		},
		{
			files: ['src/useList/index.ts'],
			plugins: ['react'],
			rules: {
				// The memoized actions call other methods on the same object.
				// That self-reference cannot be an input to its own initialization.
				'react/memo-dependencies': 'off',
			},
		},
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
