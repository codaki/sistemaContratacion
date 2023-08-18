import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Header from '../../components/Header';
import { MenuItem, Select } from '@mui/material';

const FormularioCaEspecifico = () => {
  const [formData, setFormData] = useState({
    ce_nombre: '',
    opciones: [],
    ce_descripcion: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      opciones: selectedOptions,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se puede enviar los datos a un servidor o realizar alguna acción.
    console.log(formData);
  };

  return (
    <div className="register">
    
    <Box 
        component="form"
        bgcolor={'rgba(255, 255, 255, 0.7)'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '16px',
        }}
        onSubmit={handleSubmit}
      >
        <Header title="Formulario Campo Especifico" subtitle="Complete el formulario" />

        <label>Campo Específico:</label>
        <TextField
          name="ce_nombre"
          value={formData.ce_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Campo Amplio:</label>
        <Select
          name="opciones"
          multiple
          value={formData.opciones}
          onChange={handleMultiSelectChange}
          margin="normal"
          required
          inputProps={{ 'aria-label': 'Seleccionar opciones' }}
        >
          <MenuItem value="opcion1">Opción 1</MenuItem>
          <MenuItem value="opcion2">Opción 2</MenuItem>
          <MenuItem value="opcion3">Opción 3</MenuItem>
        </Select>
        <label>Descripción:</label>
        <TextField
          name="ce_descripcion"
          value={formData.ce_descripcion}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, p: 2}}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default FormularioCaEspecifico;
