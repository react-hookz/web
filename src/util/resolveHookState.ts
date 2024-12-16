export type InitialState<State> = State | (() => State);
export type NextState<State, PreviousState = State> =
	| State
	| ((previousState: PreviousState) => State);

export function resolveHookState<State>(nextState: InitialState<State>): State;
export function resolveHookState<State, PreviousState = State>(
	nextState: NextState<State, PreviousState>,
	previousState: PreviousState
): State;
export function resolveHookState<State, PreviousState = State>(
	nextState: InitialState<State> | NextState<State, PreviousState>,
	previousState?: PreviousState
): State {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	if (typeof nextState === 'function') return (nextState as CallableFunction)(previousState);

	return nextState;
}
