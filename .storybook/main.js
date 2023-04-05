module.exports = {
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
  managerWebpack: (config, options) => {
    // ToDo: maybe enable cache mack when storybook is fixed
    options.cache.set = () => Promise.resolve(); // eslint-disable-line @typescript-eslint/no-unsafe-member-access

    return config; // eslint-disable-line @typescript-eslint/no-unsafe-return
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
};
