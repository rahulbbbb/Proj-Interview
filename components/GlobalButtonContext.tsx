import { createContext, JSX, ReactElement, useContext, useMemo } from "react";

import { useState, useCallback } from "react";
import { debounce } from "./Utils";

export const GlobalButtonContext = createContext({
  buttonName: "",
  onButtonClick: () => {
    return;
  },
  buttonTitle: "",
});

export const GlobalButtonContextSetter = createContext({
  updateGlobalButtonState: (GlobalButtonActionInterface) => {
    return;
  },
});
interface GlobalButtonPropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
  // updateGlobalButtonState:(buttonName: string,onButtonClick:()=>void)=>void
}

export interface GlobalButtonActionInterface {
  buttonName: string;
  onButtonClick: () => void;
  buttonTitle: string;
}

export const useGetButtonContext = () => {
  return useContext(GlobalButtonContext);
};

export const useGlobalButtonContext = () => {
  return useContext(GlobalButtonContextSetter);
};

const initState = {
  buttonName: "",
  buttonTitle: "",

  onButtonClick: () => {
    return;
  },
};

export function GlobalButtonContextProvider(
  props: GlobalButtonPropsInterface
): ReactElement {
  const { children } = props;
  const [globalButtonNAction, setGlobalButtonNAction] =
    useState<GlobalButtonActionInterface>(initState);

  const updateGlobalButton = (item) => {
    if (
      item.buttonName !== globalButtonNAction.buttonName ||
      item.onButtonClick !== globalButtonNAction.onButtonClick || 
      item.buttonTitle !== globalButtonNAction.buttonTitle

    ) {
      setGlobalButtonNAction(item);
    }
  };

  const updateGlobalButtonState = useMemo(
    () => debounce(updateGlobalButton),
    []
  );

  return (
    <GlobalButtonContext.Provider value={{ ...globalButtonNAction }}>
      <GlobalButtonContextSetter.Provider value={{ updateGlobalButtonState }}>
        {children}
      </GlobalButtonContextSetter.Provider>
    </GlobalButtonContext.Provider>
  );
}

export default GlobalButtonContextProvider;
