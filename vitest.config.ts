import {defineConfig} from 'vitest/config';

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
});
