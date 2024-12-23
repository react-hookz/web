import {vi} from 'vitest';

const vibrateMock = vi.fn<typeof navigator.vibrate>(() => true);

globalThis.navigator.vibrate = (vibrateMock) as typeof navigator.vibrate;
