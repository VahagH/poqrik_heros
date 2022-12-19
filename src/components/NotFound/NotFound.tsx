import { makeStyles } from "@material-ui/core";
import notFound from "../../assets/notFound.jpg";
import React from "react";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 500,
    height: 200,
    color: theme.palette.primary.main,
    overflow: "hidden",
    overflowY: "auto",
    display: "flex",
    minHeight: 250,
    maxWidth: 700,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: 10,
    padding: 15,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      height: "50%",
    },
  },
  notFound: {
    color: "red",
    fontSize: 25,
    fontWeight: 600,
    opacity: 0.8,
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <img src={notFound} alt="" height="100px" />
        <div className={classes.notFound}>Էջը չի գտնվել</div>
      </div>
    </div>
  );
};

export default NotFound;
