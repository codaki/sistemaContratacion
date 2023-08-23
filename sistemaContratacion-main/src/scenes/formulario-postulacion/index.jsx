import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import { useAuth } from "../../context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  TableHead,
} from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";
import {
  actividadUnica,
  departamentoUnico,
  obtenerOferta,
  personalUnico,
  postulacionUnica,
} from "../../api/oferta";
import { contratacionUnica } from "../../api/oferta";
import { sedeUnica } from "../../api/oferta";
import { campoAmplioUnico } from "../../api/oferta";
import { campoEspecificoUnico } from "../../api/oferta";
import { crearSolicitud } from "../../api/solicitud";
const formSchema = yup.object().shape({
  postulation: yup.string().required("Campo requerido"),
  contratacion: yup.string().required("Campo requerido"),
  personalAcademico: yup.string().required("Campo requerido"),
  textoVacio: yup.string().required("Campo requerido"),
});

const initialValues = {
  postulation: "",
  contratacion: "",
  personalAcademico: "",
  textoVacio: "",
};

const FormularioPostulacion = () => {
  const [postulacion, setPostulacion] = useState([]);
  const [contratacion, setContratacion] = useState([]);
  const [personalAcademico, setPersonalAcademico] = useState([]);
  const [campoEspecifico, setCampoEspecifico] = useState([]);
  const [campoAmplio, setCampoAmplio] = useState([]);
  const [departamento, setDepartamento] = useState([]);
  const [sede, setSede] = useState([]);
  const [actividad, setActividad] = useState([]);
  const [oferta, setOferta] = useState([]);

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const arregloDeDatos = [];
  const [seleccionados, setSeleccionados] = useState({
    postulation: "",
    contratacion: "",
    personalAcademico: "",
    campoEspecifico: "",
    campoAmplio: "",
    departamento: "",
    sede: "",
    actividad: "",
  });
  const { user } = useAuth();
  const handleSolicitud = ()=>{
    const solicitud = {
      cand_id: user.id,
      rh_id: 1,
      sol_aprobacion: "false",
      nota_final: 0,
      ofe_id: oferta.ofe_id
    };
    crearSolicitud(solicitud);
  }
  // Función para manejar el clic en el botón "Enviar"
  const handleEnviarClick = (values) => {
    // Obtener los valores seleccionados del objeto 'values'
    const {
      postulation,
      contratacion,
      personalAcademico,
      campoEspecifico,
      campoAmplio,
      departamento,
      sede,
      actividad,
    } = values;

    // Guardar los valores seleccionados en el estado 'seleccionados'
    setSeleccionados({
      postulation,
      contratacion,
      personalAcademico,
      campoEspecifico,
      campoAmplio,
      departamento,
      sede,
      actividad,
    });
  };

  function PaperComponent(props) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const PopUpPostulacion = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            style={{
              color: "#fff",
              borderColor: "#4CAF50",
              backgroundColor: "#4CAF50",
            }}
          >
            Confirmar
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Verifique los datos solo puede postular una vez por concurso,
            verifique los datos antes de enviar.
          </DialogTitle>
          {/* Comienza la tabla 
          <DialogContent>
            <DialogContentText>
              <TableContainer component={Paper}>
                <Table
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Postulación
                    </TableCell>
                    <TableCell>{seleccionados.postulation}</TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Tipo de Contratación
                    </TableCell>
                    <TableCell>
                      Personal académico que desarrolla actividades de tercer
                      nivel de grado y cuarto nivel
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Campo Específico
                    </TableCell>
                    <TableCell>Base de Datos</TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Campo Amplio
                    </TableCell>
                    <TableCell>seleccionados.postulacion</TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Sede
                    </TableCell>
                    <TableCell>Matriz</TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Tipo de Departamento
                    </TableCell>
                    <TableCell>Departamento de Ciencias Exactas</TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Tipo de Personal Académico
                    </TableCell>
                    <TableCell>Auxiliar Nivel 1</TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: "left", width: "100%" }}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                      Actividad
                    </TableCell>
                    <TableCell>Docencia</TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </DialogContentText>
          </DialogContent>
          */}
          <DialogActions>
            <Button onClick={() => { handleClose(); handleSolicitud()}}>Validar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  const [actividadSelected, setActividadSelected] = useState(false);
  useEffect(() => {
    const PedirPosutlacion = async () => {
      try {
        const res = await postulacionUnica();
        setPostulacion(res.data);
        const res1 = await obtenerOferta(
          selectedPostId,
          selectedConId,
          selectedSedeId,
          selectedDeptId,
          selectedCampAId,
          selectedCampEId,
          selectedPerosonalAId,
          selectedActividadId
        );

        console.log(res1.data);
        console.log(user)
        arregloDeDatos.push({
          ofe_id: res1.data.ofe_id,
          ofe_vacantes: res1.data.ofe_vacantes,
          ofe_horas: res1.data.ofe_horas,
        });
      } catch (error) {
        console.log(error);
      }
    };
    PedirPosutlacion();
  }, [oferta]);

  const [postulacion1Selected, setPostulacion1Selected] = useState(false);
  const [postulacion2Selected, setPostulacion2Selected] = useState(false);
  const [postulacion3Selected, setPostulacion3Selected] = useState(false);
  const [postulacion4Selected, setPostulacion4Selected] = useState(false);
  const [postulacion5Selected, setPostulacion5Selected] = useState(false);
  const [postulacion6Selected, setPostulacion6Selected] = useState(false);
  const [postulacion7Selected, setPostulacion7Selected] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedConId, setSelectedConId] = useState(null);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [selectedSedeId, setSelectedSedeId] = useState(null);
  const [selectedCampAId, setSelectedCampAId] = useState(null);
  const [selectedCampEId, setSelectedCampEId] = useState(null);
  const [selectedPerosonalAId, setSelectedPerosonalAId] = useState(null);
  const [selectedActividadId, setSelectedActividadId] = useState(null);

  const [selectedOferta, setSelectedOferta] = useState(null);
  return (
    <Box m="5vh" pt="0vh">
      <Header title="Formato de Documentos" subtitle="Complete el formulario" />

      <Formik
        onSubmit={(values) => {
          // Al hacer clic en Enviar, llamamos a handleEnviarClick para guardar los valores seleccionados
          handleEnviarClick(values);
          console.log(values)
          // Luego, llamamos a handleFormSubmit para procesar el formulario si es necesario
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={formSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Postulación:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.postulation}
                  onChange={async (event) => {
                    handleChange(event);

                    const selectedOption = postulacion.find(
                      (option) => option.post_periodo === event.target.value
                    );
                    if (selectedOption) {
                      setPostulacion1Selected(true);

                      const selectedPostId1 = selectedOption.post_id;

                      try {
                        const contra = await contratacionUnica(selectedPostId1);
                        setContratacion(contra.data);
                        console.log(contratacion); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedPostId(selectedPostId1);
                        console.log(selectedPostId);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  name="postulation"
                  error={!!touched.postulation && !!errors.postulation}
                >
                  {postulacion.length > 0 ? (
                    postulacion.map((option) => (
                      <MenuItem
                        key={option.post_id}
                        value={option.post_periodo}
                      >
                        {option.post_periodo}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando opciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Tipo de Contratación:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.contratacion}
                  onChange={async (event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    const selectedOption = contratacion.find(
                      (option) => option.con_nombre === event.target.value
                    );
                    if (selectedOption) {
                      setPostulacion2Selected(true);

                      const selectedPostId1 = selectedOption.con_id;

                      try {
                        const contra = await sedeUnica(
                          selectedPostId,
                          selectedPostId1
                        );
                        setSede(contra.data);
                        console.log(sede); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedConId(selectedPostId1);
                        console.log(selectedPostId);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    } // Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="contratacion"
                  error={!!touched.contratacion && !!errors.contratacion}
                  disabled={!postulacion1Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {contratacion.length > 0 ? (
                    contratacion.map((option) => (
                      <MenuItem key={option.con_id} value={option.con_nombre}>
                        {option.con_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando opciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Sede:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.sede}
                  onChange={async (event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    const selectedOption = sede.find(
                      (option) => option.sede_nombre === event.target.value
                    );
                    if (selectedOption) {
                      setPostulacion3Selected(true);

                      const selectedPostId1 = selectedOption.sede_id;
                      console.log(selectedPostId1);
                      try {
                        const departamento1 = await departamentoUnico(
                          selectedPostId,
                          selectedConId,
                          selectedPostId1
                        );
                        setDepartamento(departamento1.data);
                        console.log(departamento); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedSedeId(selectedPostId1);
                        console.log(selectedSedeId);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    } // Set the variable to true when the MenuItem 1 is selected// Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="sede"
                  error={!!touched.sede && !!errors.sede}
                  disabled={!postulacion2Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {sede.length > 0 ? (
                    sede.map((option) => (
                      <MenuItem key={option.sede_id} value={option.sede_nombre}>
                        {option.sede_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Departamento:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.departamento}
                  onChange={async (event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    const selectedOption = departamento.find(
                      (option) => option.dept_nombre === event.target.value
                    );
                    if (selectedOption) {
                      setPostulacion4Selected(true);

                      const selectedPostId1 = selectedOption.dept_id;

                      try {
                        const campoAmplio = await campoAmplioUnico(
                          selectedPostId,
                          selectedConId,
                          selectedSedeId,
                          selectedPostId1
                        );
                        setCampoAmplio(campoAmplio.data);
                        console.log(departamento); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedDeptId(selectedPostId1);
                        console.log(selectedDeptId);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  name="departamento"
                  error={!!touched.departamento && !!errors.departamento}
                  disabled={!postulacion3Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {departamento.length > 0 ? (
                    departamento.map((option) => (
                      <MenuItem key={option.dept_id} value={option.dept_nombre}>
                        {option.dept_nombre + " - " + option.dept_descripcion}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Campo Amplio:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.campoAmplio}
                  onChange={async (event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    const selectedOption = campoAmplio.find(
                      (option) => option.ca_nombre === event.target.value
                    );
                    if (selectedOption) {
                      setPostulacion5Selected(true);

                      const selectedPostId1 = selectedOption.ca_id;

                      try {
                        const campoEspecifico = await campoEspecificoUnico(
                          selectedPostId,
                          selectedConId,
                          selectedSedeId,
                          selectedDeptId,
                          selectedPostId1
                        );
                        setCampoEspecifico(campoEspecifico.data);
                        console.log(campoEspecifico); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedCampAId(selectedPostId1);
                        console.log(selectedDeptId);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  name="campoAmplio"
                  error={!!touched.campoAmplio && !!errors.campoAmplio}
                  disabled={!postulacion4Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {campoAmplio.length > 0 ? (
                    campoAmplio.map((option) => (
                      <MenuItem key={option.ca_id} value={option.ca_nombre}>
                        {option.ca_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Campo Específico:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.campoEspecifico}
                  onChange={async (event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    const selectedOption = campoEspecifico.find(
                      (option) => option.ce_nombre === event.target.value
                    );
                    if (selectedOption) {
                      setPostulacion6Selected(true);

                      const selectedPostId1 = selectedOption.ce_id;

                      try {
                        const personalAcademico1 = await personalUnico(
                          selectedPostId,
                          selectedConId,
                          selectedSedeId,
                          selectedDeptId,
                          selectedCampAId,
                          selectedPostId1
                        );
                        setPersonalAcademico(personalAcademico1.data);
                        console.log(personalAcademico); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedCampEId(selectedPostId1);
                        console.log(selectedDeptId);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  name="personalAcademico"
                  error={!!touched.campoEspecifico && !!errors.campoEspecifico}
                  disabled={!postulacion5Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {campoEspecifico.length > 0 ? (
                    campoEspecifico.map((option) => (
                      <MenuItem key={option.ce_id} value={option.ce_nombre}>
                        {option.ce_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando campo estpecífico...</MenuItem>
                  )}
                </Select>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Tipo de Personal Académico:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.personalAcademico}
                  onChange={async (event) => {
                    handleChange(event);
                    const selectedOption = personalAcademico.find(
                      (option) => option.pa_nombre === event.target.value
                    );
                    if (selectedOption) {
                      setPostulacion7Selected(true);

                      const selectedPostId1 = selectedOption.pa_id;

                      try {
                        const actividad1 = await actividadUnica(
                          selectedPostId,
                          selectedConId,
                          selectedSedeId,
                          selectedDeptId,
                          selectedCampAId,
                          selectedCampEId,
                          selectedPostId1
                        );
                        setActividad(actividad1.data);
                        console.log(personalAcademico); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedPerosonalAId(selectedPostId1);
                        console.log(selectedDeptId);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  name="personalAcademico"
                  error={
                    !!touched.personalAcademico && !!errors.personalAcademico
                  }
                  disabled={!postulacion6Selected}
                >
                  {personalAcademico.length > 0 ? (
                    personalAcademico.map((option) => (
                      <MenuItem key={option.pa_id} value={option.pa_nombre}>
                        {option.pa_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Actividad:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.actividad}
                  onChange={async (event) => {
                    handleChange(event);
                    const selectedOption = actividad.find(
                      (option) => option.act_nombre === event.target.value
                    );
                    if (selectedOption) {
                      setActividadSelected(true);

                      const selectedPostId1 = selectedOption.act_id;

                      try {
                        const actividad1 = await obtenerOferta(
                          selectedPostId,
                          selectedConId,
                          selectedSedeId,
                          selectedDeptId,
                          selectedCampAId,
                          selectedCampEId,
                          selectedPerosonalAId,
                          selectedPostId1
                        );
                        setOferta(actividad1.data);
                        console.log(oferta); // Esto debería imprimir los datos de "data" en la consola
                        setSelectedActividadId(selectedPostId1);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  name="actividad"
                  error={!!touched.actividad && !!errors.actividad}
                  disabled={!postulacion7Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {actividad.length > 0 ? (
                    actividad.map((option) => (
                      <MenuItem key={option.act_id} value={option.act_nombre}>
                        {option.act_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando actividades...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box display="flex" justify-content="space-between" gap></Box>

              {/* Include the PopUpPostulacion component here */}
              <PopUpPostulacion />
              {actividadSelected && (
                <TableContainer component={Paper} sx={{ width: "70%", margin: "0 auto" }}>
                <Table
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <TableHead sx={{ alignItems: "center", backgroundColor: "green" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                        Vacantes
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                        Tiempo
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                        Horas
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{oferta.ofe_vacantes}</TableCell>
                      <TableCell>{oferta.ofe_id}</TableCell>
                      <TableCell>{oferta.ofe_horas}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              )}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormularioPostulacion;
