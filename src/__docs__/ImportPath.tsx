import { DocsContext, Source } from '@storybook/addon-docs';
import React, { FC, useContext } from 'react';

export const ImportPath: FC = () => {
  const context = useContext(DocsContext);
  const componentName = context.kind?.split('/')[1] || 'UnknownComponent';

  const path = `
import { ${componentName} } from '@react-hookz/web'; // cjs
import { ${componentName} } from '@react-hookz/web/esm'; // esm
  `;

  return <Source language="js" code={path} />;
};
