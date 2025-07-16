import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PeliculaDetalle from '../pages/PeliculaDetalle';
import AdminPanel from '../pages/AdminPanel';
import ProtectedRoute from '../components/ProtectedRoute';

const App = () => {
  return (
  <BrowserRouter>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pelicula/:id" element={<PeliculaDetalle />} />

      {/* Área administrativa */}
      <Route element={<ProtectedRoute allowedRoles={['administrador']} />}>
        <Route path="/admin/panel" element={<AdminPanel />} />
        {/* Aquí puedes agregar más rutas protegidas */}
      </Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
