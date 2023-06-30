import { DocsContext, Source } from '@storybook/addon-docs';
import React, { type FC, useContext } from 'react';

export type ImportPathProps = {
  isRoot?: boolean;
  isDirect?: boolean;
};

export function ImportPath({ isRoot = true, isDirect = true }: ImportPathProps) {
  const context = useContext(DocsContext);

  const componentName = context.title?.split('/')[1] || 'UnknownComponent';

  const imports: string[] = [];

  if (isRoot) {
    imports.push(`// root import\nimport { ${componentName} } from '@react-hookz/web';`);
  }

  if (isDirect) {
    imports.push(
      `// direct import\nimport { ${componentName} } from '@react-hookz/web/esm/${componentName}';`
    );
  }

  return <Source language="js" code={imports.join('\n')} />;
}
