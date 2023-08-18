import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirSolicitud = () =>
  axios.get(`${API}/solicitud`, {
    withCredentials: true,
  });

export const crearSolicitud = async (formData) => {
  try {
    const response = await axios.post(`${API}/solicitud`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Solicitud creada con éxito");
      return true;
    } else {
      console.error("Error al crear la solicitud");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarSolicitud = async (solicitud_id, formData) => {
  try {
    const response = await axios.put(
      `${API}/solicitud/${solicitud_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(`Solicitud con ID ${solicitud_id} actualizada con éxito`);
      return true;
    } else {
      console.error(`Error al actualizar la solicitud con ID ${solicitud_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarSolicitud = async (solicitud_id) => {
  try {
    const response = await axios.delete(`${API}/solicitud/${solicitud_id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log(`Solicitud con ID ${solicitud_id} eliminada con éxito`);
      return true;
    } else {
      console.error(`Error al eliminar la solicitud con ID ${solicitud_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
