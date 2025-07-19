import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPelicula, updatePelicula } from '../../services/api';
import { toast } from 'react-toastify';

const EditarPelicula = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: '', descripcion: '', duracion: '', precio: '' });
  const [imagen, setImagen] = useState(null);
  const [habilitado, setHabilitado] = useState(false);
  const [originalHabilitado, setOriginalHabilitado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPelicula(id);
        setForm({
          titulo: data.titulo || '',
          descripcion: data.descripcion || '',
          duracion: data.duracion || '',
          precio: data.precio != null ? data.precio : ''
        });
        setHabilitado(data.estado);
        setOriginalHabilitado(data.estado);
      } catch (err) {
        console.error('Error al cargar película:', err);
        toast.error('No se pudo cargar la película');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleImage = e => setImagen(e.target.files[0]);
  const handleToggle = () => setHabilitado(prev => !prev);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.descripcion.trim() || !form.precio) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('descripcion', form.descripcion);
    formData.append('duracion', form.duracion);
    formData.append('precio', form.precio);
    if (imagen) formData.append('imagen', imagen);
    if (habilitado !== originalHabilitado) {
      formData.append('estado', habilitado);
    }

    setSaving(true);
    try {
      await updatePelicula(id, formData);
      toast.success('Película actualizada correctamente');
      navigate('/admin/peliculas');
    } catch (err) {
      console.error('Error al actualizar:', err);
      toast.error('No se pudo actualizar la película');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div className="editar-pelicula">
      <h2>Editar Película</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div>
          <label>Imagen (opcional):</label>
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={habilitado}
              onChange={handleToggle}
            />{' '}
            Estado
          </label>
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <button type="submit" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default EditarPelicula;
