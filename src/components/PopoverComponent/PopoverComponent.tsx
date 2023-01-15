import { useState } from "react";
import { Popover, Button, makeStyles } from "@material-ui/core";
import InfoIcon from "@mui/icons-material/Info";

const useStyles = makeStyles((theme) => ({
  popover: {
    maxWidth: 550,
    "& li": {
      display: "flex",
      flexDirection: "column",
      alignItems: "baseline",
    },
  },
  btn: {
    textTransform: "none",
    background: "white",
    color: "black",
    padding: "5px 10px",
    alignItems: "center",
    "&:hover": {
      background: "white",
    },
    [theme.breakpoints.down(500)]: {
      maxWidth: 107,
    },
  },
  showMoreIcon: {
    cursor: "pointer",
    marginLeft: 1,
    fontSize: 18,
    color: theme.palette.secondary.main,
  },
  spanPop: {
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 90,
      width: 90,
    },
  },
}));

interface PopoverComponentProps {
  title: string;
  showDotes?: boolean;
  children: any;
  strLength?: number;
}

const PopoverComponent = ({
  title,
  showDotes = false,
  children,
  strLength = 20,
}: PopoverComponentProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      {showDotes ? (
        <>
          <span>
            {title?.length > strLength
              ? title.substring(0, strLength).trim()
              : title}
          </span>
          {title?.length > strLength && (
            <span className={classes.showMoreIcon} onClick={handleClick}>
              ...
            </span>
          )}
        </>
      ) : (
        <Button
          className={classes.btn}
          variant="text"
          color="secondary"
          size="small"
          onClick={handleClick}
        >
          {title === "Cancelation Policy" && (
            <InfoIcon fontSize="medium" style={{ marginRight: 5 }} />
          )}

          {title}
        </Button>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.popover}
        onClick={(e) => {
          handleClose(e);
          e.stopPropagation();
        }}
      >
        <div style={{ padding: 10 }}> {children}</div>
      </Popover>
    </>
  );
};

export default PopoverComponent;
