import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearSede, pedirSede, cambiarEstadoSede } from "../../api/sede";

const FormularioSede = () => {
  const [formData, setFormData] = useState({
    sede_nombre: "",
    sede_descripcion: "",
  });

  const [sedes, setSedes] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerSedes = async () => {
      try {
        const res = await pedirSede();
        console.log("Sedes:", res.data);
        setSedes(res.data);
      } catch (error) {
        console.error("Error al cargar las sedes:", error);
      }
    };

    if (shouldUpdate) {
      obtenerSedes();
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
    const success = await crearSede(formData);
    console.log("Nueva sede creada:", formData);
    setShouldUpdate(true);
    setFormData({
      sede_nombre: "",
      sede_descripcion: "",
    });
  };

  const handleEstadoSede = async (sedeId, nuevoEstado) => {
    try {
      const success = await cambiarEstadoSede(sedeId, nuevoEstado);
      console.log(`Sede ${nuevoEstado ? 'habilitada' : 'deshabilitada'}:`, sedeId);
      setShouldUpdate(true);
    } catch (error) {
      console.error(`Error al ${nuevoEstado ? 'habilitar' : 'deshabilitar'} la sede:`, error);
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
        <Header title="Formulario Sede" subtitle="Complete el formulario" />

        <label>Sede:</label>
        <TextField
          name="sede_nombre"
          value={formData.sede_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Descripción:</label>
        <TextField
          name="sede_descripcion"
          value={formData.sede_descripcion}
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
          {" "}
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
        <Header title="Sedes Registradas" />
        {sedes.map((sede) => (
          <Box
            key={sede.sede_id}
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
              <span style={{ fontWeight: "bold" }}>Sede: {sede.sede_nombre}</span>
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => handleEstadoSede(sede.sede_id, !sede.sede_estado)}
                  style={{
                    color: sede.sede_estado ? "red" : "green",
                    borderColor: sede.sede_estado ? "red" : "green",
                  }}
                >
                  {sede.sede_estado ? "Deshabilitar" : "Habilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioSede;