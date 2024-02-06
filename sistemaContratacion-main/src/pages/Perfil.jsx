import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import React, { useState } from "react";
import ChangePasswordPopup from "../components/PopUps/ChangePasswordPopUp";
import { useAuth } from "../context/AuthContext";
import "./CustomComponentInfoPersonal2.css";
import user1 from "../scenes/global/usuario2.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Perfil = () => {
  const [mostrarCambioContraseña, setMostrarCambioContraseña] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const handlePopupToggle = () => {
    setMostrarCambioContraseña(!mostrarCambioContraseña);
  };

  function capitalizeFirstLetter(inputString) {
    if (typeof inputString !== "string") {
      return ""; // Return an empty string for non-string inputs
    }

    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
  console.log(user);

  return (
    <div className="custom-component-postulante">
      <hr className="custom-divider" />
      <div className="flex justify-between items-center p-2">
        <div className="perfil_foto">
          <img
                  alt="foto-de-perfil"
                  width="200vh"
                  height="200vh"
                  src={user1}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              
            <p className="text-tiny uppercase font-bold">
                {isAuthenticated ? (
                  <>
                    {user && user.name1 ? (
                      <div>
                        {user.name1} {user.name2} {user.lastname1}{" "}
                        {user.lastname2}
                      </div>
                    ) : (
                      <li>Loading...</li>
                    )}
                  </>
                ) : null}
              </p>
              <small className="text-default-500">
                {isAuthenticated ? (
                  <>
                    {user && user.email ? (
                      <div>{user.email}</div>
                    ) : (
                      <li>Loading...</li>
                    )}
                  </>
                ) : null}
              </small>
           
        </div>

        <div className="perfil_datos">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableBody>
             
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Tipo de identificacion
                  </TableCell>
                  <TableCell align="right">
                  {isAuthenticated ? (
                <>
                  {user && user.tipoI ? (
                    <div>{capitalizeFirstLetter(user.tipoI)}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  Numero de identificacion
                  </TableCell>
                  <TableCell align="right">
                  {isAuthenticated ? (
                <>
                  {user && user.identificacion ? (
                    <div>{user.identificacion}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
                  </TableCell>
                </TableRow>
              <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  Titulo con el que postula
                  </TableCell>
                  <TableCell align="right">
                  {isAuthenticated ? (
                <>
                  {user && user.titulo ? (
                    <div>{user.titulo}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  Fecha de nacimiento
                  </TableCell>
                  <TableCell align="right">
                  {isAuthenticated ? (
                <>
                  {user && user.fecha ? (
                    <div>{user.fecha}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
                  </TableCell>
                </TableRow>
                
            </TableBody>
          </Table>
    </TableContainer>
          <button className="password-button" onClick={handlePopupToggle}>
            Cambiar contraseña
          </button> 
          {/* <div className="flex w-full gap-3">
            <Chip color="success" variant="dot">
              Tipo de identificacion:{" "}
            </Chip>
            <p>
              {isAuthenticated ? (
                <>
                  {user && user.tipoI ? (
                    <div>{capitalizeFirstLetter(user.tipoI)}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
            </p>
          </div>

          <div className="flex w-full gap-3">
            <Chip color="success" variant="dot">
              Numero de identificacion:{" "}
            </Chip>
            <p>
              {isAuthenticated ? (
                <>
                  {user && user.identificacion ? (
                    <div>{user.identificacion}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
            </p>
          </div>

          <div className="flex w-full gap-3">
            <Chip color="success" variant="dot">
              Titulo con el que postula{" "}
            </Chip>
            <p>
              {isAuthenticated ? (
                <>
                  {user && user.titulo ? (
                    <div>{user.titulo}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
            </p>
          </div>

          <div className="flex w-full gap-3">
            <Chip color="success" variant="dot">
              Fecha de nacimiento{" "}
            </Chip>
            <p>
              {isAuthenticated ? (
                <>
                  {user && user.fecha ? (
                    <div>{user.fecha}</div>
                  ) : (
                    <li>Loading...</li>
                  )}
                </>
              ) : null}
            </p>
          </div>

          <button className="password-button" onClick={handlePopupToggle}>
            Cambiar contraseña
          </button> */}
        </div>
      </div>

      {mostrarCambioContraseña && (
        <ChangePasswordPopup onClose={handlePopupToggle} />
      )}
    </div>
  );
};

export default Perfil;
