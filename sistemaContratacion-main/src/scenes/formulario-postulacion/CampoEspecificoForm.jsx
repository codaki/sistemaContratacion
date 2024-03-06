import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearCampoEspecifico, pedirCampoEspecifico, cambiarEstadoCampoEspecifico } from "../../api/campoEspecifico";
import { pedirCampoAmplio } from "../../api/campoAmplio";

const FormularioCaEspecifico = () => {
  const [formData, setFormData] = useState({
    ce_nombre: "",
    ca_id: "",
    ce_descripcion: "",
  });

  const [camposEspecificos, setCamposEspecificos] = useState([]);
  const [campoAmplioList, setCampoAmplioList] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerCamposEspecificos = async () => {
      try {
        const res = await pedirCampoEspecifico();
        setCamposEspecificos(res.data);
      } catch (error) {
        console.error("Error al cargar los campos específicos:", error);
      }
    };

    const obtenerCamposAmplios = async () => {
      try {
        const res = await pedirCampoAmplio();
        setCampoAmplioList(res.data);
      } catch (error) {
        console.error("Error al cargar los campos amplios:", error);
      }
    };

    if (shouldUpdate) {
      obtenerCamposEspecificos();
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
    const success = await crearCampoEspecifico(formData);
    console.log("Nuevo campo específico creado:", formData);
    setShouldUpdate(true);
    setFormData({
      ce_nombre: "",
      ce_descripcion: "",
      ca_id: "",
    });
  };

  const handleDeshabilitar = async (campoEspecifico) => {
    try {
      const success = await cambiarEstadoCampoEspecifico(campoEspecifico.ce_id, !campoEspecifico.ce_estado);
      console.log("Campo específico actualizado:", campoEspecifico);
      setShouldUpdate(true);
      setCamposEspecificos((prevCamposEspecificos) =>
        prevCamposEspecificos.map((campo) =>
          campo.ce_id === campoEspecifico.ce_id ? { ...campo, ce_estado: !campo.ce_estado } : campo
        )
      );
    } catch (error) {
      console.error("Error al habilitar/deshabilitar el campo específico:", error);
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
        <Header title="Formulario Campo Específico" subtitle="Complete el formulario" />

        <label>Campo Específico:</label>
        <TextField
          name="ce_nombre"
          value={formData.ce_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Campo Amplio:</label>
        <TextField
          select
          fullWidth
          value={formData.ca_id}
          onChange={handleChange}
          name="ca_id"
          SelectProps={{
            native: true,
          }}
          margin="normal"
          required
        >
          <option value=""></option>
          {campoAmplioList.map((campoAmplio) => (
            <option key={campoAmplio.ca_id} value={campoAmplio.ca_id}>
              {campoAmplio.ca_nombre}
            </option>
          ))}
        </TextField>

        <label>Descripción:</label>
        <TextField
          name="ce_descripcion"
          value={formData.ce_descripcion}
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
            backgroundColor: "#36ae56",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          Enviar
        </Button>
      </Box>

      <Box
        mt={4}
        maxHeight="60vh"
        overflow="auto"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
        }}
      >
        <Header title="Campos Específicos Registrados" />
        {camposEspecificos.map((campoEspecifico) => (
          <Box
            key={campoEspecifico.ce_id}
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
              <span style={{ fontWeight: "bold" }}>Campo Específico: {campoEspecifico.ce_nombre}</span>
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => handleDeshabilitar(campoEspecifico)}
                  style={{
                    color: campoEspecifico.ce_estado ? "red" : "green",
                    borderColor: campoEspecifico.ce_estado ? "red" : "green",
                  }}
                >
                  {campoEspecifico.ce_estado ? "Deshabilitar" : "Habilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioCaEspecifico;
