import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHorario, createCompra } from '../../services/api';
import { toast } from 'react-toastify';

const Comprar = () => {
  const { horarioId } = useParams();
  const navigate = useNavigate();
  const [horario, setHorario] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchHorario = async () => {
      try {
        const res = await getHorario(horarioId);
        setHorario(res.data);
      } catch (err) {
        console.error('Error al cargar horario:', err);
        toast.error('No se pudo cargar el horario');
      }
    };
    fetchHorario();
  }, [horarioId]);

  const precioTotal = horario?.pelicula?.precio ? cantidad * horario.pelicula.precio : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardName.trim() || !cvv.trim()) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
    if (cardNumber.replace(/\s+/g, '').length !== 16) {
      toast.error('El número de tarjeta debe tener 16 dígitos');
      return;
    }
    if (cantidad < 1 || cantidad > horario?.sala.capacidad) {
      toast.error('Cantidad de boletos inválida');
      return;
    }

    setLoading(true);
    try {
      await createCompra({
        clienteId: user.id,
        peliculaId: horario.pelicula?.id,
        horarioId: horario.id,
        cantidadBoletos: cantidad,
        precioTotal,
      });
      toast.success('Compra realizada exitosamente');
      navigate('/');
    } catch (err) {
      console.error('Error al crear compra:', err);
      toast.error('No se pudo procesar la compra');
    } finally {
      setLoading(false);
    }
  };

  if (!horario) return <p>Cargando datos de compra...</p>;

  return (
    <div className="comprar">
      <h2>Comprar Boletos</h2>
      <div className="schedule-info">
        <p><strong>Película:</strong> {horario.pelicula?.titulo}</p>
        <p><strong>Sala:</strong> {horario.sala.nombre}</p>
        <p><strong>Hora:</strong> {new Date(horario.fecha).toLocaleString()}</p>
        <p><strong>Cantidad de boletos disponibles:</strong> {horario.asientosDisponibles}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Número de tarjeta:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="form-group">
          <label>Nombre (como aparece en la tarjeta):</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>CVC:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
            placeholder="123"
          />
        </div>
        <div className="form-group">
          <label>Cantidad de boletos:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            min={1}
            max={horario.sala.capacidad}
          />
        </div>
        {/* Mostrar precio total */}
        <div className="form-group">
          <label>Precio Total:</label>
          <span>${precioTotal.toFixed(0)}</span>
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Procesar Pago'}
        </button>
      </form>
    </div>
  );
};

export default Comprar;
