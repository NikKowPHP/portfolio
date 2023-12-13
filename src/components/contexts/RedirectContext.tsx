import React, { createContext, useContext, useState, ReactNode } from "react";

interface RedirectContextProps {
  isRedirecting: boolean;
  setIsRedirecting: React.Dispatch<React.SetStateAction<boolean>>;
}
interface RedirectContextProviderProps {
  children: ReactNode;
}

const RedirectContext = createContext<RedirectContextProps | undefined>(
  undefined
);

export const useRedirectContext = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error(
      "useRedirectContext must be used within a RedirectContextProvider"
    );
  }
  return context;
};

export const RedirectContextProvider: React.FC<
  RedirectContextProviderProps
> = ({ children }) => {
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  return (
    <RedirectContext.Provider value={{ isRedirecting, setIsRedirecting }}>
      {children}
    </RedirectContext.Provider>
  );
};
