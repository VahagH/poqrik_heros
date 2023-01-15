import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "../../context/AuthProvider";
import { ProfileContext } from "../../context/ProfileProvider";

export interface MenuItemProps {
  name: string;
  onClick: () => void;
  icon?: any;
  hideAction?: (isLogedIn: boolean, role: string) => boolean;
}

interface FadeMenuProps {
  icon?: any;
  menuItems: MenuItemProps[];
  disable?: boolean;
}

export default function FadeMenu({
  icon,
  menuItems,
  disable = false,
}: FadeMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { state: authState } = useContext(AuthContext);
  const { state: profileState } = useContext(ProfileContext);

  const filteredItems = menuItems.filter((item: MenuItemProps) =>
    item.hideAction
      ? item.hideAction(authState.isAuthenticated, profileState.role)
      : true
  );
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          width: 35,
          margin: 0,
          padding: 0,
        }}
      >
        <Tooltip title="">
          <IconButton
            onClick={handleClick}
            size="small"
            disabled={disable}
            sx={{ color: "#A45EE5" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {icon && icon}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {filteredItems.map((el: MenuItemProps) => (
          <MenuItem key={el.name} onClick={el.onClick}>
            {el.icon && (
              <ListItemIcon style={{ marginRight: 15 }}>{el.icon}</ListItemIcon>
            )}
            {el.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
