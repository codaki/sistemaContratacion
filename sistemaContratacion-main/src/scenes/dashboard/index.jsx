import { Box, Typography, useTheme, Grid, Button, Container, } from "@mui/material";
import { tokens } from "../../theme";
import styled from "@emotion/styled";
import heroImg from "./portada1.png";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#caf7dc", minHeight: "80vh" }}>
    <Container>
      <CustomBox>
        <Box sx={{ flex: "1" }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              color: "#687690",
              fontWeight: "500",
              mt: 10,
              mb: 4,
            }}
          >
            Bienvenidos a la plataforma ESPE DOCENTES
          </Typography>
          <Title variant="h1">
            !Revisa el formato de los documentos que tienes que entregar!
          </Title>
          <Typography
            variant="body2"
            sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
          >
          Para mayor información dale click al botón
          </Typography>
          <Button variant="contained" color="primary" sx={{ flexGrow: 1 }}>
              Botón 1
            </Button>
        </Box>
        <Box
            bgcolor="#f1f1f1"
            m={1}
            p="30vh"
            fontSize="30px"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{ flex: "0.3",               
            backgroundImage: `url(https://uec-el.espe.edu.ec/wp-content/uploads/2018/11/espe-banner-estudiantes.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "-40vh 0",
            backgroundRepeat: "no-repeat", }}>
            <Button variant="contained" color="primary" sx={{ flexGrow: 1 }}>
              Botón 1
            </Button>
            <Button variant="contained" color="secondary" sx={{ flexGrow: 1 }}>
              Botón 2
            </Button>
            <Button variant="contained" color="secondary" sx={{ flexGrow: 1 }}>
              Botón 3
            </Button>
          </Box>
    
      </CustomBox>
    </Container>
  </Box>
  );
};

export default Dashboard;
