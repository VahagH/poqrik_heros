import { makeStyles, Container } from "@material-ui/core";
import { List } from "@mui/material";
import React from "react";
import { privatePages, publicPages } from "../../router";
import ListItemLink from "../ListItemLink";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 100,
    maxHeight: 100,
    minHeight: 100,
    background: "#fff",
    boxShadow: "0 0 30px 0 rgb(0 0 0 / 7%)",
    display: "flex",
    alignItems: "center",
  },
  container: {
    maxHeight: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 80,
    maxHeight: 80,
    cursor: "pointer",
  },
  list: {
    display: "flex",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const filteredRoutes = [
    ...publicPages.filter((el) => el.navBar),
    ...privatePages.filter((el) => el.navBar),
  ];
  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt=""
          className={classes.logo}
        />
        <List className={classes.list}>
          {filteredRoutes.map((el) => (
            <ListItemLink link={el} key={el.path} />
          ))}
        </List>
      </Container>
    </div>
  );
};

export default NavBar;
