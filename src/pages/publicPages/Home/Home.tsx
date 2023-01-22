import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "20px 0 50px 0",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div>cascsac</div>
    </div>
  );
};

export default Home;
