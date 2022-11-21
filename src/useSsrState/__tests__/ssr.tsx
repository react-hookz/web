import { renderHook } from '@testing-library/react-hooks/server';
import React from 'react';
import { SsrStateProvider, useSsrState } from '../..';

describe('useSsrState', () => {
  it('should be defined', () => {
    expect(useSsrState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useSsrState());
    expect(result.error).toBeUndefined();
    expect(result.current).toBe(false);
  });

  it('should return false if rendered within disabled state provider', () => {
    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <SsrStateProvider disabled>{children}</SsrStateProvider>
    );
    const { result } = renderHook(() => useSsrState(), { wrapper });

    expect(result.error).toBeUndefined();
    expect(result.current).toBe(false);
  });

  it('should return true if rendered within enabled state provider', () => {
    const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <SsrStateProvider>{children}</SsrStateProvider>
    );
    const { result } = renderHook(() => useSsrState(), { wrapper });

    expect(result.error).toBeUndefined();
    expect(result.current).toBe(true);
  });
});
