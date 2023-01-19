import { Grid } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import AssortmentCard from "../../../components/CardViews/AssortmentCard";
import Loading from "../../../components/Loading/Loading";
import { ProfileContext } from "../../../context/ProfileProvider";
import { db } from "../../../firebase/firebase";
import notFound from "../../../assets/notFound.jpg";

const Favorites = () => {
  const [data, setData] = useState<any[] | null>(null);
  const { state: profileState } = useContext(ProfileContext);
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
        <div> Դուք դեռ չեք ավելացրել ընտրված ապրանք</div>
      </div>
    );

  return (
    <div>
      <Grid container spacing={2}>
        {data.map((el) => (
          <Grid item md={3} sm={3} xs={12} key={el.id}>
            <AssortmentCard item={el} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;
