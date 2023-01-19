import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Grid } from "@mui/material";
import AssortmentCard from "../CardViews/AssortmentCard";
import Pagination from "@mui/material/Pagination";

interface DataProps {
  data: any;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    flexGrow: 1,
    padding: "5px 0",
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0 50px 0",
  },
  filters: {
    width: "25%",
    minHeight: 700,
  },
  data: {
    width: "72%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingBottom: 80,
  },
  title: {
    margin: "5px 0 20px 0",
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: "1px",
    color: theme.palette.primary.main,
  },
  pagination: {
    width: "max-content",
    margin: "auto",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 50,
  },
}));

const Data = ({ data, title }: DataProps) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

  return (
    <div className={classes.wrapper}>
      <div className={classes.filters}>
        <div className={classes.title}>Ֆիլտրներ</div>
      </div>
      <div className={classes.data}>
        <div className={classes.title}>{title}</div>
        <Grid container spacing={2}>
          {data.slice((page - 1) * 12, (page - 1) * 12 + 12).map((el: any) => (
            <Grid item lg={4} md={6} sm={12} key={el.id}>
              <AssortmentCard item={el} />
            </Grid>
          ))}
        </Grid>
        {data.length > 12 && (
          <Pagination
            count={Math.ceil(data.length / 12)}
            variant="outlined"
            className={classes.pagination}
            shape="rounded"
            page={page}
            onChange={(e, value) => {
              value !== page && window.scroll(0, 150);
              setPage(value);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Data;
