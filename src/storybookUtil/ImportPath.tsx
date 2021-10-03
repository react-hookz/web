// eslint-disable-next-line import/no-extraneous-dependencies
import { DocsContext, Source } from '@storybook/addon-docs/blocks';
import React, { useContext } from 'react';

export const ImportPath = (): JSX.Element => {
  const context = useContext(DocsContext);
  const componentName = context.kind?.split('/')[1];

  const path = `
import { ${componentName} } from '@react-hookz/web'; // cjs
import { ${componentName} } from '@react-hookz/web/esm'; // esm
import { ${componentName} } from '@react-hookz/web/esnext' // esnext
  `;

  return <Source language="js" code={path} />;
};
