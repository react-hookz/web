module.exports = {
  root: true,

  ignorePatterns: [
    'node_modules',
    'coverage',
    'storybook-build',
    'dist',
    '.github/workflows',
    '.husky',
    'CHANGELOG.md',
  ],

  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.md'],
  },

  overrides: [
    {
      files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
      extends: ['@react-hookz/eslint-config/react'],
      rules: {
        'react/button-has-type': 'off',
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-top-level-await': 'off',
      },
    },
    {
      files: [
        '**/__tests__/**/*.js',
        '**/__tests__/**/*.ts',
        '**/__tests__/**/*.jsx',
        '**/__tests__/**/*.tsx',
      ],
      extends: ['@react-hookz/eslint-config/react', '@react-hookz/eslint-config/jest'],
    },
    {
      files: ['**/__docs__/**', '**/__tests__/**'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-this-assignment': 'off',
      },
    },
    {
      files: ['*.md'],
      extends: ['@react-hookz/eslint-config/mdx'],
    },
  ],
};
