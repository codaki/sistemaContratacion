import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";


export const TableComponent = ({ data }) => {
  const [calificaciones, setCalificaciones] = useState(
    new Array(data.length).fill("")
  );

  const handleCalificacionChange = (index, value) => {
    // Validar que la entrada sea un número del 1 al 20
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 20) {
      const newCalificaciones = [...calificaciones];
      newCalificaciones[index] = parsedValue.toString(); // Convertir de nuevo a cadena
      setCalificaciones(newCalificaciones);
    } else if (value === "") {
      // Si el valor es una cadena vacía, borrar la calificación
      const newCalificaciones = [...calificaciones];
      newCalificaciones[index] = "";
      setCalificaciones(newCalificaciones);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Requisito</TableCell>
            <TableCell>Títulos</TableCell>
            <TableCell>Detalle de Tiempo</TableCell>
            <TableCell>Mínimo</TableCell>
            <TableCell>Máximo</TableCell>
            <TableCell>Observaciones</TableCell>
            <TableCell>Calificación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ minWidth: 300, textAlign: "justify" }}>
                {row.requisito}
              </TableCell>

              <TableCell style={{ minWidth: 300 }}>
                {row.titulos.map((titulo, i) => (
                  <TableRow key={i}>
                    <TableCell>{titulo}</TableCell>
                  </TableRow>
                ))}
              </TableCell>

              <TableCell style={{ minWidth: 300 ,textAlign: "justify"}}>
                {row.detalleTiempo.length > 1 ? (
                  <>
                    {row.detalleTiempo.map((minimo, i) => (
                      <TableRow key={i}>
                        <TableCell style={{ textAlign: "justify"  }}>{minimo}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  row.detalleTiempo[0]
                )}
              </TableCell>

              <TableCell>
                {row.minimo.length > 1 ? (
                  <>
                    {row.minimo.map((minimo, i) => (
                      <TableRow key={i}>
                        <TableCell >{minimo}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  row.minimo[0]
                )}
              </TableCell>

              <TableCell>
                {row.maximo.length > 1 ? (
                  <>
                    {row.maximo.map((max, i) => (
                      <TableRow key={i}>
                        <TableCell>{max}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  row.maximo[0]
                )}
              </TableCell>

              <TableCell style={{ minWidth: 260 }}>
                <>
                  {row.observaciones.map((titulo, i) => (
                    <TableRow key={i}>
                      <TableCell style={{ textAlign: "justify"  }}>{titulo}</TableCell>
                    </TableRow>
                  ))}
                </>
              </TableCell>

              <TableCell style={{ minWidth: 250 }}>
                <TextField
                  id="outlined-number"
                  label="Calificación"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calificaciones[index]}
                  onChange={(e) =>
                    handleCalificacionChange(index, e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
