import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import RecentActorsRoundedIcon from "@mui/icons-material/RecentActorsRounded";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, ProSidebar, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { tokens } from "../../theme";
import user1 from "./usuario2.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "white",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const userRole = user ? user.role : "";
  const collapsedWidth = "80px";
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      sx={{
        height: "140vh",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#4cceac",
          borderRadius: "4px",
        },
        "& .pro-sidebar-inner": {
          background: `#006935 !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#4cceac !important",
        },
        "& .pro-menu-item.active": {
          color: "#78edcf !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ zIndex: 1000 }}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[900],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[900]}>
                  Contratación
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: "white" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="foto-de-perfil"
                  width="100px"
                  height="100px"
                  src={user1}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[900]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.cand_nombre1 || "Nombre"}{" "}
                  {user?.cand_apellido1 || "Apellido"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userRole === "admin" ? "Recursos Humanos" : "Postulante"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Inicio"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Conditional rendering based on 'isCollapsed' */}
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[900]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Postulación
              </Typography>
            )}

            {userRole === "candidato" && (
              <>
                <Item
                  title="Seleccionar Postulación"
                  to="/seleccionar-postulacion"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Subir Información"
                  to="/subir-informacion"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
            {userRole === "admin" && (
              <>
                <Item
                  title="Tabla Candidatos"
                  to="/tabla-candidatos"
                  icon={<RecentActorsRoundedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Calificaciones"
                  to="/tablas-calificacion"
                  icon={<RecentActorsRoundedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Oferta"
                  to="/formulario-oferta"
                  icon={<AppRegistrationIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <SubMenu
                  title="Formularios"
                  icon={<AppRegistrationIcon />}
                  style={{
                    color: colors.grey[900],
                  }}
                >
                  <Item
                    title="Formulario Periodo"
                    to="/formulario-periodo"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Tipo de Contratacion"
                    to="/formulario-contratacion"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Campo especifico"
                    to="/formulario-cespecifico"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Campo Amplio"
                    to="/formulario-camplio"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Sede"
                    to="/formulario-sede"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Departamento"
                    to="/formulario-departamento"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Personal Academico"
                    to="/formulario-pacademico"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Actividad"
                    to="/formulario-actividad"
                    icon={<AppRegistrationIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
