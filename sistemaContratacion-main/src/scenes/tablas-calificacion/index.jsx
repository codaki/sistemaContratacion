import React from 'react';
import Box from '@mui/material/Box';
import Header from '../../components/Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FormacionComponent = () => <div>Contenido de Formación</div>;
const DocenciaComponent = () => <div>Contenido de Docencia</div>;
const ProduccionComponent = () => <div>Contenido de Producción académica</div>;
const ExperienciaComponent = () => <div>Contenido de Experiencia Laboral</div>;

export const Calificaciones = () => {
  const [option, setOption] = React.useState('');

  const options = [
    { value: 'formacion', label: 'Formación', component: FormacionComponent },
    { value: 'docencia', label: 'Docencia', component: DocenciaComponent },
    { value: 'produccion', label: 'Producción académica', component: ProduccionComponent },
    { value: 'experiencia', label: 'Experiencia Laboral', component: ExperienciaComponent },
  ];

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const SelectedComponent = options.find((opt) => opt.value === option)?.component;

  return (
    <Box mt={2} mr={2} ml={2}>
      <Header title="Calificaciones" subtitle="Seleccione la categoría a calificar" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Opción</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Opción"
          onChange={handleChange}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={2}>
        {SelectedComponent && <SelectedComponent />}
      </Box>
    </Box>
  );
};
