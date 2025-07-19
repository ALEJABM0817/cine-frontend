import React, { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CrearSede() {
  const [nombre, setNombre] = useState('');
  const [salas, setSalas] = useState([{ nombre: '', capacidad: '' }]);
  const navigate = useNavigate();

  const handleSalaChange = (index, field, value) => {
    const updated = [...salas];
    updated[index][field] = value;
    setSalas(updated);
  };

  const agregarSala = () => {
    setSalas([...salas, { nombre: '', capacidad: '' }]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/sedes', { nombre, salas });
      toast.success('Sede creada');
      navigate('/admin/sedes');
    } catch {
      toast.error('Error al crear sede');
    }
  };

  return (
    <form className="crear-sede" onSubmit={handleSubmit}>
      <h2>Crear Sede</h2>
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre sede" required />

      <h3>Salas</h3>
      {salas.map((s, i) => (
        <div key={i} className="sala-group">
          <input placeholder="Nombre sala" value={s.nombre} onChange={e => handleSalaChange(i, 'nombre', e.target.value)} required />
          <input type="number" placeholder="Capacidad" value={s.capacidad} onChange={e => handleSalaChange(i, 'capacidad', e.target.value)} required />
        </div>
      ))}
      <button type="button" onClick={agregarSala}>Agregar otra sala</button>
      <button type="submit">Crear sede</button>
    </form>
  );
}

export default CrearSede;
