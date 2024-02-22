import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { crearOferta } from "../../api/oferta";
import Header from "../../components/Header";
import Popup from "./Popup.jsx";
const FormulariOferta = () => {
  const [formData, setFormData] = useState({
    post_periodo: "",
    con_nombre: "",
    ca_nombre: "",
    ce_nombre: "",
    sede_nombre: "",
    dept_nombre: "",
    pa_nombre: "",
    act_nombre: "",
    ofe_vacantes: "",
    ofe_horas: "",
  });

  const [mostrarCambioContraseña, setMostrarCambioContraseña] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const handlePopupToggle = () => {
    setMostrarCambioContraseña(!mostrarCambioContraseña);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === ""
    );
    setMostrarPopup(isAnyFieldEmpty ? false : true);
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
          <MenuItem value="periodo1">202350</MenuItem>
          <MenuItem value="periodo2">202351</MenuItem>
        </Select>
        <label>Tipo de Contratación:</label>
        <Select
          name="con_nombre"
          value={formData.con_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="contratacion1">
            Personal académico que desarrolla actividades de tercer nivel de
            grado
          </MenuItem>
          <MenuItem value="contratacion2">
            Personal académico que desarrolla actividades de cuarto nivel
          </MenuItem>
        </Select>
        <label>Campo Amplio:</label>
        <Select
          name="ca_nombre"
          value={formData.ca_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="campoAmplio1">Tecnología</MenuItem>
          <MenuItem value="campoAmplio2">Ingeniería</MenuItem>
        </Select>
        <label>Campo Específico:</label>
        <Select
          name="ce_nombre"
          value={formData.ce_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="campoEspecifico1">Base de Datos</MenuItem>
          <MenuItem value="campoEspecifico2">
            Introducción a la Ingeniería
          </MenuItem>
        </Select>
        <label>Sede:</label>
        <Select
          name="sede_nombre"
          value={formData.sede_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="sede1">Matriz</MenuItem>
          <MenuItem value="sede2">Latacunga</MenuItem>
          <MenuItem value="sede3">Santo Domingo</MenuItem>
        </Select>
        <label>Departamento:</label>
        <Select
          name="dept_nombre"
          value={formData.dept_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="departamento1">
            DECE - Departamento de Ciencias Exactas
          </MenuItem>
          <MenuItem value="departamento2">
            DCCO - Departamento de la Computación
          </MenuItem>
          <MenuItem value="departamento3">
            DECEM - Departamento de Energía y Mecánica
          </MenuItem>
          <MenuItem value="departamento4">
            DECTC - Departamento de la Tierra y la Construcción
          </MenuItem>
          <MenuItem value="departamento5">
            DECV - Departamento de la Vida y la Agricultura
          </MenuItem>
          <MenuItem value="departamento6">
            DECEAC - Departamento Económicas, Administrativas y de Comercio
          </MenuItem>
          <MenuItem value="departamento7">
            DECHS - Departamento Humanas y Sociales
          </MenuItem>
          <MenuItem value="departamento8">
            DESD - Departamento de Seguridad y Defensa
          </MenuItem>
        </Select>
        <label>Personal Académico:</label>
        <Select
          name="pa_nombre"
          value={formData.pa_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="academico1">Principal Nivel 1</MenuItem>
          <MenuItem value="academico2">Auxiliar Nivel 1</MenuItem>
          <MenuItem value="academico2">Técnico de Investigación</MenuItem>
        </Select>
        <label>Actividad:</label>
        <Select
          name="act_nombre"
          value={formData.act_nombre}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="actividad1">Docencia</MenuItem>
          <MenuItem value="actividad2">Investigación</MenuItem>
          <MenuItem value="actividad1">Vinculación</MenuItem>
        </Select>
        <label>Oferta Vacantes:</label>
        <Select
          name="ofe_vacantes"
          value={formData.ofe_vacantes}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="vacantes2">2</MenuItem>
        </Select>
        <label>Oferta Horas:</label>
        <Select
          name="ofe_horas"
          value={formData.ofe_horas}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="horas1">En Actualización</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="success"
          on
          onClick={handlePopupToggle}
          sx={{ mt: 2, p: 2 }}
        >
          Enviar
        </Button>
      </Box>
      {mostrarPopup && <Popup onClose={handlePopupToggle} />}
    </div>
  );
};

export default FormulariOferta;
