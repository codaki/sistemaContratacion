import axios from "axios";

const API = "http://localhost:8800/api";
export const registerRequest = (user) =>
  axios.post(`${API}/register`, user, {
    withCredentials: true,
  });

export const loginRequest = (user) =>
  axios.post(`${API}/login`, user, {
    withCredentials: true,
  });

export const verifyTokenRequest = () =>
  axios.get(`${API}/verify`, {
    withCredentials: true,
  });
export const obtenerUsuario = (id) =>
  axios.get(`${API}/obtenerUsuario/${id}`, {
    withCredentials: true,
  });
export const editarCandidato = (id, user) => {
  axios.put(`${API}/usuarios/${id}`, user, {
    withCredentials: true,
  });
};
export const getUsuariosRequest = () =>
  axios.get(`${API}/usuarios`, {
    withCredentials: true,
  });

export const getUsuarioApi = (id) =>
  axios.get(`${API}/getUsuario/${id}`, {
    withCredentials: true,
  });
export const getUsuarioCorreo = (id) =>
  axios.get(`${API}/getUsuarioC/${id}`, {
    withCredentials: true,
  });
