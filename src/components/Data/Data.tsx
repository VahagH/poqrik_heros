import { Button, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { useReducer, useState, useEffect, memo } from "react";
import { Grid } from "@mui/material";
import AssortmentCard from "../CardViews/AssortmentCard";
import Pagination from "@mui/material/Pagination";
import Filter from "./Components/Filter";

interface DataProps {
  data: any;
  title: string;
  filters: any[];
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
    width: "24%",
    minHeight: 700,
    overflow: "hidden",
  },
  mobileFilters: {
    position: "fixed",
    top: 0,
    left: -1000,
    transition: "0.4s",
    borderRight: "1px solid #999",
  },
  showMobileFilters: {
    transition: "0.4s",
    position: "fixed",
    top: 0,
    left: 0,
    width: "60%",
    minWidth: 250,
    overflowY: "scroll",
    height: "100vh",
    padding: "20px 20px 0 20px",
    zIndex: 10,
    background: "#fff",
    borderRight: "1px solid #999",
  },
  data: {
    width: "72%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: 5,
    paddingBottom: 80,
  },
  title: {
    margin: "5px 0 20px 0",
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: "1px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  filterBack: {
    height: "100vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9,
    background: "rgba(0,0,0,0.5)",
  },
  filterBTN: {
    background: theme.palette.primary.main,
    color: "#fff",
    padding: "10px 25px",
    textTransform: "unset",
    marginRight: 10,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    "&:hover": { background: theme.palette.primary.main },
  },
}));

const Data = ({ data, title, filters }: DataProps) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const theme = useTheme();
  const isMobileSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile750 = useMediaQuery(theme.breakpoints.down(750));
  const isMobile500 = useMediaQuery(theme.breakpoints.down(500));
  const [filter, setFilters] = useReducer((state: any, newState: any) => {
    let colors = state.color ? state.color : [];
    const returnData = newState ? { ...state, ...newState } : {};
    if (newState?.color) {
      if (colors.findIndex((el: string) => el === newState.color) === -1) {
        colors.push(newState.color);
      } else {
        colors = colors.filter((el: string) => el !== newState.color);
      }
      returnData.color = colors;
    }
    return returnData;
  }, {});

  useEffect(() => {
    setFilteredData(
      data.filter((el: any) => {
        for (const key in filter) {
          if (
            key === "search" &&
            filter[key] &&
            String(el.code) !== filter[key] &&
            !el.title.toLowerCase().includes(filter[key].toLowerCase()) &&
            !el.subtitle.toLowerCase().includes(filter[key].toLowerCase()) &&
            !(
              el?.barCode &&
              el.barCode.toLowerCase().includes(filter[key].toLowerCase())
            )
          ) {
            return false;
          }
          if (
            key === "color" &&
            filter[key].length &&
            !filter[key].includes(el.color)
          ) {
            return false;
          }
          if (key === "price" && !!filter[key]?.length) {
            if (!el.sale) {
              if (filter[key].length === 1 && el.price < filter[key][0]) {
                return false;
              } else if (
                filter[key][0] > el.price ||
                filter[key][1] <= el.price
              ) {
                return false;
              }
            } else {
              const salePrice = Math.floor(
                el.price - el.price * (el.sale / 100)
              );
              if (filter[key].length === 1 && salePrice < filter[key][0]) {
                return false;
              } else if (
                filter[key][0] > salePrice ||
                filter[key][1] <= salePrice
              ) {
                return false;
              }
            }
          }
          if (key === "age" && filter[key]) {
            if (+filter[key] >= 10) {
              if (
                (!el.maxAge && el.minAge < 10) ||
                (el.maxAge && el.maxAge < 10)
              ) {
                return false;
              }
            } else {
              if (
                (!el.maxAge && el.minAge !== +filter[key]) ||
                (el.maxAge &&
                  (el.maxAge < +filter[key] || el.minAge > +filter[key]))
              ) {
                return false;
              }
            }
          }
        }
        return true;
      })
    );
  }, [filter, data]);

  return (
    <div className={classes.wrapper}>
      {isMobileSM && showFilters && (
        <div
          className={classes.filterBack}
          onClick={() => {
            setShowFilters(false);
          }}
        />
      )}

      <div
        className={
          isMobileSM && !showFilters
            ? classes.mobileFilters
            : isMobileSM && showFilters
            ? classes.showMobileFilters
            : classes.filters
        }
      >
        <div className={classes.title}>Ֆիլտրներ</div>
        {isMobileSM && showFilters && (
          <div
            onClick={() => {
              setShowFilters(false);
            }}
            style={{
              position: "absolute",
              top: 25,
              right: 25,
              fontSize: 18,
              padding: 5,
            }}
          >
            &#x2716;
          </div>
        )}
        {filters.map((item: any) => (
          <Filter
            filter={item}
            onChange={setFilters}
            key={item.key}
            selected={filter[item.key]}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: 20,
            paddingBottom: 30,
          }}
        >
          <Button
            onClick={() => {
              setFilters(null);
              setSearchValue("");
            }}
          >
            Մաքրել ֆիլտրները
          </Button>
        </div>
      </div>

      <div
        className={classes.data}
        style={{ width: isMobileSM ? "100%" : "72%" }}
      >
        <div className={classes.title}>
          <div>{title}</div>
          {isMobileSM && (
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className={classes.filterBTN}
            >
              Ֆիլտրներ
            </Button>
          )}
        </div>
        <Grid container spacing={2}>
          {filteredData
            .slice((page - 1) * 12, (page - 1) * 12 + 12)
            .map((el: any) => (
              <Grid
                item
                lg={4}
                md={4}
                sm={isMobile750 ? 6 : 4}
                xs={isMobile500 ? 12 : 6}
                key={el.id}
              >
                <AssortmentCard item={el} />
              </Grid>
            ))}
        </Grid>
        {!!!filteredData.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px 0",
              fontSize: 18,
            }}
          >
            Տվյալներ չկան
          </div>
        )}
        {filteredData.length > 12 && (
          <Pagination
            count={Math.ceil(filteredData.length / 12)}
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

export default memo(Data);
