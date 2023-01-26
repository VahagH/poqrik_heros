import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import noImage from "../../../assets/icons/noImage.jpg";

interface MainCardProps {
  item: any;
}

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: "default",
    width: "100%!important",
    display: "flex",
    minHeight: 400,
    maxHeight: 400,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "10px!important",
    boxShadow: "unset!important",
    "&:hover": {
      boxShadow: "0 2px 4px 2px rgba(0,0,0,0.1)!important",
    },
  },
  actions: {
    cursor: "default",
    justifyContent: "end",
  },
  img: {
    overflow: "hidden",
    borderRadius: "10px",
  },
}));

const MainCard = ({ item }: MainCardProps) => {
  const classes = useStyles();
  const { id, image } = item;
  const [url, setUrl] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!url && image) {
      getDownloadURL(ref(storage, image)).then((url) => {
        setUrl(url);
      });
    }
  }, [image, url]);

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt=""
        height="350"
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
        <CardActions className={classes.actions}>
          <Button
            onClick={() => navigate(`/info/${id}`, { state: item })}
            size="small"
            color="secondary"
          >
            Տեսնել ավելին
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default MainCard;
