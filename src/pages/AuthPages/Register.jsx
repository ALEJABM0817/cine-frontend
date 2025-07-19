import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerCliente } from '../../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).some(value => !value.trim())) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
    if (form.contraseña !== form.confirmarContraseña) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      await registerCliente(form);
      toast.success('Registro exitoso. Por favor inicia sesión.');
      navigate('/login');
    } catch (err) {
      console.error('Error al registrar cliente:', err);
      toast.error(err.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="register">
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmarContraseña"
            placeholder="Confirmar Contraseña"
            value={form.confirmarContraseña}
            onChange={handleChange}
            required
          />
        </div>
        <Link to="/login" className="link-login">¿Ya tienes cuenta? Inicia sesión</Link>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
