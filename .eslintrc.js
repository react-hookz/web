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

  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.mdx', '.md'],
  },

  overrides: [
    {
      files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
      extends: ['@react-hookz/eslint-config/react'],
      rules: {
        'react/button-has-type': 'off',
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
      files: ['*.md', '*.mdx'],
      extends: ['@react-hookz/eslint-config/mdx'],
    },
  ],
};
