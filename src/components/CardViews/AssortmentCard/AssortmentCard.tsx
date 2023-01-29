import { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { makeStyles, Button } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
import { useNavigate } from "react-router-dom";

interface AssortmentCardProps {
  item: any;
  width?: any;
}

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "unset!important",
    cursor: "default",
    width: "100%!important",
    paddingTop: "2.5%",
    paddingBottom: 5,
    display: "flex",
    minHeight: 410,
    maxHeight: 410,
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
    paddingTop: "2.5%",
    paddingBottom: 5,
    display: "flex",
    width: "100%!important",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 410,
    maxHeight: 410,
    cursor: "default",
    background: `${hexToRgbA("#ecbbbb", "0.05")}!important`,
    borderRadius: "10px!important",
    position: "relative",
    boxShadow: `0 2px 4px 2px ${hexToRgbA("#ecbbbb", "0.6")}!important`,
    "&:hover": {
      boxShadow: `0 4px 8px 4px ${hexToRgbA("#ecbbbb", "0.6")}!important`,
    },
  },
  favBtn: {
    position: "absolute",
    top: 15,
    left: 15,
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
  img: {
    overflow: "hidden",
    borderRadius: "10px",
    width: "95%!important",
    cursor: "pointer",
    margin: "auto",
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
    wrap: "nowrap",
  },
  subtitle: {
    height: "max-content",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
    wrap: "nowrap",
  },
  price: {
    textAlign: "right",
    height: 35,
    minHeight: 35,
    maxHeight: 35,
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
  },
}));

const AssortmentCard = ({ item, width }: AssortmentCardProps) => {
  const classes = useStyles();
  const { id, image, title, subtitle, price, sale, code } = item;
  const { state: profileState, dispatch: profileDispatch } =
    useContext(ProfileContext);
  const [url, setUrl] = useState<any | null>(null);
  const navigate = useNavigate();

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
        onClick={() => navigate(`/info/${id}`, { state: item })}
        component="img"
        alt=""
        height={350}
        image={url ? url : noImage}
        className={classes.img}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: 150,
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <CardContent
          style={{
            paddingTop: 10,
            paddingBottom: 0,
          }}
        >
          {title && (
            <Typography variant="h6" component="div" className={classes.title}>
              {title}
            </Typography>
          )}

          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.subtitle}
          >
            {subtitle}
          </Typography>
          <div className={classes.price}>
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
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 14 }}>Կոդ {code}</div>
              <div>{currencyFormatterDecimal(price, " դրամ", sale)}</div>
            </div>
          </div>
        </CardContent>
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
      </div>
    </Card>
  );
};

export default AssortmentCard;
