import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Route, Routes } from "react-router-dom";
import { PageProps, privatePages, publicPages } from "./router";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import { Suspense, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
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
    overflow: "hidden",
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
    fontWeight: 400,
    background: theme.palette.primary.main,
    color: "#fff",
    alignItems: "center",
  },
}));

function App() {
  const classes = useStyles();
  const [auth, setAuth] = useState({ auth: false });
  return (
    <div className={classes.wrapper}>
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
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </Container>
      <div className={classes.footer}>
        Բոլոր իրավունքները պաշտպանված են: &copy; 2022
      </div>
    </div>
  );
}

export default App;
