import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PeliculaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const [sedesConHorarios, setSedesConHorarios] = useState([]);
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
      navigate('/login', { state: { from: `/comprar/${idHorario}` } });
    }
  };

  if (!pelicula) return <p>Cargando película...</p>;

  return (
    <div className="pelicula-detalle">
      <h2>{pelicula.titulo}</h2>
      <img src={pelicula.imagenUrl} alt={pelicula.titulo} />
      <p>{pelicula.descripcion}</p>
      <p><strong>Precio:</strong> ${pelicula.precio.toFixed(0)}</p>
      <h3 className="horarios-title">Horarios disponibles</h3>
      {sedesConHorarios.map(({ sede, horarios }) => (
        <div key={sede.id} className="horarios-section">
          <h4>{sede.nombre}</h4>
          <div className="horarios-list">
            {horarios.map((h) => (
              <button
                key={h.id}
                onClick={() => manejarClickHorario(h.id)}
                className="horario-button"
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
        </div>
      ))}
    </div>
  );
};

export default PeliculaDetalle;
