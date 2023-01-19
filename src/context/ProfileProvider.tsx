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

const favorites = localStorage.getItem("favorites");
const favoritesArr = favorites ? JSON.parse(favorites) : [];

const initialState = {
  firstName: "",
  lastName: "",
  role: "",
  email: "",
  phone: "",
  uid: "",
  status: "",
  favorites: favoritesArr,
};

interface StateProps {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  uid: string;
  status: string;
  favorites: string[];
}
type Action =
  | {
      type: "USER";
      payload: {
        firstName: string;
        lastName: string;
        role: string;
        email: string;
        phone: string;
        uid: string;
        status: string;
      };
    }
  | {
      type: "FAVORITES";
      payload: {
        isFavorite: boolean;
        id: string;
      };
    };

interface InitContextProps {
  state: StateProps;
  dispatch: Dispatch<Action>;
}

export const ProfileContext = createContext({} as InitContextProps);

const reducer = (state: StateProps, action: Action) => {
  switch (action.type) {
    case "USER":
      return { ...state, ...action.payload };
    case "FAVORITES":
      const { id } = action.payload;
      let favor = state.favorites;
      if (state.favorites.length) {
        if (action.payload.isFavorite) {
          if (!state.favorites.includes(id)) {
            favor.push(id);
            localStorage.setItem("favorites", JSON.stringify(favoritesArr));
          }
        } else {
          if (state.favorites.includes(id)) {
            favor = favor.filter((el: string) => el !== id);
            localStorage.setItem(
              "favorites",
              JSON.stringify(state.favorites.filter((el: string) => el !== id))
            );
          }
        }
      } else {
        if (action.payload.isFavorite) {
          favor.push(id);
          localStorage.setItem("favorites", JSON.stringify([id]));
        }
      }
      return { ...state, favorites: favor };
    default:
      return state;
  }
};

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = useCallback(
    async (uid: string) => {
      const docSnap = await getDoc(doc(db, "users", uid));

      if (docSnap.exists()) {
        dispatch({
          type: "USER",
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
        localStorage.setItem("profile", "docfalse");
        authDispatch({ type: "log_out", isLogedIn: authState.isAuthenticated });
      }
    },
    [authDispatch, authState.isAuthenticated]
  );

  useEffect(() => {
    if (authState.isAuthenticated) {
      getData(authState.uid);
    } else {
      dispatch({ type: "USER", payload: initialState });
    }
  }, [authState.isAuthenticated, authState.uid, getData]);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
