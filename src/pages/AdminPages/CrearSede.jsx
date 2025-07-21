import React, { useState } from 'react';
import { createSede } from '../../services/api';
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
    if (!nombre.trim()) {
      toast.error('El nombre de la sede es obligatorio');
      return;
    }
    const salasValidas = salas.every(s => s.nombre.trim() && s.capacidad);
    if (!salasValidas) {
      toast.error('Todas las salas deben tener nombre y capacidad válidos');
      return;
    }
    try {
      await createSede({ nombre, salas });
      toast.success('Sede creada');
      navigate('/admin/sedes');
    } catch {
      toast.error('Error al crear sede');
    }
  };

  return (
    <form className="crear-sede" onSubmit={handleSubmit}>
      <h2>Crear Sede</h2>
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre sede"  />

      <h3>Salas</h3>
      {salas.map((s, i) => (
        <div key={i} className="sala-group">
          <input placeholder="Nombre sala" value={s.nombre} onChange={e => handleSalaChange(i, 'nombre', e.target.value)} />
          <input type="number" placeholder="Capacidad" value={s.capacidad} onChange={e => handleSalaChange(i, 'capacidad', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={agregarSala}>Agregar otra sala</button>
      <button type="submit">Crear sede</button>
    </form>
  );
}

export default CrearSede;
