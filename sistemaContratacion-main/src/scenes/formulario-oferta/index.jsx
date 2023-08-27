import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearOferta } from "../../api/oferta";

const FormulariOferta = () => {
  const [formData, setFormData] = useState({
    post_periodo: "",
    con_nombre: "",
    ce_nombre: "",
    ca_nombre: "",
    sede_nombre: "",
    dept_nombre: "",
    pa_nombre: "",
    act_nombre: "",
    ofe_vacantes: "",
    ofe_horas: "",
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
    const success = await crearOferta(formData);
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
        <Header title="Formulario Oferta" subtitle="Complete el formulario" />
        <label>Periodo Postulación:</label>
        <Select
          name="post_periodo"
          value={formData.post_periodo}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="periodo1">Periodo 1</MenuItem>
          <MenuItem value="periodo2">Periodo 2</MenuItem>
          
        </Select>
        <label>Tipo de Contratación:</label>
        <Select
          name="con_nombre"
          value={formData.con_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="contratacion1">Contratación 1</MenuItem>
          <MenuItem value="contratacion2">Contratación 2</MenuItem>
          
        </Select>
        <label>Campo Específico:</label>
        <Select
          name="ce_nombre"
          value={formData.ce_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="campoEspecifico1">Campo Específico 1</MenuItem>
          <MenuItem value="campoEspecifico2">Campo Específico 2</MenuItem>
          
        </Select>
        <label>Campo Amplio:</label>
        <Select
          name="ca_nombre"
          value={formData.ca_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="campoAmplio1">Campo Amplio 1</MenuItem>
          <MenuItem value="campoAmplio2">Campo Amplio 2</MenuItem>
          
        </Select>
        <label>Sede:</label>
        <Select
          name="sede_nombre"
          value={formData.sede_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="sede1">Sede 1</MenuItem>
          <MenuItem value="sede2">Sede 2</MenuItem>
          
        </Select>
        <label>Departamento:</label>
        <Select
          name="dept_nombre"
          value={formData.dept_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="departamento1">Departamento 1</MenuItem>
          <MenuItem value="departamento2">Departamento 2</MenuItem>
          
        </Select>
        <label>Personal Académico:</label>
        <Select
          name="pa_nombre"
          value={formData.pa_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="academico1">Académico 1</MenuItem>
          <MenuItem value="academico2">Académico 2</MenuItem>
          
        </Select>
        <label>Actividad:</label>
        <Select
          name="act_nombre"
          value={formData.act_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="actividad1">Actividad 1</MenuItem>
          <MenuItem value="actividad2">Actividad 2</MenuItem>
          
        </Select>
        <label>Oferta Vacantes:</label>
        <Select
          name="ofe_vacantes"
          value={formData.ofe_vacantes}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="vacantes1">Vacantes 1</MenuItem>
          <MenuItem value="vacantes2">Vacantes 2</MenuItem>
          
        </Select>
        <label>Oferta Horas:</label>
        <Select
          name="ofe_horas"
          value={formData.ofe_horas}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="horas1">Horas 1</MenuItem>
          <MenuItem value="horas2">Horas 2</MenuItem>
          
        </Select>
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

export default FormulariOferta;
