import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import Logo from './logo.png';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: '@react-hookz/web',
    brandImage: Logo,
  },
});
