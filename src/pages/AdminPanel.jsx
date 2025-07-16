import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <nav>
        <Link to="/admin/salas">Salas</Link>
        <Link to="/admin/sedes">Sedes</Link>
        <Link to="/admin/peliculas">Películas</Link>
      </nav>
    </div>
  );
};

export default AdminPanel;
