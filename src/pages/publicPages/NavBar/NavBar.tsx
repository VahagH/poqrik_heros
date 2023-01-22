import {
  makeStyles,
  Container,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Badge, List, Box, SwipeableDrawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { privatePages, publicPages } from "../../../router";
import ListItemLink from "../../../components/ListItemLink";
import logo from "../../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Logout from "@mui/icons-material/Logout";
import FadeMenu from "../../../components/FadeMenu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { ProfileContext } from "../../../context/ProfileProvider";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MenuIcon from "@mui/icons-material/Menu";
// import SettingsIcon from "@mui/icons-material/Settings";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 100,
    maxHeight: 100,
    minHeight: 100,
    // background: "#fff",
    background: "#eda7fd",
    boxShadow: "0 0 30px 0 rgb(0 0 0 / 7%)",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(800)]: {
      height: 70,
      maxHeight: 70,
      minHeight: 70,
    },
  },
  container: {
    maxHeight: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 80,
    maxHeight: 80,
    cursor: "pointer",
    [theme.breakpoints.down(800)]: {
      height: 55,
      maxHeight: 55,
    },
  },
  list: {
    display: "flex",
    [theme.breakpoints.down(800)]: {
      display: "none",
    },
  },
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
  drawerIc: {
    "&.MuiIconButton-root": {
      display: "none",
      [theme.breakpoints.down(800)]: {
        display: "block",
      },
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: profileState } = useContext(ProfileContext);
  const isMobile1070 = useMediaQuery(theme.breakpoints.down(1070));
  const isAdmin = profileState?.role === "admin";

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const menuItems = [
    {
      name: "Իմ էջը",
      onClick: () => {
        navigate("/profile");
      },
      icon: <PermIdentityIcon />,
    },
    // {
    //   name: "Կարգավորումներ",
    //   onClick: () => {
    //     navigate("/settings");
    //   },
    //   icon: <SettingsIcon />,
    //   hideAction: (isLogedIn: boolean, role: string) =>
    //     isLogedIn && role === "admin",
    // },
    {
      name: "Տեսականի",
      onClick: () => {
        navigate("/assortment");
      },
      icon: <CheckroomIcon />,
      hideAction: (isLogedIn: boolean, role: string) =>
        isLogedIn && role === "admin",
    },
    {
      name: "Դուրս գալ",
      onClick: () => {
        authDispatch({
          type: "log_out",
          isLogedIn: authState.isAuthenticated,
        });
      },
      icon: <Logout />,
    },
  ];
  const filteredRoutes = [
    ...publicPages.filter((el) => el.navBar),
    ...privatePages.filter(
      (el) =>
        el.navBar &&
        authState.isAuthenticated &&
        el.role?.includes(profileState.role) &&
        profileState.status === "active"
    ),
  ];
  const favLink = {
    name: "Ընտրվածներ",
    path: "/favorites",
    navBar: false,
  };

  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <IconButton
          color="inherit"
          className={classes.drawerIc}
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          style={{ display: isAdmin && isMobile1070 ? "block" : "" }}
        >
          <MenuIcon />
        </IconButton>
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt=""
          className={classes.logo}
        />
        {(isAdmin && isMobile1070) || open ? (
          <Box
            sx={{ width: "auto", display: open ? "block" : "none" }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <SwipeableDrawer
              anchor={"top"}
              open={open}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <List
                style={{
                  margin: "auto",
                }}
              >
                {filteredRoutes.map((el) => (
                  <ListItemLink link={el} key={el.path} />
                ))}
              </List>
            </SwipeableDrawer>
          </Box>
        ) : (
          <List className={classes.list}>
            {filteredRoutes.map((el) => (
              <ListItemLink link={el} key={el.path} />
            ))}
          </List>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            minHeight: 50,
          }}
        >
          <ListItemLink
            link={favLink}
            icon={
              profileState.favorites.length ? (
                <Badge badgeContent={profileState.favorites.length} max={99}>
                  <FavoriteIcon />
                </Badge>
              ) : (
                <FavoriteBorderIcon />
              )
            }
          />
          {authState.isAuthenticated ? (
            <FadeMenu icon={<PersonIcon />} menuItems={menuItems} />
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
