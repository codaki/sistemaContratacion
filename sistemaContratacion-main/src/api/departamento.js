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
        console.error("Error al crear el departamento");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return false;
    }
  };
  
  export const editarDepartamento = async (id, formData) => {
    try {
      const response = await axios.put(`${API}/departamento/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        console.log("Departamento editado con éxito");
        return true;
      } else {
        console.error("Error al editar el departamento");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return false;
    }
  };
  
  export const eliminarDepartamento = async (id) => {
    try {
      const response = await axios.delete(`${API}/departamento/${id}`, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        console.log("Departamento eliminado con éxito");
        return true;
      } else {
        console.error("Error al eliminar el departamento");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return false;
    }
  };
  