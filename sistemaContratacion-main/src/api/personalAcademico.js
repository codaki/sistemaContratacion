import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirPersonalAcademico = () =>
  axios.get(`${API}/personalAcademico`, {
    withCredentials: true,
  });

export const crearPersonalAcademico = async (formData) => {
  try {
    const response = await axios.post(`${API}/personalAcademico`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Personal Académico creado con éxito");
      return true;
    } else {
      console.error("Error al crear el Personal Académico");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarPersonalAcademico = async (
  personalAcademico_id,
  formData
) => {
  try {
    const response = await axios.put(
      `${API}/personalAcademico/${personalAcademico_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(
        `Personal Académico con ID ${personalAcademico_id} actualizado con éxito`
      );
      return true;
    } else {
      console.error(
        `Error al actualizar el Personal Académico con ID ${personalAcademico_id}`
      );
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarPersonalAcademico = async (personalAcademico_id) => {
  try {
    const response = await axios.delete(
      `${API}/personalAcademico/${personalAcademico_id}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(
        `Personal Académico con ID ${personalAcademico_id} eliminado con éxito`
      );
      return true;
    } else {
      console.error(
        `Error al eliminar el Personal Académico con ID ${personalAcademico_id}`
      );
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
