import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearPostulacion, pedirPostulaciones, cambiarEstadoPostulacion } from "../../api/postulacion";

const FormularioPeriodo = () => {
  const [formData, setFormData] = useState({
    post_periodo: "",
  });

  const [postulaciones, setPostulaciones] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerPostulaciones = async () => {
      try {
        const res = await pedirPostulaciones();
        setPostulaciones(res.data);
      } catch (error) {
        console.error("Error al cargar las postulaciones:", error);
      }
    };
    if (shouldUpdate) {
      obtenerPostulaciones();
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
    const success = await crearPostulacion(formData);
    console.log("Nueva postulación creada:", formData);
    setShouldUpdate(true);
    setFormData({
      post_periodo: ""
    });
  };

  const handleDeshabilitar = async (postulacion) => {
    try {
      const success = await cambiarEstadoPostulacion(postulacion.post_id, !postulacion.post_estado);
      console.log("Postulación actualizada:", postulacion);
      setShouldUpdate(true); 
      setPostulaciones(prevPostulaciones => {
        return prevPostulaciones.map(p => {
          if (p.post_id === postulacion.post_id) {
            return { ...p, post_estado: !p.post_estado };
          }
          return p;
        });
      });
    } catch (error) {
      console.error("Error al eliminar la postulación:", error);
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

      <Box mt={4}
      maxHeight="60vh"
      overflow="auto"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
        }}>
        <Header title="Postulaciones Registradas" />
        {postulaciones.map((postulacion) => (
          <Box key={postulacion.post_id} mt={2} sx={{
            backgroundColor: "#dad7cd", mt: 2, p: 2, borderRadius: "2vh", "&:hover": {
              backgroundColor: "#98c1d9",
            }
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" >
              <span style={{ fontWeight: "bold" }}>Período: {postulacion.post_periodo}</span>
              <Box >
                <Button
                  variant="outlined"
                  onClick={() => handleDeshabilitar(postulacion)}
                  style={{
                    color: !postulacion.post_estado ? "green" : "red",
                    borderColor: !postulacion.post_estado ? "green" : "red",
                  }}
                >
                  {!postulacion.post_estado ? "Habilitar" : "Deshabilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioPeriodo;
