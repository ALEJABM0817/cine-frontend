import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import RequireAuth from '../components/RequireAuth';
import Home from '../pages/HomePages/Home';
import Login from '../pages/AuthPages/Login';
import PeliculaDetalle from '../pages/HomePages/PeliculaDetalle';
import AdminPanel from '../pages/AdminPages/AdminPanel';
import ProtectedRoute from '../components/ProtectedRoute';
import SalasAdmin from '../pages/AdminPages/SalasAdmin';
import SedesAdmin from '../pages/AdminPages/SedesAdmin';
import PeliculasAdmin from '../pages/AdminPages/PeliculasAdmin';
import CrearPelicula from '../pages/AdminPages/CrearPelicula';
import CrearSede from '../pages/AdminPages/CrearSede';
import Register from '../pages/AuthPages/Register';
import Navbar from '../components/Navbar';
import EditarPelicula from '../pages/AdminPages/EditarPelicula';
import ClientesAdmin from '../pages/AdminPages/ClientesAdmin';
import ComprasAdmin from '../pages/AdminPages/ComprasAdmin';
import Comprar from '../pages/CompraPages/Comprar';
import CrearHorario from '../pages/AdminPages/CrearHorario';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      <Route path="/pelicula/:id" element={<PeliculaDetalle />} />
      <Route
        path="/comprar/:horarioId"
        element={
          <RequireAuth>
            <Comprar />
          </RequireAuth>
        }
      />

      <Route element={<ProtectedRoute allowedRoles={['administrador']} />}>
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/admin/salas" element={<SalasAdmin />} />
        <Route path="/admin/sedes" element={<SedesAdmin />} />
        <Route path="/admin/sedes/crear" element={<CrearSede />} />
        <Route path="/admin/peliculas" element={<PeliculasAdmin />} />
        <Route path="/admin/peliculas/crear" element={<CrearPelicula />} />
        <Route path="/admin/peliculas/editar/:id" element={<EditarPelicula />} />
        <Route path="/admin/peliculas/:id/horarios/crear" element={<CrearHorario />} />
        <Route path="/admin/clientes" element={<ClientesAdmin />} />
        <Route path="/admin/compras" element={<ComprasAdmin />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
