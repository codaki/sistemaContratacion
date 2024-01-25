import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Dialog,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { PDFDocument } from "pdf-lib";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { subirInformacion } from "../../api/informacion";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Formulario = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pageCounts, setPageCounts] = useState({}); // Object to store page counts
  const [openPreview, setOpenPreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Add this state variable
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      setIsUploading(true);
      const files = [
        "resume",
        "cedula",
        "votingCert",
        "titleCert",
        "teacherExp",
        "teacherPublicImpediment",
        "administrativeResponsabilities",
        "profesionalExp",
      ];
      console.log("docs");
      console.log("files" + user.name1);
      const idPostulation = user.id;

      for (const id of files) {
        const file = values[id];
        if (file) {
          const formData = new FormData();
          formData.append("idPostulation", idPostulation);
          formData.append("file", file);
          formData.append("idDocument", id);
          formData.append("filename", file.name);

          const uploadResult = await subirInformacion(formData);
          if (uploadResult) {
            console.log(`Archivo ${id} subido con éxito`);
          } else {
            console.error(`Error al subir el archivo ${id}`);
          }
        }
      }
      window.location.href = "/";

      setTimeout(() => {
        setIsUploading(false);
        setAlertOpen(true);

        // Redirect the user to the desired route after 3 seconds
        setTimeout(() => {
          navigate("/"); // Replace "/ruta-de-destino" with the desired route
        }, 2000);
      }, 2000);
    } catch (error) {
      console.log("Error uploading files:", error);
      setIsUploading(false);
    }
  };

  const handleFileChange = (id, setFieldValue) => (event) => {
    const file = event.target.files[0];
    setFieldValue(id, file);

    if (file && file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onload = async () => {
        const arrayBuffer = reader.result;

        // Guardar el Blob en lugar del ArrayBuffer en el estado
        const blob = new Blob([new Uint8Array(arrayBuffer)]);
        setFieldValue(id + "Blob", blob);

        try {
          const pdf = await PDFDocument.load(arrayBuffer);
          const pageCount = pdf.getPages().length;

          setPageCounts((prevCounts) => ({
            ...prevCounts,
            [id]: pageCount, // Actualizar el conteo de páginas para este id
          }));
        } catch (error) {
          console.log("Error reading the PDF file:", error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const actualizarDoc = () => {
    const newUser = {
      ...user.data,
      documentos: true,
      documentos1: true,
    };
    updateUser(newUser);
    console.log(user);
  };
  const formSchema = yup.object({
    resume: yup.mixed().required("Requerido"),
    cedula: yup.mixed().required("Requerido"),
    votingCert: yup.mixed().required("Requerido"),
    titleCert: yup.mixed().required("Requerido"),
    teacherExp: yup.mixed().required("Requerido"),
    teacherPublicImpediment: yup.mixed().required("Requerido"),
    administrativeResponsabilities: yup.mixed().required("Requerido"),
    profesionalExp: yup.mixed().required("Requerido"),
  });

  const uploadBoxStyle = {
    width: "40px",
    height: "40px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const files = [
    {
      id: "resume",
      label: "Hoja de vida formato espe",
    },
    {
      id: "cedula",
      label: "Copia de cédula",
    },
    {
      id: "votingCert",
      label: "Certificado de votacion",
    },
    {
      id: "titleCert",
      label: "Certificado de registro de título",
    },
    {
      id: "teacherExp",
      label: "Experiencia de docente",
    },
    {
      id: "teacherPublicImpediment",
      label: "Certificado de no tener impedimento al ejercer cargo público",
    },
    {
      id: "administrativeResponsabilities",
      label: "Certificado de no tener responsabilidades administrativas",
    },
    {
      id: "profesionalExp",
      label: "Experiencia profesional",
    },
  ];

  return (
    <Box m="20px" display="flex" flexDirection="column" alignItems="center">
      <Header title="Subir Información" subtitle="Complete el formulario" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          resume: undefined,
          cedula: undefined,
          votingCert: undefined,
          titleCert: undefined,
          teacherExp: undefined,
          teacherPublicImpediment: undefined,
          administrativeResponsabilities: undefined,
          profesionalExp: undefined,
        }}
        validationSchema={yup.object().shape({
          resume: yup.mixed().required("Requerido"),
          cedula: yup.mixed().required("Requerido"),
          votingCert: yup.mixed().required("Requerido"),
          titleCert: yup.mixed().required("Requerido"),
          teacherExp: yup.mixed().required("Requerido"),
          teacherPublicImpediment: yup.mixed().required("Requerido"),
          administrativeResponsabilities: yup.mixed().required("Requerido"),
          profesionalExp: yup.mixed().required("Requerido"),
        })}
        // validationSchema={formSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Documento</TableCell>
                    <TableCell>Archivo</TableCell>
                    <TableCell>Número de páginas</TableCell>
                    {Object.values(values).some(
                      (value) => value instanceof File
                    ) && <TableCell>Previsualización</TableCell>}
                    {Object.values(values).some(
                      (value) => value instanceof File
                    ) && <TableCell>Eliminar</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map(({ id, label }) => (
                    <TableRow key={id}>
                      <TableCell>
                        <Typography variant="body1">{label}:</Typography>
                      </TableCell>
                      <TableCell>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange(id, setFieldValue)}
                        />
                        {errors[id] && touched[id] && <div>{errors[id]}</div>}
                      </TableCell>
                      <TableCell>
                        <Box sx={uploadBoxStyle}>
                          {pageCounts[id] > 0 && (
                            <Typography variant="body2">
                              {pageCounts[id]} páginas
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {values[id] && (
                          <Button onClick={() => setOpenPreview(id)}>
                            <VisibilityIcon />
                          </Button>
                        )}
                        <Dialog
                          open={openPreview !== null}
                          onClose={() => {
                            setOpenPreview(null);
                            setCurrentPage(1); // Reset the current page back to 1 when closing the dialog
                          }}
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography variant="h5">
                              Page: {currentPage} / {pageCounts[openPreview]}
                            </Typography>
                            <Button onClick={() => setOpenPreview(null)}>
                              <CloseIcon />
                            </Button>
                          </Box>
                          <Document
                            file={
                              values[openPreview + "Blob"] instanceof Blob
                                ? URL.createObjectURL(
                                    values[openPreview + "Blob"]
                                  )
                                : null
                            }
                          >
                            <Page
                              pageNumber={currentPage}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                            />
                          </Document>
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            mt={2}
                          >
                            <Button
                              onClick={() => {
                                setCurrentPage((prevPageNumber) =>
                                  Math.max(prevPageNumber - 1, 1)
                                );
                              }}
                              disabled={currentPage === 1}
                            >
                              Página Anterior
                            </Button>
                            <TextField
                              type="number"
                              value={currentPage}
                              onChange={(e) => {
                                const pageNumber = Math.max(
                                  1,
                                  Math.min(
                                    e.target.value,
                                    pageCounts[openPreview]
                                  )
                                );
                                setCurrentPage(pageNumber);
                              }}
                            />
                            <Button
                              onClick={() => {
                                setCurrentPage((prevPageNumber) =>
                                  Math.min(
                                    prevPageNumber + 1,
                                    pageCounts[openPreview]
                                  )
                                );
                              }}
                              disabled={currentPage === pageCounts[openPreview]}
                            >
                              Siguiente Página
                            </Button>
                          </Box>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        {values[id] && (
                          <Button
                            onClick={() => {
                              // Remove the file from the form values
                              setFieldValue(id, undefined);
                              setFieldValue(id + "Blob", undefined);

                              // Remove the page count for this file
                              setPageCounts((prevCounts) => {
                                const newCounts = { ...prevCounts };
                                delete newCounts[id];
                                return newCounts;
                              });
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button
                type="submit"
                color="success"
                variant="contained"
                onClick={localStorage.setItem("estado1", true)}
              >
                Confirmar postulación
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <div>
        {isUploading ? (
          <Typography variant="h6" color="primary">
            Enviando...
            {actualizarDoc}
          </Typography>
        ) : null}
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000} // Adjust as needed
        onClose={handleAlertClose}
        message="Formulario Enviado ✔✔!"
        action={
          <Button color="inherit" size="small" onClick={handleAlertClose}>
            Cerrar
          </Button>
        }
      />
    </Box>
  );
};

export default Formulario;
