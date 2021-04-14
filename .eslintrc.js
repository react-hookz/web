const PRINT_WIDTH = 100;

module.exports = {
  root: true,

  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  ignorePatterns: ['dist'],

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

  plugins: ['prettier', 'import'],

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

    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',

    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
  },
};
