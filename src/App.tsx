import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Route, Routes } from "react-router-dom";
import {
  PageProps,
  privatePages,
  privatePagesWithCode,
  publicPages,
} from "./router";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import { createContext, Suspense, useEffect, useState } from "react";
import { Container, Dialog, makeStyles } from "@material-ui/core";
import packageJSON from "./../package.json";
import NavBar from "./components/NavBar";
const firebaseConfig = {
  apiKey: "AIzaSyDVWDsAi1Ax-oe-9-DF9v2bI9f9PxQt_6E",
  authDomain: "poqrikheros-af1ff.firebaseapp.com",
  projectId: "poqrikheros-af1ff",
  storageBucket: "poqrikheros-af1ff.appspot.com",
  messagingSenderId: "202968855717",
  appId: "1:202968855717:web:e9a1fcceef0d75f5f6c94c",
  measurementId: "G-RC0FVJ0DM5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100vh",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flexGrow: 1,
  },
  footer: {
    height: 35,
    display: "flex",
    justifyContent: "center",
    fontSize: 14,
    cursor: "default",
    fontWeight: 400,
    background: theme.palette.primary.main,
    color: "#fff",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [auth, setAuth] = useState({ auth: false });
  const [code, setCode] = useState(0);
  const handleClick = () => {
    setCode(code + 1);
  };

  return (
    <div className={classes.wrapper}>
      <NavBar />
      <Container className={classes.container}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {publicPages.map((el: PageProps) => (
              <Route
                key={el.path}
                path={el.path}
                element={<el.component />}
              ></Route>
            ))}
            {privatePages.map((el: PageProps) => (
              <Route
                key={el.path}
                path={el.path}
                element={<el.component />}
              ></Route>
            ))}
            {code === 3 &&
              privatePagesWithCode.map((el: PageProps) => (
                <Route
                  key={el.path}
                  path={el.path}
                  element={<el.component code={code} />}
                ></Route>
              ))}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </Container>
      <div className={classes.footer}>
        Բոլոր իրա<span onClick={handleClick}>վ</span>ունքները պաշտպանված են:{" "}
        {/* disable if loged in */}
        &copy; 2022
      </div>
    </div>
  );
}

export default App;
