import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { updateNotaSolicitud } from "../../api/solicitud";
import Popup from "../../components/Popup";
import { useAuth } from "../../context/AuthContext";

export const TableComponent = ({ data }) => {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [calificaciones, setCalificaciones] = useState(
    new Array(data.length).fill("")
  );
  const [sumaCalificaciones, setSumaCalificaciones] = useState(0); // Estado para la suma acumulada

  const handleCalificacionChange = (index, value) => {
    // if (value < 0 || value > 4) {
    //   setShowPopup(true);
    // }
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 20) {
      const newCalificaciones = [...calificaciones];
      newCalificaciones[index] = parsedValue.toString();
      setCalificaciones(newCalificaciones);

      // Calcular la nueva suma acumulada
      const newSumaCalificaciones = sumaCalificaciones + parsedValue;
      setSumaCalificaciones(newSumaCalificaciones);
      console.log(newCalificaciones);
      console.log(sumaCalificaciones);
      console.log(user.calificado);
    } else if (value === "") {
      const newCalificaciones = [...calificaciones];
      newCalificaciones[index] = "";
      setCalificaciones(newCalificaciones);

      // Calcular la nueva suma acumulada
      const newSumaCalificaciones =
        sumaCalificaciones - parseInt(calificaciones[index] || 0);
      setSumaCalificaciones(newSumaCalificaciones);
      console.log(newCalificaciones);
      console.log(sumaCalificaciones);
    }
  };
  useEffect(() => {
    // This effect will run whenever `sumaCalificaciones` changes.
    // Here, you can call the `updateNotaSolicitud` function.
    const updateNota = async () => {
      try {
        const success = await updateNotaSolicitud(
          user.calificado,
          sumaCalificaciones
        );
        if (success) {
          console.log("Nota de solicitud actualizada con éxito");
        } else {
          console.error("Error al actualizar la nota de solicitud");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    updateNota();
  }, [sumaCalificaciones, user.calificado]);

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

              <TableCell style={{ minWidth: 300, textAlign: "justify" }}>
                {row.detalleTiempo.length > 1 ? (
                  <>
                    {row.detalleTiempo.map((minimo, i) => (
                      <TableRow key={i}>
                        <TableCell style={{ textAlign: "justify" }}>
                          {minimo}
                        </TableCell>
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
                        <TableCell>{minimo}</TableCell>
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
                      <TableCell style={{ textAlign: "justify" }}>
                        {titulo}
                      </TableCell>
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
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 2,
                    },
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
      {showPopup && (
        <Popup
          titulo="¡Atención!"
          mensaje="El valor ingresado está fuera de los rangos"
          //ruta="/tabla-candidatos" // Ajusta la ruta de redirección que deseas
          onClose={() => setShowPopup(false)} // Función para cerrar el Popup
        />
      )}
    </TableContainer>
  );
};
