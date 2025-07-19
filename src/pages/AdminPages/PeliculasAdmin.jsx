import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const PeliculasAdmin = () => {
  const [peliculas, setPeliculas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const cargarPeliculas = async () => {
    const res = await api.get("/peliculas");
    setPeliculas(res.data);
  };

  const cambiarEstado = async (id, habilitar) => {
    const endpoint = habilitar
      ? `/peliculas/${id}/habilitar`
      : `/peliculas/${id}/inhabilitar`;
    try {
      await api.patch(endpoint);
      toast.success(
        habilitar
          ? 'Película habilitada correctamente'
          : 'Película deshabilitada correctamente'
      );
      cargarPeliculas();
    } catch (err) {
      console.error('Error al cambiar estado de película:', err);
      toast.error(
        habilitar
          ? 'Error al habilitar la película'
          : 'Error al deshabilitar la película'
      );
    }
  };

  return (
    <div className="peliculas-admin">
      <h2>Administrar Películas</h2>
      <ul>
        {peliculas.map((p) => (
          <li key={p.id}>
            <span><strong>{p.titulo}</strong> - {p.estado ? "✅ Habilitada" : "⛔ Inhabilitada"}</span>
            <div className="actions">
              <button onClick={() => cambiarEstado(p.id, !p.estado)}>
                {p.estado ? "Deshabilitar" : "Habilitar"}
              </button>
              <button onClick={() => navigate(`/admin/peliculas/editar/${p.id}`)}>
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

    <button className="btn-create" onClick={() => navigate('/admin/peliculas/crear')}>Crear Película</button>
    </div>
  );
};

export default PeliculasAdmin;
