import { useReducer, useMemo, useRef } from 'react';
import { useCustomCompareMemo } from '../../index.js';

// Data
const keys = ['firstname', 'name'];

// Utils
const getRandom = <ArrayParameter extends unknown[]>(array: ArrayParameter) =>
	array[Math.floor(Math.random() * array.length)] as ArrayParameter[number];
const displayAsJSON = (object: Record<string, string>) => JSON.stringify(object, undefined, 2);
const reverse = (object: Record<string, string>) =>
	Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));

// Hooks
const useForce = () => useReducer((state) => !state, false)[1];

export function Example() {
	const force = useForce();

	const reversedPerson = useRef<Record<string, string> | null>(null);

	const memoCalls = useRef(0);
	const retainCalls = useRef(0);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const person = { key: getRandom(keys), value: 'John' };

	useCustomCompareMemo(
		() => {
			if (person) {
				retainCalls.current++;

				reversedPerson.current = reverse(person);
			}
		},
		[person] as const,
		(savedDeps, deps) => {
			const savedDependency = savedDeps[0];
			const dependency = deps[0];

			return savedDependency.key !== dependency.key;
		}
	);

	useMemo(() => {
		if (person) {
			memoCalls.current++;
		}
	}, [person]);

	return (
		<div>
			{person && displayAsJSON(person)}
			<p>memo calls: {memoCalls.current}</p>
			<p>custom memo calls: {retainCalls.current}</p>
			<button type="button" onClick={force}>
				force
			</button>
		</div>
	);
}
