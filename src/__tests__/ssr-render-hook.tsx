import type { ReactNode } from 'react';
import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { act } from 'react-dom/test-utils';

export const renderHookServer = <Hook extends () => any>(
	useHook: Hook,
	{
		wrapper: Wrapper,
	}: {
		wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
	} = {}
): { result: { current: ReturnType<Hook> }; hydrate: () => void } => {
	// Store hook return value
	const results: Array<ReturnType<Hook>> = [];
	const result = {
		get current() {
			return results.slice(-1)[0];
		},
	};
	const setValue = (value: ReturnType<Hook>) => {
		results.push(value);
	};

	function Component({ useHook }: { useHook: Hook }) {
		setValue(useHook());
		return null;
	}

	const component = Wrapper ? (
		<Wrapper>
			<Component useHook={useHook} />
		</Wrapper>
	) : (
		<Component useHook={useHook} />
	);

	// Render hook on server
	const serverOutput = renderToString(component);

	// Render hook on client
	const hydrate = () => {
		const root = document.createElement('div');
		root.innerHTML = serverOutput;
		act(() => {
			hydrateRoot(root, component);
		});
	};

	return {
		result,
		hydrate,
	};
};
