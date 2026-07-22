import {fixupPluginRules} from '@eslint/compat';
import {defineConfig} from 'eslint/config';
import javascript from '@ver0/eslint-config/javascript.js';
import typescript from '@ver0/eslint-config/typescript.js';
import react from '@ver0/eslint-config/react.js';
import browser from '@ver0/eslint-config/browser.js';
import json from '@ver0/eslint-config/json.js';
import markdown from '@ver0/eslint-config/markdown.js';
import vitest from '@ver0/eslint-config/vitest.js';
import prettier from '@ver0/eslint-config/prettier.js';

const config = defineConfig(
	{
		ignores: ['.claude', '.idea', 'node_modules', 'dist', 'coverage', 'CHANGELOG.md'],
	},
	javascript,
	typescript,
	react,
	browser,
	...json,
	markdown,
	vitest,
	prettier,
	{
		// eslint 10 removed context.getFilename(), but eslint-plugin-react's
		// version auto-detection ('detect', set by xo-react) still calls it and
		// crashes; an explicit version skips the detection path.
		settings: {
			react: {
				version: '19.2',
			},
		},
	},
	{
		files: ['**/*.ts'],
		rules: {
			// Render-time ref reads/writes are the core mechanism of many hooks
			// in this library (useSyncedRef, useFirstMountState, usePrevious...).
			'react-hooks/refs': 'off',
		},
	},
	{
		files: ['**/*.test.ts'],
		rules: {
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/strict-void-return': 'off',
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
);

// fixupPluginRules restores context APIs removed in eslint 10 --
// eslint-plugin-react 7.x (via xo-react) still relies on them.
export default config.map((cfg) =>
	cfg.plugins?.react ? {...cfg, plugins: {...cfg.plugins, react: fixupPluginRules(cfg.plugins.react)}} : cfg,
);
