import {vi} from 'vitest';

const vibrateMock = vi.fn<typeof navigator.vibrate>(() => true);

// vitest's Mock<T> collapses navigator.vibrate's overloads, so plain assignment does not typecheck.
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
globalThis.navigator.vibrate = vibrateMock as typeof navigator.vibrate;
