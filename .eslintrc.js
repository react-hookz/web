const PRINT_WIDTH = 100;

module.exports = {
  root: true,

  ignorePatterns: [
    'node_modules',
    'coverage',
    'storybook-build',
    'cjs',
    'esm',
    'esnext',
    '.github/workflows',
    '.husky',
    'CHANGELOG.md',
  ],

  plugins: ['prettier'],

  rules: {
    'max-len': [
      'error',
      {
        code: PRINT_WIDTH,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        PRINT_WIDTH,
        singleQuote: true,
        jsxBracketSameLine: true,
        trailingComma: 'es5',
        endOfLine: 'lf',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
      extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
      ],
      plugins: ['import'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'no-underscore-dangle': 'off',
        'no-plusplus': 'off',
        'no-console': 'off',
        'no-param-reassign': 'off',

        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',

        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['interface', 'typeAlias'],
            format: ['PascalCase'],
            prefix: ['I'],
          },
          {
            selector: 'function',
            format: ['camelCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
        ],
      },
    },
    {
      files: ['stories/**/*', '.storybook/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-default-export': 'off',
        'react/button-has-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: ['*.md'],
      extends: ['plugin:mdx/recommended', 'prettier'],
      rules: {
        'prettier/prettier': [
          2,
          {
            // unnecessary if you're not using `eslint-plugin-prettier`, but required if you are
            parser: 'markdown',
          },
        ],
      },
    },
    {
      files: ['*.mdx'],

      extends: ['plugin:mdx/recommended', 'prettier'],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          modules: true,
          jsx: true,
        },
      },
    },
  ],
};
