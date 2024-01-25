import LogoutIcon from "@mui/icons-material/Logout"; // You can use the appropriate logout icon
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ColorModeContext, tokens } from "../../theme";
import { deleteCookie } from "./Utils";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    deleteCookie("auth");
    logout();
    navigate("/home");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return user ? (
    <Box
      display="flex"
      justifyContent="right"
      p={2}
      sx={{
        backgroundColor: "#00894b", // Cambiar el color de fondo a amarillo pastel
      }}
    >
      {/* SEARCH BAR */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={handleMenuOpen} sx={{ color: "#FFFFFF" }}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {/* Add other menu items here if needed */}
          <MenuItem onClick={handleMenuClose}>
            <LogoutIcon sx={{ mr: 1 }} />
            <p onClick={handleLogout}>Cerrar Sesión</p>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export default Topbar;
