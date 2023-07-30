import React from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

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
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const documentOptions = ["Opcion 1", "Opcion 2"];
  const contractOptions = ["Opcion 1", "Opcion 2"];
  const academicOptions = ["Opcion 1", "Opcion 2"];

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
        <Button variant="outlined" onClick={handleClickOpen}>
          Confirmar
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Verifique los datos solo puede postular una vez por concurso, verifique los datos antes de enviar.
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <TableContainer component={Paper}>
                <Table sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <TableRow sx={{ textAlign: 'left', width: '100%' }}>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'left' }}>Tipo de Personal</TableCell>
                    <TableCell >Personal académico que desarrolla actividades de tercer nivel de grado y cuarto nivel</TableCell>
                  </TableRow>
                  <TableRow sx={{ textAlign: 'left', width: '100%' }}>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'left' }}>Tipo de Contratación</TableCell>
                    <TableCell >TÉCNICO DE INVESTIGACIÓN NIVEL 1</TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Validar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <Box m="5vh" pt="0vh">
      <Header title="Formato de Documentos" subtitle="Complete el formulario" />

      <Formik
        onSubmit={handleFormSubmit}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="postulation"
                  error={!!touched.postulation && !!errors.postulation}
                >
                  {documentOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="contratacion"
                  error={!!touched.contratacion && !!errors.contratacion}
                >
                  {contractOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="personalAcademico"
                  error={
                    !!touched.personalAcademico && !!errors.personalAcademico
                  }
                >
                  {academicOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box display="flex" justify-content="space-between" gap>
                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        justify-content="center"
                      >
                        Vacantes
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Vacantes"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tiempo
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Tiempo"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Campo Amplio
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Campo Amplio"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Campo Específico
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Campo Específico"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Sede
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Sede"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Departamento
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Departamento"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>

              <Box display="flex" justify-content="space-between" gap>
                <Card sx={{ maxWidth: 220, backgroundColor: grey[300]}}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        Actividad Docencia
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 220, backgroundColor: grey[300] }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Actividad Investigación
                      </Typography>
  
                    </CardContent>
                  </CardActionArea>
                </Card>

                <Card sx={{ maxWidth: 220, backgroundColor: grey[300] }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" >
                        Actividad Vinculación
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>

              {/* Include the PopUpPostulacion component here */}
              <PopUpPostulacion />

              <Box display="flex" justifyContent="center" sx={{ backgroundColor: "success" }}>
                <PopUpPostulacion type="submit" color="primary" variant="contained">
                  Enviar
                </PopUpPostulacion>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormularioPostulacion;
