import React, { useState } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { PDFDocument } from 'pdfjs-dist';

const Formulario = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pdfPageCount, setPdfPageCount] = useState(0); // State to store the number of pages

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handlePdfFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        try {
          const pdf = await PDFDocument.load(pdfData);
          setPdfPageCount(pdf.getPageCount());
        } catch (error) {
          console.log("Error reading the PDF file:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const formSchema = yup.object().shape({
    // Add validation for other fields if needed
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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Documento</TableCell>
                    <TableCell>Archivo</TableCell>
                    <TableCell>Número de páginas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Hoja de vida formato espe */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Hoja de vida formato espe:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Copia de cédula */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Copia de cédula:</Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de votación */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Certificado de votación:</Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de registro de título */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Certificado de registro de título:</Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Experiencia de docente */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Experiencia de docente:</Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de no tener impedimento de ejercer cargo público */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Certificado de no tener impedimento de ejercer cargo público:</Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de no tener responsabilidades administrativas */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Certificado de no tener responsabilidades administrativas:</Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Experiencia profesional */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Experiencia profesional:</Typography>
                    </TableCell>
                    <TableCell>
                      <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pdfPageCount > 0 && (
                          <Typography variant="body2">{pdfPageCount} pages</Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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

export default Formulario;
