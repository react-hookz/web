import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		dir: './src',
		setupFiles: ['./src/util/testing/setup/react-hooks.test.ts', './src/util/testing/setup/vibrate.test.ts'],
		passWithNoTests: true,
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
