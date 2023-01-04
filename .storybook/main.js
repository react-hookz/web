module.exports = {
  core: {
    builder: 'webpack5',
  },
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
  reactOptions: {
    fastRefresh: true,
  },
  staticDirs: ['./public'],
  managerWebpack: (config, options) => {
    //ToDo: maybe enable cache mack when storybook is fixed
    options.cache.set = () => Promise.resolve();
    return config;
  },
};
