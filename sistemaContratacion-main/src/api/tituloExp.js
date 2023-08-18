import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirTituloExp = () =>
  axios.get(`${API}/tituloExp`, {
    withCredentials: true,
  });

export const crearTituloExp = async (formData) => {
  try {
    const response = await axios.post(`${API}/titulo_exp`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Título de Experiencia creado con éxito");
      return true;
    } else {
      console.error("Error al crear el Título de Experiencia");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarTituloExp = async (tx_id, formData) => {
  try {
    const response = await axios.put(`${API}/titulo_exp/${tx_id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log(
        `Título de Experiencia con ID ${tx_id} actualizado con éxito`
      );
      return true;
    } else {
      console.error(
        `Error al actualizar el Título de Experiencia con ID ${tx_id}`
      );
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarTituloExp = async (tx_id) => {
  try {
    const response = await axios.delete(`${API}/titulo_exp/${tx_id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      console.log(`Título de Experiencia con ID ${tx_id} eliminado con éxito`);
      return true;
    } else {
      console.error(
        `Error al eliminar el Título de Experiencia con ID ${tx_id}`
      );
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
