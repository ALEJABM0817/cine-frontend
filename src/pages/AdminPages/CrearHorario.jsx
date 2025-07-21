import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSalas, createHorario } from '../../services/api';
import { toast } from 'react-toastify';

const CrearHorario = () => {
  const { id: peliculaId } = useParams();
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [fechaHora, setFechaHora] = useState('');
  const [salaId, setSalaId] = useState('');

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const data = await getSalas();
      setSalas(data);
    } catch (err) {
      console.error('Error al cargar salas:', err);
      toast.error('No se cargaron salas');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault(); 
    if (!fechaHora || !salaId) {
      return toast.error('Fecha/hora y sala son obligatorias');
    }
    try {
      const payload = {
        fecha: new Date(fechaHora).toISOString(),
        salaId,
        peliculaId
      };
      await createHorario(payload);
      toast.success('Horario creado');
      navigate('/admin/peliculas');
    } catch {
      toast.error('Error al crear horario');
    }
  };

  return (
    <form className="crear-horario" onSubmit={handleSubmit}>
      <h2>Agregar Horario</h2>
      <input
        type="datetime-local"
        value={fechaHora}
        onChange={e => setFechaHora(e.target.value)}
        required
      />
      <select value={salaId} onChange={e => setSalaId(e.target.value)} required>
        <option value="">Selecciona sala</option>
        {salas.map(sala => (
          <option key={sala.id} value={sala.id}>
            {sala.sede.nombre} – {sala.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Crear Horario</button>
    </form>
  );
};

export default CrearHorario;