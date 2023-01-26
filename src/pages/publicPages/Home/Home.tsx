import { collection, getDocs, query, where, limit } from "firebase/firestore";
import {
  Container,
  Grid,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import MainCard from "../../../components/CardViews/MainCard";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flexGrow: 1,
    margin: "20px 0 50px 0",
  },
  slider: {
    "& .slider-wrapper": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& ul": {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  title: {
    lineHeight: "50px",
    color: theme.palette.primary.main,
    textAlign: "center",
    margin: "15px 0 25px 0",
    fontSize: 27,
  },
}));

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile600 = useMediaQuery(theme.breakpoints.down(600));
  const [data, setData] = useState<any[] | null>(null);
  const getData = useCallback(async () => {
    await getDocs(
      query(
        collection(db, "assortment"),
        where("slider", "==", "yes"),
        where("status", "==", "active"),
        limit(8)
      )
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
    });
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Նոր տեսականի</div>
      {isMobile600 ? (
        <></>
      ) : (
        <Container>
          <Grid container spacing={4} style={{ padding: 20 }}>
            {data?.map((item) => (
              <Grid item lg={3} md={4} sm={6} key={item.id}>
                <MainCard item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Home;
