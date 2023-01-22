import { Route, Routes, useLocation } from "react-router-dom";
import { privatePages, privatePagesWithCode, publicPages } from "./router";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import { Suspense, useContext, useEffect, useState } from "react";
import {
  Container,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import NavBar from "./pages/publicPages/NavBar";
import { PageProps } from "./support/types";
import Toast from "./components/Toast";
import { AuthContext } from "./context/AuthProvider";
import PrivateRoute from "./components/routes/PrivateRoute";
import { ProfileContext } from "./context/ProfileProvider";
import { auth } from "./firebase/firebase";
import Footer from "./pages/publicPages/Footer";
import main from "./assets/main.jpg";
import mainMobile from "./assets/mainMobile.jpg";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    overflowY: "auto",
    flexGrow: 1,

    minHeight: "80vh",
    // background: "#eda7fd",
  },
  container: {
    paddingTop: 5,
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    position: "relative",
    "& .MuiContainer-root": {
      padding: 0,
    },
  },
}));

function App() {
  const classes = useStyles();
  const [code, setCode] = useState(0);
  const theme = useTheme();
  const isMobileSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: profileState } = useContext(ProfileContext);
  const location = useLocation();

  const filterdRoutes = privatePages.filter(
    (route: PageProps) =>
      route.role?.includes(profileState.role) &&
      profileState.status === "active"
  );

  const handleClick = () => {
    setCode(code + 1);
  };

  useEffect(() => {
    if (
      auth.currentUser?.uid &&
      authState?.uid &&
      auth.currentUser.uid !== authState.uid
    ) {
      localStorage.setItem("appcurrent", auth.currentUser.uid);
      localStorage.setItem("appAuth", authState.uid);
      authDispatch({ type: "log_out" });
    }
  }, [authDispatch, authState.uid]);

  return (
    <div className={classes.wrapper}>
      <NavBar />
      {location.pathname === "/" &&
        (isMobileSM ? (
          <img src={mainMobile} alt="" width="100%" />
        ) : (
          <img src={main} alt="" width="100%" />
        ))}
      <main className={classes.content}>
        {profileState.favorites ? (
          <Container className={classes.container}>
            <Suspense fallback={<Loading />}>
              <Routes>
                {publicPages.map((el: PageProps) => (
                  <Route
                    key={el.path}
                    path={el.path}
                    element={<el.component />}
                  />
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
        ) : (
          <Loading />
        )}
      </main>
      <Footer
        isAuthenticated={authState.isAuthenticated}
        handleClick={handleClick}
      />
      <Toast />
    </div>
  );
}

export default App;
