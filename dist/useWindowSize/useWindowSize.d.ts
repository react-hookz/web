import { useRafState } from '../useRafState/useRafState';
export interface WindowSize {
    width: number;
    height: number;
}
/**
 * Tracks the inner dimensions of the browser window.
 *
 * @param stateHook State hook that will be used to hold the dimensions of the window.
 * @param measureOnMount If `true`, the size of the window will be measured during the effects
  stage, after the component has mounted. If `false`, the window size is measured synchronously during
  the component render. Set this to `true` during SSR.
 */
export declare function useWindowSize(stateHook?: typeof useRafState, measureOnMount?: boolean): WindowSize;
