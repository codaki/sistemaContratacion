import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirCampoEspecifico = () =>
  axios.get(`${API}/campoEspecifico`, {
    withCredentials: true,
  });

export const crearCampoEspecifico = async (formData) => {
  try {
    const response = await axios.post(`${API}/campoEspecifico`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Campo específico creado con éxito");
      return true;
    } else {
      console.error("Error al crear el campo específico");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarCampoEspecifico = async (ce_id, formData) => {
  try {
    const response = await axios.put(`${API}/campoEspecifico/${ce_id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log("Campo específico editado con éxito");
      return true;
    } else {
      console.error("Error al editar el campo específico");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarCampoEspecifico = async (ce_id) => {
  try {
    const response = await axios.delete(`${API}/campoEspecifico/${ce_id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log("Campo específico eliminado con éxito");
      return true;
    } else {
      console.error("Error al eliminar el campo específico");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
