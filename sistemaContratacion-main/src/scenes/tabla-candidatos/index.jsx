import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { infoRecursos } from "../../api/solicitud";
const Candidatos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [solicitudes, setSolicitudes] = useState([])
  useEffect(() => {
    infoRecursos().then((res) => {
      setSolicitudes(res.data);
      console.log(solicitudes);
    });
  }, []);

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
      renderCell: (params) => (
        <span>{params.value ? "Aprobado" : "Reprobado"}</span>
      ),
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
          // Lógica para aceptar aquí, por ejemplo, actualizar el estado del registro
          console.log("Aceptar", params.row.cand_id);
        };
  
        const handleReject = () => {
          // Lógica para rechazar aquí, por ejemplo, actualizar el estado del registro
          console.log("Rechazar", params.row.cand_id);
        };
  
        return (
          <Box display="flex" justifyContent="center">
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
