import { Route, Routes } from "react-router-dom";
import { privatePages, privatePagesWithCode, publicPages } from "./router";
import NotFound from "./components/NotFound";
import Loading from "./components/Loading/Loading";
import { createContext, Suspense, useEffect, useState } from "react";
import { Container, Dialog, makeStyles } from "@material-ui/core";
import packageJSON from "./../package.json";
import NavBar from "./components/NavBar";
import moment from "moment";
import { PageProps } from "./support/types";

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
    marginTop: 70,
  },
}));

function App() {
  const classes = useStyles();
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
        Բոլոր իրա<span onClick={handleClick}>վ</span>ունքները պաշտպանված են:
        {/* disable if loged in */}
        &copy; {moment().year()}
      </div>
    </div>
  );
}

export default App;
