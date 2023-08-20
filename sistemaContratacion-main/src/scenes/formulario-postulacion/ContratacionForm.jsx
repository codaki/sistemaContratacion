import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Header from '../../components/Header';
import axios from 'axios';
import { crearContratacionTipo } from '../../api/contratacionTipo';

const FormularioContratacion = () => {
  const [body, setBody] = useState({
    con_nombre: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBody((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí se puede enviar los datos a un servidor o realizar alguna acción.
    const success = await crearContratacionTipo(FormData);
    console.log(body);

    // Limpiar el valor del TextField
    setBody({
      con_nombre: '',
    });
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
        <Header title="Formulario Contratacion" subtitle="Complete el formulario" />
        <label>Contratación:</label>
        <TextField
          name="con_nombre"
          value={body.con_nombre} // Establece el valor actual del estado
          onChange={handleChange}
          margin="normal"
          required
        />

        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2, p: 2 }}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default FormularioContratacion;
