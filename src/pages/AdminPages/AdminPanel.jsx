import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <h2>Admin</h2>
        <nav>
        <ul className="nav-list">
            <li><Link to="/admin/salas" className="nav-link">Salas</Link></li>
            <li><Link to="/admin/sedes" className="nav-link">Sedes</Link></li>
            <li><Link to="/admin/peliculas" className="nav-link">Películas</Link></li>
            <li><Link to="/admin/clientes" className="nav-link">Clientes</Link></li>
            <li><Link to="/admin/compras" className="nav-link">Compras</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
