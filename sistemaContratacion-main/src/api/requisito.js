import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirRequisitos = () =>
  axios.get(`${API}/requisito`, {
    withCredentials: true,
  });

export const crearRequisito = async (formData) => {
  try {
    const response = await axios.post(`${API}/requisito`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Requisito creado con éxito");
      return true;
    } else {
      console.error("Error al crear el requisito");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarRequisito = async (requisito_id, formData) => {
  try {
    const response = await axios.put(
      `${API}/requisito/${requisito_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(`Requisito con ID ${requisito_id} actualizado con éxito`);
      return true;
    } else {
      console.error(`Error al actualizar el requisito con ID ${requisito_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarRequisito = async (requisito_id) => {
  try {
    const response = await axios.delete(
      `${API}/requisito/${requisito_id}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(`Requisito con ID ${requisito_id} eliminado con éxito`);
      return true;
    } else {
      console.error(`Error al eliminar el requisito con ID ${requisito_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
