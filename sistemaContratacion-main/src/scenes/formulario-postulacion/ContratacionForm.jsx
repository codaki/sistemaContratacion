import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import axios from "axios";
import { crearContratacionTipo, pedirContratacion, cambiarEstadoContratacion } from "../../api/contratacionTipo";

const FormularioContratacion = () => {
  const [formData, setFormData] = useState({
    con_nombre: "",
  });

  const [contrataciones, setContrataciones] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerContrataciones = async () => {
      try {
        const res = await pedirContratacion();
        setContrataciones(res.data);
      } catch (error) {
        console.error("Error al cargar las contrataciones:", error);
      }
    };

    if (shouldUpdate) {
      obtenerContrataciones();
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
    const success = await crearContratacionTipo(formData);
    console.log("Nueva contratación creada:", formData);
    setShouldUpdate(true);
    setFormData({
      con_nombre: "",
    });
  };

  const handleDeshabilitar = async (contratacion) => {
    try {
      const success = await cambiarEstadoContratacion(contratacion.con_id, !contratacion.con_estado);
      console.log("Contratación actualizada:", contratacion);
      setShouldUpdate(true); 
      setContrataciones(prevContrataciones => {
        return prevContrataciones.map(c => {
          if (c.con_id === contratacion.con_id) {
            return { ...c, con_estado: !c.con_estado };
          }
          return c;
        });
      });
    } catch (error) {
      console.error("Error al deshabilitar la contratación:", error);
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
          title="Formulario Contratación"
          subtitle="Complete el formulario"
        />
        <label>Contratación:</label>
        <TextField
          name="con_nombre"
          value={formData.con_nombre} // Establece el valor actual del estado
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
        <Header title="Contrataciones Registradas" />
        {contrataciones.map((contratacion) => (
          <Box key={contratacion.con_id} mt={2} sx={{
            backgroundColor: "#dad7cd", mt: 2, p: 2, borderRadius: "2vh", "&:hover": {
              backgroundColor: "#98c1d9",
            }
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" >
              <span style={{ fontWeight: "bold" }}>Contratación: {contratacion.con_nombre}</span>
              <Box >
                <Button
                  variant="outlined"
                  onClick={() => handleDeshabilitar(contratacion)}
                  style={{
                    color: !contratacion.con_estado ? "green" : "red",
                    borderColor: !contratacion.con_estado ? "green" : "red",
                  }}
                >
                  {!contratacion.con_estado ? "Habilitar" : "Deshabilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioContratacion;
