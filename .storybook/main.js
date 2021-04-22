module.exports = {
  stories: ['../stories/**/*.story.mdx', '../stories/**/*.story.@(js|jsx|ts|tsx)'],
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
