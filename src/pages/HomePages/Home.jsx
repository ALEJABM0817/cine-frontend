import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredPeliculas = peliculas.filter(
    (pelicula) =>
      pelicula.estado &&
      pelicula.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Películas Disponibles</h1>
      <input
        type="text"
        placeholder="Buscar película..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredPeliculas.length === 0 ? (
        <p>No hay películas disponibles</p>
      ) : (
        <div className="peliculas-grid">
          {filteredPeliculas.map((pelicula) => (
            <div key={pelicula.id} className="pelicula-card">
              <img src={pelicula.imagenUrl} alt={pelicula.titulo} width="200" />
              <h3>{pelicula.titulo}</h3>
              <p>{pelicula.descripcion}</p>
              <button className="btn-view" onClick={() => verDetalles(pelicula)}>Ver más</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
