import axios from "axios";

const API = "http://localhost:8800/api";
export const pedirPostulaciones = () =>
  axios.get(`${API}/postulacion`, {
    withCredentials: true,
  });

export const cambiarEstadoPostulacion = async (postulacion_id, estado) => {
  try {
    const response = await axios.put(
      `${API}/postulacion1/${postulacion_id}`,
      { post_estado: estado },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(
        `Estado de la postulación con ID ${postulacion_id} actualizado con éxito`
      );
      return true;
    }
  }
  catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
}

export const crearPostulacion = async (formData) => {
  try {
    const response = await axios.post(`${API}/postulacion`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Postulación creada con éxito");
      return true;
    } else {
      console.error("Error al crear la postulación");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarPostulacion = async (postulacion_id, formData) => {
  try {
    const response = await axios.put(
      `${API}/postulacion/${postulacion_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(`Postulación con ID ${postulacion_id} actualizada con éxito`);
      return true;
    } else {
      console.error(
        `Error al actualizar la postulación con ID ${postulacion_id}`
      );
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarPostulacion = async (postulacion_id) => {
  try {
    const response = await axios.delete(
      `${API}/postulacion/${postulacion_id}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(`Postulación con ID ${postulacion_id} eliminada con éxito`);
      return true;
    } else {
      console.error(
        `Error al eliminar la postulación con ID ${postulacion_id}`
      );
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
