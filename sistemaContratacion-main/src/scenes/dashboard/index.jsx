import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useEffect, useState } from "react";
import { aprobacionSolicitud } from "../../api/solicitud";
import { useAuth } from "../../context/AuthContext";
import { tokens } from "../../theme";
import Excel from "./excel.jpeg";
import Pdf from "./pdf.png";
import persona from "./persona.svg";
import Word from "./word.png";
const Dashboard = () => {
  const { user, updateUser } = useAuth();
  const theme = useTheme();
  console.log(user.role);
  if (user.role === "admin") {
    window.location.href = "/tabla-candidatos";
  }
  const colors = tokens(theme.palette.mode);
  let result = null;
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

  const [open, setOpen] = useState(false);

  const [button1Color, setButton1Color] = useState("primary");
  const [button2Color, setButton2Color] = useState("primary");

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setButton1Color(button1Color === "primary" ? "secondary" : "primary");
    } else if (buttonNumber === 2) {
      setButton2Color(button2Color === "primary" ? "secondary" : "primary");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const boxStyle = {
    display: "inline-flex",
    flexDirection: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
  };

  const linkStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    color: "#000",
  };

  const BotonesAprobacion = ({ isGreen }) => {
    return (
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Stack direction="row" spacing={1}>
          <Chip
            label="Seleccionar Postulación"
            color={isGreen ? "success" : "default"}
          />
          <Chip
            label="Subir Información"
            color={isGreen ? "success" : "default"}
          />
        </Stack>
      </Box>
    );
  };

  const Status = ({ approvalStatus }) => {
    const [value, setValue] = useState(approvalStatus);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      // Fetch and update the approval status when the component mounts
      const fetchApprovalStatus = async () => {
        result = await aprobacionSolicitud(user ? user.id : user.cand_id);
        console.log(result);
      };
      fetchApprovalStatus();
    }, []);

    const getStatusColor = () => {
      if (value === "one") {
        return { textColor: "success.main", bgColor: "success.light" }; // Verde para aprobado
      } else if (value === "two") {
        return { textColor: "error.main", bgColor: "error.light" }; // Rojo para desaprobado
      }
      return { textColor: "text.primary", bgColor: "background.paper" }; // Colores por defecto
    };

    const statusColor = getStatusColor();

    return (
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          textColor={statusColor.textColor}
          indicatorColor={statusColor.textColor}
          aria-label="secondary tabs example"
        >
          <Tab
            value="one"
            label="Aprobado"
            sx={{
              backgroundColor:
                value === "one" ? statusColor.bgColor : "transparent",
            }}
            enabled={result === "true"}
          />
          <Tab
            value="two"
            label="Desaprobado"
            sx={{
              backgroundColor:
                value === "two" ? statusColor.bgColor : "transparent",
            }}
            enabled={result === "false"}
          />
        </Tabs>
      </Box>
    );
  };

  return (
    <Box sx={{ backgroundColor: "#fcfcfc", minHeight: "80vh" }}>
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
              }}
            >
              Bienvenidos a la plataforma ESPE DOCENTES
            </Typography>
            {/* <Status/> */}
            <Title variant="h1">
              !Revisa el formato de los documentos que tienes que entregar!
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 2 }}
            >
              Para mayor información sobre los documentos dale click al botón
            </Typography>
            <Box
              sx={{
                justifyContent: "space-between",
              }}
            >
              {/* Active Button */}
              Estado de los procesos:
              <Button
                style={{ marginLeft: "20px" }}
                variant="contained"
                color={user && !user.documentos ? "error" : "success"}
                disabled={false}
                onClick={() => handleButtonClick(1)}
              >
                Documentos
              </Button>
              {/* Inactive Button */}
              <Button
                style={{ marginLeft: "20px" }}
                variant="contained"
                color={user && !user.postulacion ? "error" : "success"}
                disabled={false}
                onClick={() => handleButtonClick(2)}
              >
                Postulación
              </Button>
            </Box>
            <Box alignContent={"center"}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>

              <Box
                padding={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box style={boxStyle}>
                  <Link
                    href="https://docs.google.com/spreadsheets/d/1BI8Nsc6NLHcvn3YTrSsiDUijB6tlqvAZ/edit?usp=sharing&ouid=110804931965251293168&rtpof=true&sd=true"
                    target="_blank"
                    rel="noopener"
                    style={linkStyle}
                  >
                    <img
                      src={Excel}
                      alt="formato excel hoja de vida"
                      width={60}
                    />
                    <span>HOJA DE VIDA FORMATO ESPE</span>
                  </Link>
                </Box>
              </Box>
              <Box
                padding={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box style={boxStyle}>
                  <Link
                    href="https://drive.google.com/drive/folders/1SVSiyfRVn_bSfRZN4n5-nl5QAhoLa0ea?usp=sharing"
                    target="_blank"
                    rel="noopener"
                    style={linkStyle}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={Pdf} alt="formato certificado pdf" width={60} />
                      <img
                        src={Word}
                        alt="formato certificado word"
                        width={60}
                      />
                    </div>
                    <span>CERTIFICADOS EXPERIENCIA PROFESIONAL DOCENTE</span>
                  </Link>
                </Box>
              </Box>
              <Box
                pt={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box style={boxStyle}>
                  <Link
                    href="https://drive.google.com/drive/folders/1VPXTLAUtw2EmKRxKYUT-tPz2RxdD69Np?usp=drive_link"
                    target="_blank"
                    rel="noopener"
                    style={linkStyle}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={Pdf} alt="formato certificado pdf" width={60} />
                      <img
                        src={Word}
                        alt="formato certificado word"
                        width={60}
                      />
                    </div>
                    <span>CERTIFICADOS EXPERIENCIA PROFESIONAL</span>
                  </Link>
                </Box>
              </Box>
            </Box>
            <br />

            <br />
          </Box>
          <Box
            m={1}
            fontSize="30px"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center" // Center vertically
            alignItems="center" // Center horizontally
          >
            <img
              src={persona}
              alt="Persona"
              style={{ width: "100%", height: "auto", maxWidth: "400px" }} // Adjust the width and maxWidth as needed
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Dashboard;
