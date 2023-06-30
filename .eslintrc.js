module.exports = {
  root: true,

  parserOptions: {
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.md', '.mdx'],
  },

  overrides: [
    {
      files: ['*.js'],
      extends: ['@react-hookz/eslint-config/base.cjs'],
    },
    {
      files: ['*.jsx'],
      extends: ['@react-hookz/eslint-config/base.cjs', '@react-hookz/eslint-config/react.cjs'],
    },
    {
      files: ['*.ts'],
      extends: ['@react-hookz/eslint-config/typescript.cjs'],
    },
    {
      files: ['*.tsx'],
      extends: [
        '@react-hookz/eslint-config/typescript.cjs',
        '@react-hookz/eslint-config/react.cjs',
      ],
    },
    {
      files: ['**/__tests__/**/*.js'],
      extends: ['@react-hookz/eslint-config/base.cjs', '@react-hookz/eslint-config/jest.cjs'],
    },
    {
      files: ['**/__tests__/**/*.jsx'],
      extends: [
        '@react-hookz/eslint-config/base.cjs',
        '@react-hookz/eslint-config/react.cjs',
        '@react-hookz/eslint-config/jest.cjs',
      ],
    },
    {
      files: ['**/__tests__/**/*.ts'],
      extends: [
        '@react-hookz/eslint-config/typescript-unsafe.cjs',
        '@react-hookz/eslint-config/jest.cjs',
      ],
    },
    {
      files: ['**/__tests__/**/*.tsx'],
      extends: [
        '@react-hookz/eslint-config/typescript-unsafe.cjs',
        '@react-hookz/eslint-config/react.cjs',
        '@react-hookz/eslint-config/jest.cjs',
      ],
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
