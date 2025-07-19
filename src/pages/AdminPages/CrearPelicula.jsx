import React, { useState, useEffect } from 'react';
import API, { createPelicula } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CrearPelicula() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', descripcion: '', precio: '' });
  const [imagen, setImagen] = useState(null);
  const [horarios, setHorarios] = useState([{ fechaHora: '', salaId: '' }]);
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get('/salas').then(res => setSalas(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImagen = e => setImagen(e.target.files[0]);

  const handleHorarioChange = (index, field, value) => {
    const updated = [...horarios];
    updated[index][field] = value;
    setHorarios(updated);
  };

  const agregarHorario = () => {
    setHorarios([...horarios, { fechaHora: '', salaId: '' }]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!form.titulo || !form.descripcion || !form.precio) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
    
    if (!imagen) {
      toast.error('Debe seleccionar una imagen');
      return;
    }
    
    const horariosCompletos = horarios.every(h => h.fechaHora && h.salaId);
    if (!horariosCompletos) {
      toast.error('Todos los horarios deben tener fecha/hora y sala asignada');
      return;
    }
    
    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('descripcion', form.descripcion);
    formData.append('precio', form.precio);
    formData.append('imagen', imagen);

    setLoading(true);
    try {
      const nuevaPelicula = await createPelicula(formData);
      const peliculaId = nuevaPelicula.id;

      for (const h of horarios) {
        await API.post('/horarios', {
          fecha: new Date(h.fechaHora).toISOString(),
          peliculaId,
          salaId: h.salaId
        });
      }

      toast.success('Película y horarios creados');
      navigate('/admin/peliculas');
    } catch (err) {
      toast.error(`Error al crear película: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="crear-pelicula" onSubmit={handleSubmit}>
      <h2>Crear Película</h2>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required rows="4" />
      <input
        name="precio"
        type="number"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
      <input type="file" accept="image/*" onChange={handleImagen} required />

      <h3>Horarios</h3>
      {horarios.map((h, i) => (
        <div key={i} className="horario-group">
          <input
            type="datetime-local"
            value={h.fechaHora}
            onChange={e => handleHorarioChange(i, 'fechaHora', e.target.value)}
            required
          />
          <select value={h.salaId} onChange={e => handleHorarioChange(i, 'salaId', e.target.value)} required>
            <option value="">Selecciona una sala</option>
            {salas.map(s => (
              <option key={s.id} value={s.id}>{s.sede.nombre} - {s.nombre}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" onClick={agregarHorario}>Agregar otro horario</button>
      <button type="submit" disabled={loading}>
        {loading ? 'Procesando...' : 'Crear'}
      </button>
    </form>
  );
}

export default CrearPelicula;
