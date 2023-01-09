import { makeStyles } from "@material-ui/core";
import { forwardRef, useMemo } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { NavLink, NavLinkProps } from "react-router-dom";
import { PageProps } from "../../support/types";

const useStyles = makeStyles((theme) => ({
  nav: {
    width: "max-content",
    marginLeft: 5,
    borderRadius: 20,
    "&.active .MuiTypography-root, &.active": {
      color: theme.palette.secondary.main,
    },
    "&:active": {
      color: theme.palette.secondary.main,
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
  icon?: any;
}

const ListItemLink = ({ link, icon }: ListItemProps) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<NavLinkProps, "to">>((itemProps, ref) => (
        <NavLink to={link.path} ref={ref} {...itemProps} />
      )),
    [link]
  );
  return (
    <ListItem
      button
      {...{ component: renderLink }}
      className={classes.nav}
      disabled={link.disable}
    >
      {icon ? icon : <ListItemText primary={link.name} />}
    </ListItem>
  );
};

export default ListItemLink;
