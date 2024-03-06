import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearDepartamento, pedirDepartamento, cambiarEstadoDepartamento } from "../../api/departamento";

const FormularioDept = () => {
  const [formData, setFormData] = useState({
    dept_nombre: "",
    dept_descripcion: "",
  });

  const [departamentos, setDepartamentos] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  useEffect(() => {
    const obtenerDepartamentos = async () => {
      try {
        const res = await pedirDepartamento();
        setDepartamentos(res.data);
      } catch (error) {
        console.error("Error al cargar los departamentos:", error);
      }
    };

    if (shouldUpdate) {
      obtenerDepartamentos();
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
    const success = await crearDepartamento(formData);
    console.log("Nuevo departamento creado:", formData);
    setShouldUpdate(true);
    setFormData({
      dept_nombre: "",
      dept_descripcion: "",
    });
  };

  const handleDeshabilitar = async (departamento) => {
    try {
      const success = await cambiarEstadoDepartamento(departamento.dept_id, !departamento.dept_estado);
      console.log("Departamento actualizado:", departamento);
      setShouldUpdate(true); 
      setDepartamentos(prevDepartamentos => {
        return prevDepartamentos.map(d => {
          if (d.dept_id === departamento.dept_id) {
            return { ...d, dept_estado: !d.dept_estado };
          }
          return d;
        });
      });
    } catch (error) {
      console.error("Error al deshabilitar el departamento:", error);
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
          title="Formulario Departamento"
          subtitle="Complete el formulario"
        />

        <label>Departamento:</label>
        <TextField
          name="dept_nombre"
          value={formData.dept_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Descripción:</label>
        <TextField
          name="dept_descripcion"
          value={formData.dept_descripcion}
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
        <Header title="Departamentos Registrados" />
        {departamentos.map((departamento) => (
          <Box key={departamento.dept_id} mt={2} sx={{
            backgroundColor: "#dad7cd", mt: 2, p: 2, borderRadius: "2vh", "&:hover": {
              backgroundColor: "#98c1d9",
            }
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" >
              <span style={{ fontWeight: "bold" }}>Departamento: {departamento.dept_nombre}</span>
              <Box >
                <Button
                  variant="outlined"
                  onClick={() => handleDeshabilitar(departamento)}
                  style={{
                    color: !departamento.dept_estado ? "green" : "red",
                    borderColor: !departamento.dept_estado ? "green" : "red",
                  }}
                >
                  {!departamento.dept_estado ? "Habilitar" : "Deshabilitar"}
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FormularioDept;
