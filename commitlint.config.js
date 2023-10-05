// eslint-disable-next-line unicorn/prefer-module
module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'footer-max-line-length': [1, 'always', 100],
	},
};
