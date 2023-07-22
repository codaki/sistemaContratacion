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
import CardMedia from "@mui/material/CardMedia";
import Header from "../../components/Header";

const FAQ = () => {
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const documentOptions = ["Opcion 1", "Opcion 2"];
  const contractOptions = ["Opcion 1", "Opcion 2"];
  const academicOptions = ["Opcion 1", "Opcion 2"];

  return (
    <Box m="20px">
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

              <Box display="flex" justifyContent="center">
                <Button type="submit" color="primary" variant="contained">
                  Enviar
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

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

export default FAQ;
