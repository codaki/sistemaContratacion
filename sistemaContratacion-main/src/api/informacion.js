import axios from "axios";

const API = "http://localhost:8800/api";

export const subirInformacion = async (formData) => {
  try {
<<<<<<< HEAD
    const response = await axios.post(`${API}/informacion/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
=======
    const response = await axios.post(
      `${API}/informacion/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
>>>>>>> 0c4dff7ec23facfd402a9b1da8c626e762224eec

    if (response.status === 200) {
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
