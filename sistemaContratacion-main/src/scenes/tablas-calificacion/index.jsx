import React from "react";
import Box from "@mui/material/Box";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Header from "../../components/Header";


import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const FormacionComponent = () => {
  return <div>Contenido de Formación</div>;
};

export const DocenciaComponent = () => {
  return <div>Contenido de Docencia</div>;
};

export const ProduccionComponent = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table style={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7} align="center">
                <span>AUXILIAR NIVEL 1 DE PERSONAL ACADEMICO QUE DESARROLLA ACTIVIDADES  DE TERCER NIVEL DE GRADO Y CUARTO NIVEL</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD</TableCell>
              <TableCell>ITEM</TableCell>
              <TableCell>REQUISITOS</TableCell>
              <TableCell>TITULOS/EXPERIENCIA/CURSOS/OTROS</TableCell>
              <TableCell>DETALLE/TIEMPO</TableCell>
              <TableCell colSpan={2}>PUNTAJE</TableCell>
              <TableCell>OBSERVACIONES</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell rowSpan={4}></TableCell>
              <TableCell>Mínimo Obligatorio</TableCell>
              <TableCell>Máximo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            <TableRow>
              <TableCell rowSpan={4}>4</TableCell>
              <TableCell rowSpan={4}>Item 1</TableCell>
              <TableCell rowSpan={4}>Requisitos 1</TableCell>
              <TableCell rowSpan={4}>Títulos/Experiencia/Cursos/Otros 1</TableCell>
              <TableCell rowSpan={4}>Detalle/Tiempo 1</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell rowSpan={4}>Observaciones 1</TableCell>
            </TableRow>


            <TableRow>
              
              <TableCell align="right" rowSpan={4}>Total</TableCell>

                 
            </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProduccionComponent;

export const ExperienciaComponent = () => {
  return <div>Contenido de Experiencia Laboral</div>;
};

const steps = [
  "Formación",
  "Docencia",
  "Producción académica",
  "Experiencia profesional",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormacionComponent />;
    case 1:
      return <DocenciaComponent />;
    case 2:
      return <ProduccionComponent />;
    case 3:
      return <ExperienciaComponent />;
    default:
      throw new Error("Unknown step");
  }
}

export const Calificaciones = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Header
            title="Calificaciones"
            subtitle="Calificaciones de los postulantes"
          />
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Calificación
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Gracias por Calificar.
              </Typography>
              <Typography variant="subtitle1">
                Su calificación ha sido registrada.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Atrás
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1
                    ? "Confirmar Calificación"
                    : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
};