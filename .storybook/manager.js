import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: '@react-hookz/web',
    brandImage: './logo.png',
    fontBase: '"Manrope", sans-serif',
  },
});
