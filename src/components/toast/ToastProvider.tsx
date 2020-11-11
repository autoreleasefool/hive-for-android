import React, {ReactNode, createContext, useContext, useState, useCallback} from 'react';
import {ToastConfig} from './Toast';

interface ToastContextInterface {
  toast: ToastConfig | undefined;
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextInterface>({
  toast: undefined,
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [toast, setToast] = useState<ToastConfig>();

  const showToast = useCallback(
    (config: ToastConfig) => {
      setToast(config);
    },
    [setToast],
  );

  const hideToast = useCallback(() => {
    setToast(undefined);
  }, [setToast]);

  return (
    <ToastContext.Provider value={{toast, showToast, hideToast}}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
