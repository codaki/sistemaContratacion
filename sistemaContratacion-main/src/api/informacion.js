import axios from "axios";

const API = "http://localhost:8800/api";

export const subirInformacion = async (formData) => {
  try {
    const response = await axios.post(`${API}/informacion/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      console.log("Información subida con éxito");
      return true;
    } else {
      console.error("Error al subir la información");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const obtenerArchivos = async () => {
  try {
    const response = await axios.get(`${API}/informacion/files`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los archivos:", error);
    return [];
  }
};

export const obtenerArchivosPorPostulacion = async (idPostulation) => {
  try {
    const response = await axios.get(
      `${API}/files/postulacion/${idPostulation}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los archivos:", error);
    return [];
  }
};

export const obtenerArchivo = async (fileId) => {
  try {
    const response = await axios.get(`${API}/informacion/files/${fileId}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el archivo:", error);
    return null;
  }
};
