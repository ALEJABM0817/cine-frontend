import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPeliculas = () => API.get('/peliculas');
export const getHorariosPorSede = (id) => API.get(`/peliculas/${id}/sedes-horarios`);
export const login = (email, password) => API.post('/auth/login', { email, password });

export default API;
