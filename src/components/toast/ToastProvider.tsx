import React, {ReactNode, createContext, useContext, useState} from 'react';
import {ToastConfig} from './Toast';

interface ToastContextInterface {
  toast: ToastConfig | null;
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextInterface>({
  toast: null,
  showToast: (_: ToastConfig) => {},
  hideToast: () => {},
});

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = (config: ToastConfig) => {
    setToast(config);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{toast, showToast, hideToast}}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
