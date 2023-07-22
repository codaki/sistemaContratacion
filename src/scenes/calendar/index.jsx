import { Box, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Formulario = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px" display="flex" flexDirection="column" alignItems="center">
      <Header title="Subir Información" subtitle="Complete el formulario" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{}}
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
            <table>
              <tbody>
                <tr>
                  {/* Hoja de vida formato espe */}
                  <td>
                    <Typography variant="body1">
                      Hoja de vida formato espe:
                    </Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
                <tr>
                  {/* Copia de cédula */}
                  <td>
                    <Typography variant="body1">Copia de cédula:</Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
                <tr>
                  {/* Certificado de votación */}
                  <td>
                    <Typography variant="body1">
                      Certificado de votación:
                    </Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
                <tr>
                  {/* Certificado de registro de título */}
                  <td>
                    <Typography variant="body1">
                      Certificado de registro de título:
                    </Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
                <tr>
                  {/* Experiencia de docente */}
                  <td>
                    <Typography variant="body1">
                      Experiencia de docente:
                    </Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
                <tr>
                  {/* Certificado de no tener impedimento de ejercer cargo público */}
                  <td>
                    <Typography variant="body1">
                      Certificado de no tener impedimento de ejercer cargo público:
                    </Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
                <tr>
                  {/* Certificado de no tener responsabilidades administrativas */}
                  <td>
                    <Typography variant="body1">
                      Certificado de no tener responsabilidades administrativas:
                    </Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
                <tr>
                  {/* Experiencia profesional */}
                  <td>
                    <Typography variant="body1">
                      Experiencia profesional:
                    </Typography>
                  </td>
                  <td>
                    <input type="file" />
                  </td>
                  <td>
                    <Box sx={uploadBoxStyle}></Box>
                  </td>
                </tr>
              </tbody>
            </table>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Confirmar postulación
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const formSchema = yup.object().shape({
  // Add validation for other fields if needed
});

const uploadBoxStyle = {
  width: "40px",
  height: "40px",
  border: "1px solid #ccc",
  backgroundColor: "white",
};

export default Formulario;
