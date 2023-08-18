import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearPostulacion } from "../../api/postulacion";

const FormularioPeriodo = () => {
  const [formData, setFormData] = useState({
    post_periodo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await crearPostulacion(formData);
    console.log(formData);
  };

  return (
    <div className="register">
      <Box
        component="form"
        bgcolor={"rgba(255, 255, 255, 0.7)"}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
        }}
        onSubmit={handleSubmit}
      >
        <Header
          title="Formulario Periodo Postulacion"
          subtitle="Complete el formulario"
        />
        <label>Periodo Postulación:</label>
        <TextField
          name="post_periodo"
          value={formData.post_periodo}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 2, p: 2 }}
        >
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default FormularioPeriodo;
