import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		dir: './src',
		setupFiles: [
			'./src/util/testing/setup/react-hooks.test.ts',
			'./src/util/testing/setup/vibrate.test.ts',
		],
		passWithNoTests: true,
		environmentMatchGlobs: [
			['**/*.dom.test.ts', 'jsdom'],
			['**/*.ssr.test.ts', 'node'],
		],
	},
});
