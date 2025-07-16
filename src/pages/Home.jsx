import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await api.get('/peliculas');
        setPeliculas(response.data);
      } catch (error) {
        console.error('Error cargando películas:', error);
      }
    };
    fetchPeliculas();
  }, []);

  const verDetalles = (pelicula) => {
    navigate(`/pelicula/${pelicula.id}`, { state: { pelicula } });
  };

  return (
    <div>
      <h1>Películas Disponibles</h1>
      <div>
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
            <img src={pelicula.imagenUrl} alt={pelicula.titulo} width="200" />
            <h3>{pelicula.titulo}</h3>
            <p>{pelicula.descripcion}</p>
            <button onClick={() => verDetalles(pelicula)}>Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
