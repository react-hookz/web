module.exports = {
  stories: ['../src/**/__docs__/*.mdx'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-docs',
  ],
  reactOptions: {
    fastRefresh: true,
  },
};
