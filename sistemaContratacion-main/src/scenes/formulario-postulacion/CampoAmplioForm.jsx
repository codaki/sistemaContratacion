import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearCampoAmplio, pedirCampoAmplio, cambiarEstadoCampoAmplio } from "../../api/campoAmplio";

const FormularioCaAmplio = () => {
  const [formData, setFormData] = useState({
    ca_nombre: "",
    ca_descripcion: "",
  });

  const [camposAmplios, setCamposAmplios] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerCamposAmplios = async () => {
      try {
        const res = await pedirCampoAmplio();
        setCamposAmplios(res.data);
      } catch (error) {
        console.error("Error al cargar los campos amplios:", error);
      }
    };

    if (shouldUpdate) {
      obtenerCamposAmplios();
      setShouldUpdate(false);
    }
  }, [shouldUpdate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await crearCampoAmplio(formData);
    console.log("Nuevo campo amplio creado:", formData);
    setShouldUpdate(true);
    setFormData({
      ca_nombre: "",
      ca_descripcion: "",
    });
  };

  const handleHabilitar = async (campoAmplioId) => {
    try {
      const success = await cambiarEstadoCampoAmplio(campoAmplioId, true);
      console.log("Campo amplio habilitado:", campoAmplioId);
      setShouldUpdate(true);
    } catch (error) {
      console.error("Error al habilitar el campo amplio:", error);
    }
  };

  const handleDeshabilitar = async (campoAmplioId) => {
    try {
      const success = await cambiarEstadoCampoAmplio(campoAmplioId, false);
      console.log("Campo amplio deshabilitado:", campoAmplioId);
      setShouldUpdate(true);
    } catch (error) {
      console.error("Error al deshabilitar el campo amplio:", error);
    }
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
        <Header title="Formulario Campo Amplio" subtitle="Complete el formulario" />

        <label>Campo Amplio:</label>
        <TextField
          name="ca_nombre"
          value={formData.ca_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Descripción:</label>
        <TextField
          name="ca_descripcion"
          value={formData.ca_descripcion}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#36ae56", // Verde claro
            color: "#FFFFFF", // Letras blancas
            "&:hover": {
              backgroundColor: "#388E3C", // Verde oscuro al pasar el mouse
            },
          }}
        >
          Enviar
        </Button>
      </Box>

      <Box
        mt={4}
        maxHeight="400px"  // Altura máxima para hacerlo scrollable
        overflow="auto"      // Estilo para permitir el desplazamiento vertical
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
        }}
      >
        <Header title="Campos Amplios Registrados" />
        {camposAmplios.map((campoAmplio) => (
          <Box
            key={campoAmplio.ca_id}
            mt={2}
            sx={{
              backgroundColor: "#dad7cd",
              mt: 2,
              p: 2,
              borderRadius: "2vh",
              "&:hover": {
                backgroundColor: "#98c1d9",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <span style={{ fontWeight: "bold" }}>Campo Amplio: {campoAmplio.ca_nombre}</span>
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => campoAmplio.ca_estado ? handleDeshabilitar(campoAmplio.ca_id) : handleHabilitar(campoAmplio.ca_id)}
                  style={{
                    color: campoAmplio.ca_estado ? "red" : "green",
                    borderColor: campoAmplio.ca_estado ? "red" : "green",
                  }}
                >
                  {campoAmplio.ca_estado ? "Deshabilitar" : "Habilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioCaAmplio;
