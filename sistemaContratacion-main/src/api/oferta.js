import axios from "axios";

const API = "http://localhost:8800/api";

export const pedirOferta = () =>
  axios.get(`${API}/oferta`, {
    withCredentials: true,
  });

  export const postulacionUnica = () =>
  axios.get(`${API}/postulacionUnica`, {
    withCredentials: true,
  });
  export const contratacionUnica = (post_id)=> 
  axios.get(`${API}/contratacionUnica/${post_id}`, {
    withCredentials: true,
  });
  export const sedeUnica = (post_id,con_id)=>
  axios.get(`${API}/sedeUnica/${post_id}/${con_id}`, {
    withCredentials: true,
  });
  export const departamentoUnico = (post_id,con_id,sede_id)=>
  axios.get(`${API}/departamentoUnico/${post_id}/${con_id}/${sede_id}`, {
    withCredentials: true,
  });
  export const campoAmplioUnico = (post_id,con_id,sede_id,dept_id)=>
  axios.get(`${API}/campoAmplioUnico/${post_id}/${con_id}/${sede_id}/${dept_id}`, {
    withCredentials: true,
  });
  export const campoEspecificoUnico = (post_id,con_id,sede_id,dept_id,ca_id)=>
  axios.get(`${API}/campoEspecificoUnico/${post_id}/${con_id}/${sede_id}/${dept_id}/${ca_id}`, {
    withCredentials: true,
  });
  export const personalUnico = (post_id,con_id,sede_id,dept_id,ca_id,ce_id)=>
  axios.get(`${API}/personalUnico/${post_id}/${con_id}/${sede_id}/${dept_id}/${ca_id}/${ce_id}`, {
    withCredentials: true,
  });
  export const actividadUnica = (post_id,con_id,sede_id,dept_id,ca_id,ce_id,pa_id)=>
  axios.get(`${API}/actividadUnica/${post_id}/${con_id}/${sede_id}/${dept_id}/${ca_id}/${ce_id}/${pa_id}`, {
    withCredentials: true,
  });
  export const obtenerOferta = (post_id,con_id,sede_id,dept_id,ca_id,ce_id,pa_id,act_id)=>
  axios.get(`${API}/obtenerOferta/${post_id}/${con_id}/${sede_id}/${dept_id}/${ca_id}/${ce_id}/${pa_id}/${act_id}`, {
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
    const response = await axios.put(`${API}/oferta/${oferta_id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

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
    const response = await axios.delete(`${API}/oferta/${oferta_id}`, {
      withCredentials: true,
    });

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
