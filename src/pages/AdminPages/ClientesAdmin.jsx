import React, { useEffect, useState } from 'react';
import { getClientes, habilitarCliente, inhabilitarCliente } from '../../services/api';
import { toast } from 'react-toastify';

const ClientesAdmin = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await getClientes();
      setClientes(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Error cargando clientes');
    }
  };

  const toggleActivo = async (id, activo) => {
    try {
      if (activo) {
        await habilitarCliente(id);
      } else {
        await inhabilitarCliente(id);
      }
      toast.success(`Cliente ${activo ? 'habilitado' : 'deshabilitado'} correctamente`);
      fetchClientes();
    } catch (err) {
      console.error(err);
      toast.error('Error al actualizar cliente');
    }
  };

  return (
    <div className="cliente-admin">
      <h2>Administrar Clientes</h2>
      <ul>
        {clientes.map(c => (
          <li key={c.id}>
            <span>{c.nombre} {c.apellido} - {c.email} - {c.activo ? 'Activo' : 'Inactivo'}</span>
            <button
              onClick={() => toggleActivo(c.id, !c.activo)}
              className="btn-toggle"
            >
              {c.activo ? 'Deshabilitar' : 'Habilitar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesAdmin;
