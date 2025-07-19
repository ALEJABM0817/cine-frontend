import React, { useEffect, useState } from 'react';
import { getCompras } from '../../services/api';
import { toast } from 'react-toastify';

const AdminCompras = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    fetchCompras();
  }, []);

  const fetchCompras = async () => {
    try {
      const res = await getCompras();
      setCompras(res.data);
    } catch (err) {
      console.error('Error cargando compras:', err);
      toast.error('Error al cargar compras');
    }
  };

  return (
    <div className="compras-admin">
      <h2>Listado de Compras</h2>
      <div className="compras-grid">
        {compras.map(compra => (
          <div key={compra.id} className="compra-card">
            <p><strong>Cliente:</strong> {compra.cliente?.nombre} {compra.cliente?.apellido}</p>
            <p><strong>Película:</strong> {compra.horario?.pelicula?.titulo}</p>
            <p><strong>Cantidad:</strong> {compra.cantidadBoletos}</p>
            <p><strong>Fecha:</strong> {new Date(compra.fechaCompra).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCompras;
