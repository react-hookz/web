import { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/__docs__/*.mdx', '../src/**/__docs__/*.tsx'],
  addons: [
    '@storybook/addon-postcss',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
  ],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
};

export default config;
