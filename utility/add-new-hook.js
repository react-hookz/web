// eslint-disable-next-line unicorn/prefer-module
const fs = require('node:fs/promises');
// eslint-disable-next-line unicorn/prefer-module
const path = require('node:path');

// eslint-disable-next-line no-void,unicorn/prefer-top-level-await
void (async () => {
	const scriptPath = process.argv[1].trim();
	const hookName = process.argv[2]?.trim();

	if (!hookName || hookName.length === 0) {
		throw new TypeError('hook name not defined');
	}

	const srcDir = path.resolve(scriptPath, '../../src');
	const hookDir = path.join(srcDir, hookName);

	if (
		await fs
			.lstat(hookDir)
			.then(() => true)
			.catch(() => false)
	) {
		throw new TypeError(`directory for hook ${hookName} already exists`);
	}

	await fs.appendFile(path.join(srcDir, 'index.ts'), `\nexport * from './${hookName}';\n`);

	await fs.mkdir(hookDir);
	await fs.writeFile(
		path.resolve(hookDir, `index.ts`),
		`export function ${hookName}(): void {\n}\n`
	);

	await fs.mkdir(path.resolve(hookDir, `__docs__`));
	await fs.writeFile(
		path.resolve(hookDir, `__docs__/example.stories.tsx`),
		`import * as React from 'react';
import { ${hookName} } from '../..';

export const Example: React.FC = () => {
  return null;
}`
	);
	await fs.writeFile(
		path.resolve(hookDir, `__docs__/story.mdx`),
		`import { Canvas, Meta, Story } from '@storybook/addon-docs';
import { Example } from './example.stories';
import { ImportPath } from '../../__docs__/ImportPath';

<Meta title="New Hook/${hookName}" component={Example} />

# ${hookName}

#### Example

<Canvas>
  <Story story={Example} inline />
</Canvas>

## Reference

\`\`\`ts

\`\`\`

#### Importing

<ImportPath />

#### Arguments

#### Return
`
	);

	await fs.mkdir(path.resolve(hookDir, `__tests__`));
	await fs.writeFile(
		path.resolve(hookDir, `__tests__/dom.ts`),
		`import { renderHook } from '@testing-library/react-hooks/dom';
import { ${hookName} } from '../..';

describe('${hookName}', () => {
  it('should be defined', () => {
    expect(${hookName}).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => ${hookName}());
    expect(result.error).toBeUndefined();
  });
});
`
	);
	await fs.writeFile(
		path.resolve(hookDir, `__tests__/ssr.ts`),
		`import { renderHook } from '@testing-library/react-hooks/server';
import { ${hookName} } from '../..';

describe('${hookName}', () => {
  it('should be defined', () => {
    expect(${hookName}).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => ${hookName}());
    expect(result.error).toBeUndefined();
  });
});
`
	);
})();
