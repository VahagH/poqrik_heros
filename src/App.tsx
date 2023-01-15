import { Route, Routes } from "react-router-dom";
import { privatePages, privatePagesWithCode, publicPages } from "./router";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import { Suspense, useContext, useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import NavBar from "./components/NavBar";
import moment from "moment";
import { PageProps } from "./support/types";
import Toast from "./components/Toast";
import { AuthContext } from "./context/AuthProvider";
import PrivateRoute from "./components/routes/PrivateRoute";
import { ProfileContext } from "./context/ProfileProvider";
import { auth } from "./firebase/firebase";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flexGrow: 1,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    // marginTop: 70,
  },
}));

function App() {
  const classes = useStyles();
  const [code, setCode] = useState(0);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: profileState } = useContext(ProfileContext);

  const filterdRoutes = privatePages.filter(
    (route: PageProps) =>
      route.role?.includes(profileState.role) &&
      profileState.status === "active"
  );

  const handleClick = () => {
    setCode(code + 1);
  };

  useEffect(() => {
    if (auth.currentUser?.uid && auth.currentUser.uid !== authState.uid) {
      authDispatch({ type: "log_out" });
    }
  }, [authDispatch, authState.uid]);

  return (
    <div className={classes.wrapper}>
      <NavBar />
      <Container className={classes.container}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {publicPages.map((el: PageProps) => (
              <Route key={el.path} path={el.path} element={<el.component />} />
            ))}
            {authState.isAuthenticated &&
              filterdRoutes.map((el: PageProps) => (
                <Route
                  key={el.path}
                  path={el.path}
                  element={
                    <PrivateRoute
                      isAuthenticated={authState.isAuthenticated}
                      role={el.role?.includes(profileState.role)}
                      profileIsActive={profileState.status === "active"}
                    >
                      <el.component />
                    </PrivateRoute>
                  }
                />
              ))}
            {code === 3 &&
              !authState.isAuthenticated &&
              privatePagesWithCode.map((el: PageProps) => (
                <Route
                  key={el.path}
                  path={el.path}
                  element={<el.component code={code} />}
                />
              ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
      <div className={classes.footer}>
        Բոլոր իրա
        <span onClick={() => !authState.isAuthenticated && handleClick()}>
          վ
        </span>
        ունքները պաշտպանված են: &copy; {moment().year()}
      </div>
      <Toast />
    </div>
  );
}

export default App;
