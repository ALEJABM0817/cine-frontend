import axios from "axios";
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  console.log('→ Authorization:', token)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      toast.error('Sesión expirada. Por favor inicia sesión de nuevo');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getPeliculas = () => API.get("/peliculas");
export const getHorariosPorSede = (id) =>
  API.get(`/peliculas/${id}/sedes-horarios`);
export const login = (email, password) =>
  API.post("/auth/login", { email, password });

export const createPelicula = async (formData) => {
  const response = await API.post("/peliculas", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const registerCliente = (data) => API.post("/clientes", data);
export const getClientes = () => API.get("/admin/clientes");
export const getCompras = () => API.get("/compras");
export const createCompra = (data) => API.post("/compras", data);
export const getHorario = (id) => API.get(`/horarios/${id}`);

export const habilitarCliente = async (id) =>
  (await API.patch(`/admin/clientes/${id}/habilitar`)).data;

export const inhabilitarCliente = async (id) =>
  (await API.patch(`/admin/clientes/${id}/inhabilitar`)).data;

export const habilitarPelicula = async (id) =>
  (await API.patch(`/peliculas/${id}/habilitar`)).data;

export const inhabilitarPelicula = async (id) =>
  (await API.patch(`/peliculas/${id}/inhabilitar`)).data;

export const getPelicula = async (id) => {
  const response = await API.get(`/peliculas/${id}`);
  return response.data;
};

export const updatePelicula = async (id, formData) => {
  const response = await API.put(`/peliculas/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export default API;
