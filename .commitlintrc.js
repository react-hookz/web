const config = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'footer-max-line-length': [1, 'always', 72],
	},
};

export default config;
