import { useCallback, useContext, useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { useLocation, useParams } from "react-router-dom";
import { db, storage } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { makeStyles, Button } from "@material-ui/core";
import Loading from "../../../components/Loading/Loading";
import { currencyFormatterDecimal } from "../../../support/supportFunctions";
import saleIMG from "../../../assets/icons/sale.svg";
import { ProfileContext } from "../../../context/ProfileProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    padding: "0 20px 50px 20px",
    minHeight: 750,
    justifyContent: "center",
    [theme.breakpoints.down(700)]: {
      flexDirection: "column",
      justifyContent: "unset",
    },
  },
  img: {
    maxWidth: 430,
    borderRadius: 10,
    [theme.breakpoints.down(700)]: {
      maxWidth: "100%",
    },
  },
  sale: {
    color: "purple",
    position: "absolute",
    height: 55,
    background: `url(${saleIMG})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    width: 55,
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    top: -10,
    right: -10,
  },
  favBtn: {
    position: "absolute",
    top: 15,
    left: 15,
    padding: 0,
    minWidth: "unset!important",
  },
  favIMG: { fontSize: "35px!important" },
  content: {
    width: "40%",
    padding: "0 20px",
    [theme.breakpoints.down(700)]: {
      width: "80%",
      marginTop: 15,
    },
  },
  name: { fontSize: 18, color: "rgba(0,0,0,0.7)" },
  title: { fontSize: 25, color: "#222", fontWeight: 500 },
  subtitle: { fontSize: 15, color: "#666" },
  code: { marginTop: 30, fontSize: 16 },
  age: { marginTop: 10, fontSize: 16 },
  price: { marginTop: 10, fontSize: 19 },
}));

const Description = () => {
  const location = useLocation();
  const classes = useStyles();
  const { id } = useParams();
  const state = location.state;
  const [data, setData] = useState<any>(state);
  const [url, setUrl] = useState<any | null>(null);
  const age = data?.maxAge ? `${data?.minAge} - ${data?.maxAge}` : data?.minAge;
  const { state: profileState, dispatch: profileDispatch } =
    useContext(ProfileContext);

  const getData = useCallback(async () => {
    const docSnap = await getDoc(doc(db, "assortment", id || ""));

    if (docSnap.exists()) {
      setData({
        code: docSnap.data().code,
        title: docSnap.data().title,
        subtitle: docSnap.data().subtitle,
        sale: docSnap.data().sale,
        price: docSnap.data().price,
        minAge: docSnap.data().minAge,
        maxAge: docSnap.data().maxAge,
        type: docSnap.data().type,
        id: docSnap.data().id,
        image: docSnap.data().image,
      });
    }
  }, [id]);

  const handleFavClick = (fav: boolean, id: string) => {
    profileDispatch({ type: "FAVORITES", payload: { isFavorite: fav, id } });
  };

  useEffect(() => {
    if (!data) {
      getData();
    }
    if (!url && data?.image) {
      getDownloadURL(ref(storage, data?.image)).then((url) => {
        setUrl(url);
      });
    }
  }, [data?.image, url, data, getData]);

  if (!data || !url) return <Loading />;
  return (
    <div className={classes.wrapper}>
      <div style={{ position: "relative" }}>
        <img src={url} alt="" className={classes.img} />
        {data?.sale ? <div className={classes.sale}>{data.sale}%</div> : null}
        <Button
          size="small"
          color="secondary"
          className={classes.favBtn}
          onClick={() =>
            handleFavClick(
              !profileState.favorites.includes(id || data?.id),
              id || data?.id
            )
          }
        >
          {profileState.favorites.includes(id || data?.id) ? (
            <FavoriteIcon className={classes.favIMG} />
          ) : (
            <FavoriteBorderIcon className={classes.favIMG} />
          )}
        </Button>
      </div>

      <div className={classes.content}>
        <div className={classes.title}>{data?.title}</div>
        <div className={classes.subtitle}>{data?.subtitle}</div>
        <div className={classes.code}>Կոդ {data.code}</div>
        <div className={classes.age}>
          <span className={classes.name}>Տարիք</span> {age}
        </div>
        {data?.sale && (
          <div className={classes.price}>
            <span className={classes.name}>Հին Գին</span>{" "}
            {currencyFormatterDecimal(data.price, " դրամ")}
          </div>
        )}
        <div className={classes.price}>
          <span className={classes.name}>Գին</span>{" "}
          {data.sale
            ? currencyFormatterDecimal(data.price, " դրամ", data.sale)
            : currencyFormatterDecimal(data.price, " դրամ")}
        </div>
      </div>
    </div>
  );
};

export default Description;
