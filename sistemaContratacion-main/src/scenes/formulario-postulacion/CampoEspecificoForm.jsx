import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Header from '../../components/Header';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

import { MenuItem, Select } from '@mui/material';

import { pedirCampoAmplio } from "../../api/campoAmplio";


const FormularioCaEspecifico = () => {
  const [campoAmplioList,setCampoAmplioList] = useState([]); 
  const [formData, setFormData] = useState({
    ce_nombre: '',
    ca_id: '',
    ce_descripcion: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8800/api/campoEspecifico', formData);
    console.log(formData);
    // Limpiar el valor del TextField
    setFormData({
      ce_nombre: '',
      ce_descripcion: '',
      ca_id: ''
    });
  };
  useEffect(() => {
    const PedirPosutlacion = async () => {
      try {
        const res = await pedirCampoAmplio();
        setCampoAmplioList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    PedirPosutlacion();
  }, []);

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
                  fullWidth
                  
                  onChange={(event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                  }}
                  name="ca_id"
                  
                >
                  {campoAmplioList.length > 0 ? (
                    campoAmplioList.map((option) => (
                      <MenuItem key={option.ca_id} value={option.ca_id}>
                      {option.ca_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando campos...</MenuItem>
                  )}
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
