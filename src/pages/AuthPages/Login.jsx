import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, contraseña);
      const { access_token, user, role } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);

      const redirectTo = location.state?.from;
      if (redirectTo) {
        navigate(redirectTo);
      } else if (role === 'administrador') {
        navigate('/admin/panel');
      } else {
        navigate('/');
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <Link to="/register" className="link-register">¿No tienes cuenta? Regístrate aquí</Link>
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
