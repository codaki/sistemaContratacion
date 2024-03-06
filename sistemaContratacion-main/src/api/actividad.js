import axios from "axios";

const API = "http://localhost:8800/api";
export const pedirActividad = () =>axios.get(`${API}/actividad`,{
    withCredentials: true,
  }); 

export const cambiarEstadoActividad = async (act_id, estado) => {
  try {
    const response = await axios.put(
      `${API}/actividad1/${act_id}`,
      { act_estado: estado },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(
        `Estado de la actividad con ID ${act_id} actualizado con éxito`
      );
      return true;
    }
  }
  catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
}

export const crearActividad = async (formData) => {
  try {
    const response = await axios.post(`${API}/actividad`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Actividad creada con éxito");
      return true;
    } else {
      console.error("Error al crear la actividad");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};