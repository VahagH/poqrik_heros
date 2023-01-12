import React, { createContext, Dispatch, useReducer } from "react";

const initialState = {
  message: "",
  toastType: "success",
  open: false,
};

interface StateProps {
  message: string;
  toastType: any;
  open: boolean;
}

type Action = {
  payload: { message: string; toastType: any; open: boolean };
};

interface InitContextProps {
  state: StateProps;
  dispatch: Dispatch<Action>;
}

export const ToastContext = createContext({} as InitContextProps);

const reducer = (state: StateProps, action: Action) => {
  state = action.payload;
  return state;
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
