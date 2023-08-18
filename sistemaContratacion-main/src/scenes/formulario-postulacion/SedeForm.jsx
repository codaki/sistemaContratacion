import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearSede } from "../../api/sede"; // Asegúrate de ajustar la ruta correcta

const FormularioSede = () => {
  const [formData, setFormData] = useState({
    sede_nombre: "",
    sede_descripcion: "",
  });

  const handleChange = (event) => {
    try {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } catch (error) {
      console.error("Error en handleChange:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await crearSede(formData);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <Box
          component="div"
          bgcolor={"rgba(255, 255, 255, 0.7)"}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "16px",
          }}
        >
          <Header title="Formulario Sede" subtitle="Complete el formulario" />

          <label htmlFor="sede_nombre">Sede:</label>
          <TextField
            id="sede_nombre"
            name="sede_nombre"
            value={formData.sede_nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
          <label htmlFor="sede_descripcion">Descripción:</label>
          <TextField
            id="sede_descripcion"
            name="sede_descripcion"
            value={formData.sede_descripcion}
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
      </form>
    </div>
  );
};

export default FormularioSede;
