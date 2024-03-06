import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearPersonalAcademico, pedirPersonalAcademico, cambiarEstadoPersonalAcademico } from "../../api/personalAcademico";

const FormularioPacad = () => {
  const [formData, setFormData] = useState({
    pa_nombre: "",
    pa_descripcion: "",
  });

  const [personalAcademico, setPersonalAcademico] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerPersonalAcademico = async () => {
      try {
        const res = await pedirPersonalAcademico();
        setPersonalAcademico(res.data);
      } catch (error) {
        console.error("Error al cargar el personal académico:", error);
      }
    };

    if (shouldUpdate) {
      obtenerPersonalAcademico();
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
    const success = await crearPersonalAcademico(formData);
    console.log("Nuevo personal académico creado:", formData);
    setShouldUpdate(true);
    setFormData({
      pa_nombre: "",
      pa_descripcion: "",
    });
  };

  const handleDeshabilitar = async (personal) => {
    try {
      const success = await cambiarEstadoPersonalAcademico(personal.pa_id, !personal.pa_estado);
      console.log("Personal académico actualizado:", personal);
      setShouldUpdate(true); 
      setPersonalAcademico(prevPersonalAcademico => {
        return prevPersonalAcademico.map(p => {
          if (p.pa_id === personal.pa_id) {
            return { ...p, pa_estado: !p.pa_estado };
          }
          return p;
        });
      });
    } catch (error) {
      console.error("Error al deshabilitar el personal académico:", error);
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
          title="Formulario Personal Académico"
          subtitle="Complete el formulario"
        />

        <label>Personal Académico:</label>
        <TextField
          name="pa_nombre"
          value={formData.pa_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Descripción:</label>
        <TextField
          name="pa_descripcion"
          value={formData.pa_descripcion}
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
        <Header title="Personal Académico Registrado" />
        {personalAcademico.map((personal) => (
          <Box key={personal.pa_id} mt={2} sx={{
            backgroundColor: "#dad7cd", mt: 2, p: 2, borderRadius: "2vh", "&:hover": {
              backgroundColor: "#98c1d9",
            }
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" >
              <span style={{ fontWeight: "bold" }}>Nombre: {personal.pa_nombre}</span>
              <Box >
                <Button
                  variant="outlined"
                  onClick={() => handleDeshabilitar(personal)}
                  style={{
                    color: !personal.pa_estado ? "green" : "red",
                    borderColor: !personal.pa_estado ? "green" : "red",
                  }}
                >
                  {!personal.pa_estado ? "Habilitar" : "Deshabilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioPacad;
