import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		dir: './src',
		environmentMatchGlobs: [
			['**/*.dom.test.ts', 'jsdom'],
			['**/*.ssr.test.ts', 'node'],
		],
	},
});
