import { makeStyles } from "@material-ui/core";
import { forwardRef, useMemo } from "react";
import { ListItem, ListItemText } from "@material-ui/core";

import { NavLink, NavLinkProps } from "react-router-dom";
import { PageProps } from "../../router";

const useStyles = makeStyles((theme) => ({
  nav: {
    marginLeft: 5,
    borderRadius: 20,
    "&.active  .MuiTypography-root": {
      color: "#A45EE5",
    },
    "&:active": {
      color: "#A45EE5",
    },
    "&:hover": {
      background: "agba(0,0,0,.9)",
    },
    "& .MuiTypography-root": {
      fontWeight: 600,
      fontSize: 16,
      color: "#777",
    },
  },
}));

interface ListItemProps {
  link: PageProps;
}

const ListItemLink = ({ link }: ListItemProps) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<NavLinkProps, "to">>((itemProps, ref) => (
        <NavLink to={link.path} ref={ref} {...itemProps} />
      )),
    [link]
  );
  return (
    <ListItem button {...{ component: renderLink }} className={classes.nav}>
      <ListItemText primary={link.name} />
    </ListItem>
  );
};

export default ListItemLink;
