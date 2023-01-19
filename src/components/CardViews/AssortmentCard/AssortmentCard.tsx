import { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ProfileContext } from "../../../context/ProfileProvider";
import {
  currencyFormatterDecimal,
  hexToRgbA,
} from "../../../support/supportFunctions";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import saleIMG from "../../../assets/icons/sale.svg";
import noImage from "../../../assets/icons/noImage.jpg";

interface AssortmentCardProps {
  item: any;
  width?: any;
}

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "unset!important",
    cursor: "pointer",
    display: "flex",
    minHeight: 420,
    maxHeight: 420,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px!important",
    position: "relative",
    boxShadow: "0 2px 4px 2px rgba(0,0,0,0.1)!important",
    "&:hover": {
      boxShadow: "0 5px 9px 5px rgba(0,0,0,0.1)!important",
    },
  },
  cardSale: {
    overflow: "unset!important",
    minHeight: 420,
    maxHeight: 420,
    cursor: "pointer",
    background: `${hexToRgbA("#ecbbbb", "0.05")}!important`,
    borderRadius: "10px!important",
    position: "relative",
    boxShadow: `0 2px 4px 2px ${hexToRgbA("#ecbbbb", "0.6")}!important`,
    "&:hover": {
      boxShadow: `0 4px 8px 4px ${hexToRgbA("#ecbbbb", "0.6")}!important`,
    },
  },
  actions: {
    cursor: "default",
    justifyContent: "space-between",
  },
  favBtn: {
    padding: 0,
    minWidth: "unset!important",
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
    top: -18,
    right: -18,
  },
  img: { overflow: "hidden", borderRadius: "10px" },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
    wrap: "nowrap",
  },
}));

const AssortmentCard = ({ item, width }: AssortmentCardProps) => {
  const classes = useStyles();
  const { id, image, title, subtitle, price, sale } = item;
  const { state: profileState, dispatch: profileDispatch } =
    useContext(ProfileContext);
  const [url, setUrl] = useState<any | null>(null);

  const handleFavClick = (fav: boolean) => {
    profileDispatch({ type: "FAVORITES", payload: { isFavorite: fav, id } });
  };

  useEffect(() => {
    if (!url && image) {
      getDownloadURL(ref(storage, image)).then((url) => {
        setUrl(url);
      });
    }
  }, [image, url]);

  return (
    <Card
      sx={{ maxWidth: width ? width : "unset" }}
      className={sale ? classes.cardSale : classes.card}
    >
      {sale ? <div className={classes.sale}>{sale}%</div> : null}
      <CardMedia
        component="img"
        alt=""
        height="250"
        image={url ? url : noImage}
        className={classes.img}
      />

      <CardContent
        style={{
          paddingTop: 10,
          paddingBottom: 0,
        }}
      >
        <Typography variant="h6" component="div" className={classes.title}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            height: 42,
            minHeight: 42,
            maxHeight: 42,
            overflow: "hidden",
          }}
        >
          {subtitle.length > 70
            ? `${subtitle.substring(0, 70).trim()}...`
            : subtitle}
        </Typography>
        <div
          style={{
            textAlign: "right",
            height: 35,
            minHeight: 35,
            maxHeight: 35,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {sale ? (
            <div
              style={{
                fontSize: 12,
                textDecoration: "line-through",
                opacity: 0.8,
                color: "red",
              }}
            >
              {currencyFormatterDecimal(price, " դրամ")}
            </div>
          ) : null}
          <div style={{ position: "absolute", bottom: 0, right: 0 }}>
            {currencyFormatterDecimal(price, " դրամ", sale)}
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small" color="secondary">
          Տեսնել ավելին
        </Button>
        <Button
          size="small"
          color="secondary"
          className={classes.favBtn}
          onClick={() => handleFavClick(!profileState.favorites.includes(id))}
        >
          {profileState.favorites.includes(id) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default AssortmentCard;
