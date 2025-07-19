import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SedeAdmin = () => {
  const [nombreSede, setNombreSede] = useState('');
  const [salas, setSalas] = useState([{ nombre: '', capacidad: '' }]);
  const [sedesList, setSedesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/sedes').then((res) => setSedesList(res.data));
  }, []);

  const handleSalaChange = (index, field, value) => {
    const nuevasSalas = [...salas];
    nuevasSalas[index][field] = value;
    setSalas(nuevasSalas);
  };

  const agregarOtraSala = () => {
    setSalas([...salas, { nombre: '', capacidad: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreSede.trim()) {
      toast.error('El nombre de la sede es obligatorio');
      return;
    }
    const salasValidas = salas.every((s) => s.nombre.trim() && s.capacidad);
    if (!salasValidas) {
      toast.error('Todas las salas deben tener nombre y capacidad válidos');
      return;
    }

    const data = {
      nombre: nombreSede,
      salas: salas.map((s) => ({
        nombre: s.nombre,
        capacidad: parseInt(s.capacidad, 10),
      })),
    };

    try {
      await api.post('/sedes', data);
      toast.success('Sede creada exitosamente');
      const res = await api.get('/sedes');
      setSedesList(res.data);
      setNombreSede('');
      setSalas([{ nombre: '', capacidad: '' }]);
      navigate('/admin/sedes');
    } catch (error) {
      console.error('Error al crear sede:', error);
      toast.error('Hubo un error al crear la sede');
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
