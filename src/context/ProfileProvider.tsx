import React, {
  useReducer,
  createContext,
  useEffect,
  useContext,
  Dispatch,
  useCallback,
} from "react";
import { AuthContext } from "./AuthProvider";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const initialState = {
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  phone: "",
  uid: "",
  status: "",
};

interface StateProps {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  uid: string;
  status: string;
}
type Action = {
  payload: {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    uid: string;
    status: string;
  };
};

interface InitContextProps {
  state: StateProps;
  dispatch: Dispatch<Action>;
}

export const ProfileContext = createContext({} as InitContextProps);

const reducer = (state: StateProps, action: Action) => {
  state = action.payload;
  return state;
};

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = useCallback(
    async (uid: string) => {
      const docSnap = await getDoc(doc(db, "users", uid));

      if (docSnap.exists()) {
        dispatch({
          payload: {
            firstName: docSnap.data().firstName,
            lastName: docSnap.data().lastName,
            role: docSnap.data().role,
            email: docSnap.data().email,
            phone: docSnap.data().phone,
            uid: docSnap.data().uid,
            status: docSnap.data().status,
          },
        });
      } else {
        authDispatch({ type: "log_out", isLogedIn: authState.isAuthenticated });
      }
    },
    [authDispatch, authState.isAuthenticated]
  );

  useEffect(() => {
    if (authState.isAuthenticated) {
      getData(authState.uid);
    } else {
      dispatch({ payload: initialState });
    }
  }, [authState.isAuthenticated, authState.uid, getData]);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
