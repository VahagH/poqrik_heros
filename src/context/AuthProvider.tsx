import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  isAuthenticated: false,
  uid: "",
};

interface StateProps {
  isAuthenticated: boolean;
  uid: string;
}

type Action =
  | {
      type: "log_in";
      payload: { isAuthenticated: boolean; uid: string };
    }
  | { type: "log_out"; isLogedIn?: boolean };

interface InitContextProps {
  state: StateProps;
  dispatch: Dispatch<Action>;
}

export const AuthContext = createContext({} as InitContextProps);

const reducer = (state: StateProps, action: Action) => {
  switch (action.type) {
    case "log_in":
      return { ...state, isAuthenticated: true, uid: action.payload.uid };
    case "log_out":
      auth.signOut();
      localStorage.clear();
      if (action?.isLogedIn) {
        window.location.href = "/";
      }

      return { ...state, isAuthenticated: false, uid: "" };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const uid = localStorage.getItem("uid");
    let bool: boolean = false;
    if (isAuthenticated) {
      bool = JSON.parse(isAuthenticated);
    }
    isAuthenticated === "true" && uid
      ? dispatch({
          type: "log_in",
          payload: { isAuthenticated: true, uid: uid },
        })
      : dispatch({ type: "log_out", isLogedIn: bool });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (uid && user.uid !== uid) {
          console.log("uid", uid);
          console.log("user.uid", user.uid);
          dispatch({ type: "log_out", isLogedIn: bool });
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
