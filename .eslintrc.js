const commonJSRules = {
	'unicorn/filename-case': 'off',
	'unicorn/prevent-abbreviations': 'off',
	'unicorn/no-null': 'off',
	'unicorn/no-array-for-each': 'off',
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
	root: true,

	parserOptions: {
		extraFileExtensions: ['.md'],
	},

	settings: {
		'import/ignore': ['react-apexcharts'],
	},

	overrides: [
		{
			files: ['*.js', '*.cjs', '*.jsx', '*.cjsx'],
			extends: ['@react-hookz/eslint-config/base.cjs', '@react-hookz/eslint-config/react.cjs'],
			rules: {
				...commonJSRules,
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			parserOptions: {
				project: './tsconfig.eslint.json',
			},
			extends: [
				'@react-hookz/eslint-config/typescript.cjs',
				'@react-hookz/eslint-config/react.cjs',
			],
			rules: {
				...commonJSRules,
			},
		},
		{
			files: ['*.md'],
			extends: ['@react-hookz/eslint-config/md.cjs'],
		},
		{
			files: ['*.mdx'],
			extends: ['@react-hookz/eslint-config/mdx.cjs'],
		},
	],
};
