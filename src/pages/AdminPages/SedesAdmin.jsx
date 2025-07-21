import { useState, useEffect } from 'react';
import { getSedes } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SedeAdmin = () => {
  const [sedesList, setSedesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSedes();
  }, []);

  const fetchSedes = async () => {
    try {
      const data = await getSedes();
      setSedesList(data);
    } catch (err) {
      console.error('Error al cargar sedes:', err);
    }
  };

  return (
    <div className="sedes-admin">
      <h2>Listado de Sedes</h2>
      <ul>
        {sedesList.map((sede) => (
          <li key={sede.id}>{sede.nombre}</li>
        ))}
      </ul>

      <button className="btn-create" onClick={() => navigate('/admin/sedes/crear')}>
        Crear Sede
      </button>
    </div>
  );
};

export default SedeAdmin;
