import { makeStyles, Container } from "@material-ui/core";
import { List } from "@mui/material";
import { privatePages, publicPages } from "../../router";
import ListItemLink from "../ListItemLink";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Logout from "@mui/icons-material/Logout";
import FadeMenu from "../FadeMenu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { ProfileContext } from "../../context/ProfileProvider";
import CheckroomIcon from "@mui/icons-material/Checkroom";
// import SettingsIcon from "@mui/icons-material/Settings";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 100,
    maxHeight: 100,
    minHeight: 100,
    background: "#fff",
    boxShadow: "0 0 30px 0 rgb(0 0 0 / 7%)",
    display: "flex",
    alignItems: "center",
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
  },
  list: {
    display: "flex",
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
}));

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: profileState } = useContext(ProfileContext);

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
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt=""
          className={classes.logo}
        />
        <List className={classes.list}>
          {filteredRoutes.map((el) => (
            <ListItemLink link={el} key={el.path} />
          ))}
        </List>
        <div style={{ display: "flex" }}>
          <ListItemLink
            link={favLink}
            icon={
              localStorage.getItem("poqrikHeros_Favorites") ? (
                <FavoriteIcon />
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
