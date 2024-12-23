type StateInitializerFN<State> = () => State;
type StateUpdaterFN<State, PreviousState = State> = (previousState: PreviousState) => State;

export type InitialState<State> = State | StateInitializerFN<State>;
export type NextState<State, PreviousState = State> = State | StateUpdaterFN<State, PreviousState>;

function initState<State>(initialState: InitialState<State>): State {
	if (typeof initialState === 'function') {
		initialState = (initialState as StateInitializerFN<State>)();
	}

	return initialState;
}

function updateState<State, PreviousState = State>(
	nextState: NextState<State, PreviousState>,
	previousState: PreviousState,
): State {
	if (typeof nextState === 'function') {
		return (nextState as StateUpdaterFN<State, PreviousState>)(previousState);
	}

	return nextState;
}

export function resolveHookState<State, PreviousState = State>(
	...args:
		| Parameters<typeof initState<State>>
		| Parameters<typeof updateState<State, PreviousState>>
) {
	if (args.length === 1) {
		return initState(args[0]);
	}

	return updateState(args[0], args[1]);
}
