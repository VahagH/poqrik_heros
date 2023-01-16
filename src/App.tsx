import { Route, Routes } from "react-router-dom";
import { privatePages, privatePagesWithCode, publicPages } from "./router";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import { Suspense, useContext, useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import NavBar from "./pages/publicPages/NavBar";
import { PageProps } from "./support/types";
import Toast from "./components/Toast";
import { AuthContext } from "./context/AuthProvider";
import PrivateRoute from "./components/routes/PrivateRoute";
import { ProfileContext } from "./context/ProfileProvider";
import { auth } from "./firebase/firebase";
import Footer from "./pages/publicPages/Footer";

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
    minHeight: "75vh",
    flexDirection: "column",
    justifyContent: "space-between",
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
      <Footer
        isAuthenticated={authState.isAuthenticated}
        handleClick={handleClick}
      />
      <Toast />
    </div>
  );
}

export default App;
