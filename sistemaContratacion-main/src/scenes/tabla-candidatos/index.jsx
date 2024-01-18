import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { infoRecursos, editarEstadoSolicitud } from "../../api/solicitud";
import { useAuth } from "../../context/AuthContext";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const Candidatos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([])
  useEffect(() => {
    infoRecursos().then((res) => {
      setSolicitudes(res.data);
      console.log(solicitudes);
    });
  }, []);

  const { user, updateUser } = useAuth(); 

  const columns = [
    { field: "sol_id", headerName: "SolicitudID", flex: 0.5 },
    { field: "cand_id", headerName: "Candidato ID" },
    {
      field: "cand_nombre1",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cand_apellido1",
      headerName: "Apellido",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "cand_fecha_nacimiento",
      headerName: "Fecha de nacimiento",
      type: "date", // Cambiar a type: "date"
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString(); // Formatear la fecha como lo desees
      },
      headerAlign: "left",
      align: "left",
    },
    {
      field: "cand_num_identificacion",
      headerName: "Número de cédula",
      flex: 1,
    },
    {
      field: "cand_correo",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cand_titulo",
      headerName: "Título",
      flex: 1,
    },
    {
      field: "cand_sexo",
      headerName: "Sexo",
      flex: 1,
    },
    {
      field: "nota_final",
      headerName: "Nota",
      flex: 1,
    },
    {
      field: "sol_aprobacion",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => (
        <span>{params.value ? "Aprobado" : "Reprobado"}</span>
      ),
    },
    
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const handleAccept = () => {
          const updatedSolicitudes = solicitudes.map((solicitud) =>
            solicitud.sol_id=== params.row.sol_id
              ? { ...solicitud, sol_aprobacion: true }
              : solicitud
          );
          setSolicitudes(updatedSolicitudes);
          editarEstadoSolicitud(params.row.sol_id, true);
          axios
          .post("http://localhost:8800/send-email-estado", {
            email: params.row.cand_correo,
            
            nombre:params.row.cand_nombre,
            estado:"APROBADA"
            
          })

        };
    
        const handleReject = () => {
          const updatedSolicitudes = solicitudes.map((solicitud) =>
            solicitud.sol_id === params.row.sol_id
              ? { ...solicitud, sol_aprobacion: false }
              : solicitud
          );
          setSolicitudes(updatedSolicitudes);
          editarEstadoSolicitud(params.row.sol_id, false);
          axios
          .post("http://localhost:8800/send-email-estado", {
            email: params.row.cand_correo,
            
            nombre:params.row.cand_nombre,
            estado:"RECHAZADA"
            
          })
          console.log("Rechazar", params.row.cand_id);
        };
        const handleCalificar = () => {
          console.log("Calificar", params.row.cand_id);
          const updatedUser = { ...user, calificado: params.row.cand_id }; // Agregar el atributo "calificado"
    updateUser(updatedUser); // Actualizar el objeto user con el nuevo atributo
    console.log("Calificar", params.row.cand_id);
    console.log(user)
    navigate("/tablas-calificacion");
        };
  
        return (
          <Box display="flex" justifyContent="center">
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
            <Box mx={1} />
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
          rows={solicitudes}
          columns={columns}
          getRowId={(row) => `${row.sol_id}-${row.cand_id}`}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Candidatos;
