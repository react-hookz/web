import React from 'react';

const context = React.createContext<boolean>(false);

export interface SsrStateProviderProps extends React.PropsWithChildren {
  disabled?: boolean;
}

export const SsrStateProvider: React.FC<SsrStateProviderProps> = ({ disabled, children }) => {
  return <context.Provider value={!disabled}>{children}</context.Provider>;
};

export function useSsrState(): boolean {
  return React.useContext(context);
}
