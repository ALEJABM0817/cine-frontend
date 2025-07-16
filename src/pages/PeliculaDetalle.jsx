import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PeliculaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const [sedesConHorarios, setSedesConHorarios] = useState([]);
  const [sedeExpandida, setSedeExpandida] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPelicula = await api.get(`/peliculas/${id}`);
        setPelicula(resPelicula.data);

        const resSedes = await api.get(`/peliculas/${id}/sedes-horarios`);
        setSedesConHorarios(resSedes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const manejarClickHorario = (idHorario) => {
    if (user) {
      navigate(`/comprar/${idHorario}`);
    } else {
      navigate('/login');
    }
  };

  const manejarExpandirSede = (sedeId) => {
    setSedeExpandida((prev) => (prev === sedeId ? null : sedeId));
  };

  if (!pelicula) return <p>Cargando película...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{pelicula.titulo}</h2>
      <img
        src={pelicula.imagenUrl}
        alt={pelicula.titulo}
        style={{ width: '200px', marginBottom: '1rem' }}
      />
      <p>{pelicula.descripcion}</p>

      <h3>Horarios disponibles</h3>
      {sedesConHorarios.map(({ sede, horarios }) => (
        <div key={sede.id}>
          <h4 onClick={() => manejarExpandirSede(sede.id)} style={{ cursor: 'pointer' }}>
            {sede.nombre}
          </h4>
          {sedeExpandida === sede.id && (
            <div style={{ paddingLeft: '1rem' }}>
              {horarios.map((h) => (
                <button
                  key={h.id}
                  onClick={() => manejarClickHorario(h.id)}
                  style={{
                    margin: '0.5rem',
                    backgroundColor: '#222',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                  }}
                >
                  {new Date(h.hora).toLocaleString('es-CO', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  - {h.sala.nombre}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PeliculaDetalle;
