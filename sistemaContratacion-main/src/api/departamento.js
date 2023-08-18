import axios from "axios";

const API = "http://localhost:8800/api";
export const pedirDepartamento = () =>
  axios.get(`${API}/departamento`, {
    withCredentials: true,
  });

export const crearDepartamento = async (formData) => {
  try {
    const response = await axios.post(`${API}/departamento`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Departamento creado con éxito");
      return true;
    } else {
      console.error("Error al crear el Departamento");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
