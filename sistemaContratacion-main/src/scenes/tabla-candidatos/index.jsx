import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsuarioCorreo } from "../../api/auth";
import { editarEstadoSolicitud, infoRecursos } from "../../api/solicitud";
import Header from "../../components/Header";
import Popup from "../../components/Popup";
import { useAuth } from "../../context/AuthContext";
import { mockDataContacts } from "../../data/mockData";
import emailjs from "../../pages/emailjsInit";
import { tokens } from "../../theme";
const Candidatos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  useEffect(() => {
    infoRecursos().then((res) => {
      setSolicitudes(res.data);
      console.log(solicitudes);
    });
  }, []);

  const { user, updateUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const columns = [
    {
      field: "sol_id",
      headerName: "SolicitudID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "cand_id",
      flex: 0.6,
      align: "center",
      headerAlign: "center",
      headerName: "Candidato ID",
    },
    {
      field: "cand_nombre1",
      headerName: "Nombre",
      width: 120,
      headerAlign: "center",
      align: "center",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "cand_apellido1",
      width: 50,
      headerName: "Apellido",
      align: "center",
      headerAlign: "center",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "cand_fecha_nacimiento",
      align: "center",
      headerName: "Fecha de nacimiento",
      type: "date", // Cambiar a type: "date"
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString(); // Formatear la fecha como lo desees
      },
      headerAlign: "center",
      align: "left",
      flex: 0.7,
    },
    {
      field: "cand_num_identificacion",
      align: "center",
      headerAlign: "center",
      headerName: "Número de cédula",
      flex: 0.7,
    },
    {
      field: "cand_correo",
      align: "center",
      headerAlign: "center",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cand_titulo",
      align: "center",
      headerAlign: "center",
      headerName: "Título",
      flex: 0.5,
    },
    {
      field: "cand_sexo",
      headerName: "Sexo",
      headerAlign: "center",
      align: "center",
      flex: 0.4,
    },
    {
      field: "nota_final",
      align: "center",
      headerAlign: "center",
      headerName: "Nota",
      flex: 0.4,
    },
    {
      field: "sol_aprobacion",
      align: "center",
      headerAlign: "center",
      headerName: "Estado",
      flex: 0.5,
      renderCell: (params) => (
        <span>{params.value ? "Aprobado" : "Reprobado"}</span>
      ),
    },

    {
      field: "Status",
      headerName: "Status",
      headerAlign: "center",
      flex: 1.4,
      justifyContent: "center",
      justifyItems: "center",
      renderCell: (params) => {
        const handleAccept = async () => {
          const updatedSolicitudes = solicitudes.map((solicitud) =>
            solicitud.sol_id === params.row.sol_id
              ? { ...solicitud, sol_aprobacion: true }
              : solicitud
          );
          setSolicitudes(updatedSolicitudes);
          editarEstadoSolicitud(params.row.sol_id, true);
          console.log("Aceptar", params.row.cand_id);
          const usuario = await getUsuarioCorreo(params.row.cand_id);
          const usuarioCorreo = usuario.data.correo;
          const usuarioNombre = usuario.data.nombre;
          const usuarioApellido = usuario.data.apellido;

          const templateParams = {
            to_email: usuarioCorreo,
            subject: "Estado Postulación",
            message:
              `Estimado(a) ${usuarioNombre} ${usuarioApellido},\n\n` +
              `Nos complace informarle que ha sido seleccionado para avanzar en el proceso de selección en la Universidad de las Fuerzas Armadas ESPE.\n` +
              `Apreciamos sinceramente su interés en unirse a nuestro equipo y esperamos trabajar con usted en el futuro.\n\n` +
              `Pronto recibirá más detalles sobre los siguientes pasos del proceso.
              .\n\n` +
              `Atentamente,\n\n` +
              `El equipo de Recursos Humanos`,
          };

          if (usuarioCorreo.endsWith("@gmail.com")) {
            emailjs
              .send("SERVICEGMAIL_SBDA", "template_l2kfb7n", templateParams)
              .then(
                (response) => {
                  console.log("Email sent:", response);
                },
                (error) => {
                  console.error("Error sending email:", error);
                }
              );
          } else {
            emailjs
              .send("SERVICEOUTLOOK_SBDA", "template_l2kfb7n", templateParams)
              .then(
                (response) => {
                  console.log("Email sent:", response);
                },
                (error) => {
                  console.error("Error sending email:", error);
                }
              );
          }
          setShowPopup(true);
        };

        const handleReject = async () => {
          const updatedSolicitudes = solicitudes.map((solicitud) =>
            solicitud.sol_id === params.row.sol_id
              ? { ...solicitud, sol_aprobacion: false }
              : solicitud
          );
          setSolicitudes(updatedSolicitudes);
          editarEstadoSolicitud(params.row.sol_id, false);
          console.log("Aceptar", params.row.cand_id);
          const usuario = await getUsuarioCorreo(params.row.cand_id);
          const usuarioCorreo = usuario.data.correo;
          const usuarioNombre = usuario.data.nombre;
          const usuarioApellido = usuario.data.apellido;

          const templateParams = {
            to_email: usuarioCorreo,
            subject: "Estado Postulación",
            message:
              `Estimado(a) ${usuarioNombre} ${usuarioApellido},\n\n` +
              `Lamentamos informarle que, después de una cuidadosa revisión y consideración de todas las solicitudes,\n` +
              `hemos decidido no avanzar con su candidatura en el proceso de selección en la Universidad de las Fuerzas Armadas ESPE.\n\n` +
              `Apreciamos sinceramente su interés en unirse a nuestro equipo y valoramos el tiempo y esfuerzo que invirtió en este proceso.
              .\n\n` +
              `Le deseamos mucho éxito en tus futuros esfuerzos profesionales.
              .\n\n` +
              `Atentamente,\n\n` +
              `El equipo de Recursos Humanos`,
          };

          if (usuarioCorreo.endsWith("@gmail.com")) {
            emailjs
              .send("SERVICEGMAIL_SBDA", "template_l2kfb7n", templateParams)
              .then(
                (response) => {
                  console.log("Email sent:", response);
                },
                (error) => {
                  console.error("Error sending email:", error);
                }
              );
          } else {
            emailjs
              .send("SERVICEOUTLOOK_SBDA", "template_l2kfb7n", templateParams)
              .then(
                (response) => {
                  console.log("Email sent:", response);
                },
                (error) => {
                  console.error("Error sending email:", error);
                }
              );
          }
          setShowPopup(true);
          console.log("Rechazar", params.row.cand_id);
        };
        const handleCalificar = () => {
          console.log("Calificar", params.row.cand_id);
          const updatedUser = { ...user, calificado: params.row.cand_id }; // Agregar el atributo "calificado"
          updateUser(updatedUser);
          console.log("Calificar", params.row.cand_id);
          console.log(user);
          navigate("/tablas-calificacion");
        };

        return (
          <Box display="flex" justifyItems="center">
            <Button
              onClick={handleCalificar}
              variant="contained"
              color="grey"
              size="small"
            >
              Calificar
            </Button>
            <Button
              onClick={handleAccept}
              variant="contained"
              color="success"
              size="small"
            >
              Aceptar
            </Button>
            <Box />
            <Button
              onClick={handleReject}
              variant="contained"
              color="error"
              size="small"
            >
              Rechazar
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="POSTULANTES"
        subtitle="Lista de los postulantes registrados"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#07ab5a",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#07ab5a",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          autoHeight
          width="100%"
          rows={solicitudes}
          columns={columns}
          getRowId={(row) => `${row.sol_id}-${row.cand_id}`}
          components={{ Toolbar: GridToolbar }}
        />
        {showPopup && (
          <Popup
            titulo="¡Su selección ha sido guardada exitosamente!"
            mensaje="Un correo de validación llegara al candidato seleccionado"
            //ruta="/tabla-candidatos" // Ajusta la ruta de redirección que deseas
            onClose={() => setShowPopup(false)} // Función para cerrar el Popup
          />
        )}
      </Box>
    </Box>
  );
};

export default Candidatos;
