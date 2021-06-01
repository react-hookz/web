module.exports = {
  stories: ['../src/**/__docs__/*.mdx', '../src/**/__docs__/*.tsx'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
  ],
  reactOptions: {
    fastRefresh: true,
  },
};
