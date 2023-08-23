import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirOferta = () =>
  axios.get(`${API}/oferta`, {
    withCredentials: true,
  });

export const crearOferta = async (formData) => {
  try {
    const response = await axios.post(`${API}/oferta`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      console.log("Oferta creada con éxito");
      return true;
    } else {
      console.error("Error al crear la oferta");
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const editarOferta = async (oferta_id, formData) => {
  try {
<<<<<<< HEAD
    const response = await axios.put(`${API}/oferta/${oferta_id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
=======
    const response = await axios.put(
      `${API}/oferta/${oferta_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
>>>>>>> 0c4dff7ec23facfd402a9b1da8c626e762224eec

    if (response.status === 200) {
      console.log(`Oferta con ID ${oferta_id} actualizada con éxito`);
      return true;
    } else {
      console.error(`Error al actualizar la oferta con ID ${oferta_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};

export const eliminarOferta = async (oferta_id) => {
  try {
<<<<<<< HEAD
    const response = await axios.delete(`${API}/oferta/${oferta_id}`, {
      withCredentials: true,
    });
=======
    const response = await axios.delete(
      `${API}/oferta/${oferta_id}`,
      {
        withCredentials: true,
      }
    );
>>>>>>> 0c4dff7ec23facfd402a9b1da8c626e762224eec

    if (response.status === 200) {
      console.log(`Oferta con ID ${oferta_id} eliminada con éxito`);
      return true;
    } else {
      console.error(`Error al eliminar la oferta con ID ${oferta_id}`);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return false;
  }
};
