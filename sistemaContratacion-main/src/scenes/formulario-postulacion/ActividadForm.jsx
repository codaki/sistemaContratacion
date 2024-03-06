import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearActividad, pedirActividad, cambiarEstadoActividad } from "../../api/actividad";

const FormularioActividad = () => {
  const [formData, setFormData] = useState({
    act_nombre: "",
    act_descripcion: "",
  });

  const [actividades, setActividades] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        const res = await pedirActividad();
        setActividades(res.data);
      } catch (error) {
        console.error("Error al cargar las actividades:", error);
      }
    };

    if (shouldUpdate) {
      obtenerActividades();
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
    const success = await crearActividad(formData);
    console.log("Nueva actividad creada:", formData);
    setShouldUpdate(true);
    setFormData({
      act_nombre: "",
      act_descripcion: "",
    });
  };

  const handleEstadoActividad = async (actividadId, nuevoEstado) => {
    try {
      const success = await cambiarEstadoActividad(actividadId, nuevoEstado);
      console.log(`Actividad ${nuevoEstado ? 'habilitada' : 'deshabilitada'}:`, actividadId);
      setShouldUpdate(true);
    } catch (error) {
      console.error(`Error al ${nuevoEstado ? 'habilitar' : 'deshabilitar'} la actividad:`, error);
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
        <Header title="Formulario Actividad" subtitle="Complete el formulario" />

        <label>Actividad:</label>
        <TextField
          name="act_nombre"
          value={formData.act_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Descripción:</label>
        <TextField
          name="act_descripcion"
          value={formData.act_descripcion}
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
        <Header title="Actividades Registradas" />
        {actividades.map((actividad) => (
          <Box
            key={actividad.act_id}
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
              <span style={{ fontWeight: "bold" }}>Actividad: {actividad.act_nombre}</span>
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => handleEstadoActividad(actividad.act_id, !actividad.act_estado)}
                  style={{
                    color: actividad.act_estado ? "red" : "green",
                    borderColor: actividad.act_estado ? "red" : "green",
                  }}
                >
                  {actividad.act_estado ? "Deshabilitar" : "Habilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioActividad;
