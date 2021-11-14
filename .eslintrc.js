const PRINT_WIDTH = 100;

const prettierConfig = {
  PRINT_WIDTH,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  endOfLine: 'lf',
};

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
    'prettier/prettier': ['error', prettierConfig],
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'prettier',
      ],
      plugins: ['import'],
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        'no-underscore-dangle': 'off',
        'no-plusplus': 'off',
        'no-console': 'off',
        'no-param-reassign': 'off',

        'import/prefer-default-export': 'off',
        'import/no-cycle': 'off',
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

        'react-hooks/exhaustive-deps': [
          'warn',
          {
            additionalHooks: '(useSyncedRef)',
          },
        ],

        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
      },
    },
    {
      files: ['src/**/__docs__/*.tsx', '.storybook/*.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-default-export': 'off',
        'react/button-has-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/prop-types': 'off',

        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
      },
    },
    {
      files: ['src/**/__tests__/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.md'],
      extends: ['plugin:mdx/recommended', 'prettier'],
      rules: {
        'prettier/prettier': [
          2,
          {
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
      rules: {
        'prettier/prettier': ['error', prettierConfig],
      },
    },
  ],
};
