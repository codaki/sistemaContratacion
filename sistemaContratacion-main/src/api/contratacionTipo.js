import axios from "axios";

const API = "http://localhost:8800/api";
export const pedirContratacion = () =>axios.get(`${API}/contratacion`,{
    withCredentials: true,
  }); 

  export const crearContratacionTipo = async (formData) => {
    try {
      const response = await axios.post(`${API}/contratacion`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (response.status === 201) {
        console.log("Contratación creada con éxito");
        return true;
      } else {
        console.error("Error al crear la contratación");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return false;
    }
  };
  
  export const editarContratacionTipo = async (con_id, formData) => {
    try {
      const response = await axios.put(`${API}/contratacion/${con_id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        console.log("Contratación editada con éxito");
        return true;
      } else {
        console.error("Error al editar la contratación");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return false;
    }
  };
  
  export const eliminarContratacionTipo = async (con_id) => {
    try {
      const response = await axios.delete(`${API}/contratacion/${con_id}`, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        console.log("Contratación eliminada con éxito");
        return true;
      } else {
        console.error("Error al eliminar la contratación");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return false;
    }
  };
  