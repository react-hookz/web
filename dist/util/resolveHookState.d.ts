export type InitialState<State> = State | (() => State);
export type NextState<State, PrevState = State> = State | ((prevState: PrevState) => State);
export declare function resolveHookState<State>(nextState: InitialState<State>): State;
export declare function resolveHookState<State, PrevState = State>(nextState: NextState<State, PrevState>, prevState: PrevState): State;
