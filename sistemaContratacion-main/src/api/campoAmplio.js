import axios from "axios";

const API = "http://localhost:8800/api";
export const pedirCampoAmplio = () =>axios.get(`${API}/campoAmplio`,{
    withCredentials: true,
  }); 

export const cambiarEstadoCampoAmplio = async (cam_id, estado) => {
  try {
    const response = await axios.put(
      `${API}/campoAmplio1/${cam_id}`,
      { ca_estado: estado },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(
        `Estado del campo amplio con ID ${cam_id} actualizado con éxito`
      );
      return true;
    }
  }
  catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
}

export const crearCampoAmplio = async (formData) => {
  try {
    const response = await axios.post(`${API}/campoAmplio`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Campo amplio creado con éxito");
      return true;
    } else {
      console.error("Error al crear el campo amplio");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
}