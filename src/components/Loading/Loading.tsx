import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "80vh",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <CircularProgress size={35} color={"primary"} />
    </div>
  );
};

export default Loading;
