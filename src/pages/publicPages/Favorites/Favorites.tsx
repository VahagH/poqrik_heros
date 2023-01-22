import { Grid } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import AssortmentCard from "../../../components/CardViews/AssortmentCard";
import Loading from "../../../components/Loading/Loading";
import { ProfileContext } from "../../../context/ProfileProvider";
import { db } from "../../../firebase/firebase";
import notFound from "../../../assets/notFound.jpg";

const Favorites = () => {
  const [data, setData] = useState<any[] | null>(null);
  const { state: profileState } = useContext(ProfileContext);
  const theme = useTheme();
  const isMobile750 = useMediaQuery(theme.breakpoints.down(750));
  const isMobile500 = useMediaQuery(theme.breakpoints.down(500));
  const getData = useCallback(async () => {
    await getDocs(
      query(collection(db, "assortment"), where("status", "==", "active"))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((el) => profileState.favorites.includes(el.id));
      setData(newData);
    });
  }, [profileState.favorites]);
  useEffect(() => {
    getData();
  }, [getData]);

  if (!data) return <Loading />;

  if (!data.length)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <img alt="" src={notFound} width="100px" />
        <div style={{ textAlign: "center" }}>
          Դուք դեռ չեք ավելացրել ընտրված ապրանք
        </div>
      </div>
    );

  return (
    <div>
      <Grid container spacing={2}>
        {data.map((el) => (
          <Grid
            item
            md={3}
            sm={isMobile750 ? 6 : 4}
            xs={isMobile500 ? 12 : 6}
            key={el.id}
          >
            <AssortmentCard item={el} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
