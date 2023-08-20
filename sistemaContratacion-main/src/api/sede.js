import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirSede = () =>
  axios.get(`${API}/sede`, {
    withCredentials: true,
  });

export const crearSede = async (formData) => {
  try {
    const response = await axios.post(`${API}/sede`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Sede creada con éxito");
      return true;
    } else {
      console.error("Error al crear la sede");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarSede = async (sede_id, formData) => {
  try {
    const response = await axios.put(`${API}/sede/${sede_id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log(`Sede con ID ${sede_id} actualizada con éxito`);
      return true;
    } else {
      console.error(`Error al actualizar la sede con ID ${sede_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarSede = async (sede_id) => {
  try {
    const response = await axios.delete(`${API}/sede/${sede_id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log(`Sede con ID ${sede_id} eliminada con éxito`);
      return true;
    } else {
      console.error(`Error al eliminar la sede con ID ${sede_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
