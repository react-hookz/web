import type { PropsWithChildren } from 'react';
import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { act } from 'react-dom/test-utils';

type HookWrapper = (props: PropsWithChildren) => JSX.Element;

type RenderHookOptions = {
	wrapper?: HookWrapper;
};

type HookHarnessProps<Hook extends () => any> = {
	readonly useHook: Hook;
	readonly setResult: (result: ReturnType<Hook>) => void;
};

function HookHarness<Hook extends () => any>({ useHook, setResult }: HookHarnessProps<Hook>) {
	setResult(useHook());

	return null;
}

export const renderHookServer = <Hook extends () => any>(
	useHook: Hook,
	{ wrapper: Wrapper }: RenderHookOptions = {}
): { result: { current: ReturnType<Hook> }; hydrate: () => void } => {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	const result = { current: undefined } as { current: ReturnType<Hook> };

	const setValue = (value: ReturnType<Hook>) => {
		result.current = value;
	};

	let harness = <HookHarness useHook={useHook} setResult={setValue} />;

	if (Wrapper) {
		harness = <Wrapper>{harness}</Wrapper>;
	}

	// Render hook on server
	const serverOutput = renderToString(harness);

	// Render hook on client
	const hydrate = () => {
		const root = document.createElement('div');
		root.innerHTML = serverOutput;
		act(() => {
			hydrateRoot(root, harness);
		});
	};

	return {
		result,
		hydrate,
	};
};
