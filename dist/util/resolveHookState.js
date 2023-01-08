export function resolveHookState(nextState, prevState) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (typeof nextState === 'function')
        return nextState(prevState);
    return nextState;
}
