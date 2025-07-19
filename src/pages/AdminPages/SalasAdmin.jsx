import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

const SalasAdmin = () => {
  const [salas, setSalas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [sedeId, setSedeId] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    cargarSalas();
    cargarSedes();
  }, []);

  const cargarSalas = async () => {
    const res = await api.get("/salas");
    setSalas(res.data);
  };

  const cargarSedes = async () => {
    const res = await api.get("/sedes");
    setSedes(res.data);
  };

  const agregarSala = async () => {
    if (!nombre || !sedeId || !capacidad) {
      toast.error("Debe completar nombre, sede y capacidad");
      return;
    }
    try {
      await api.post("/salas", { nombre, sedeId, capacidad: Number(capacidad) });
      toast.success("Sala agregada correctamente");
      setNombre("");
      setSedeId("");
      setCapacidad("");
      cargarSalas();
    } catch (err) {
      console.error(err);
      toast.error("Error al agregar sala");
    }
  };

  const salasPorSede = salas.reduce((acc, sala) => {
    const sedeNombre = sala.sede?.nombre || 'Sin Sede';
    if (!acc[sedeNombre]) acc[sedeNombre] = [];
    acc[sedeNombre].push(sala);
    return acc;
  }, {});

  return (
    <div className="salas-admin">
      <h2>Administrar Salas</h2>
      {Object.entries(salasPorSede).map(([sedeNombre, lista]) => (
        <div key={sedeNombre} className="sede-group">
          <h3>{sedeNombre}</h3>
          <ul>
            {lista.map((sala) => (
              <li key={sala.id}>{sala.nombre}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Agregar Sala</h3>
      <div className="salas-form">
        <input
          placeholder="Nombre de sala"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <select
          value={sedeId}
          onChange={(e) => setSedeId(e.target.value)}
        >
          <option value="">Seleccione sede</option>
          {sedes.map((sede) => (
            <option key={sede.id} value={sede.id}>
              {sede.nombre}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Capacidad"
          value={capacidad}
          min="1"
          onChange={(e) => setCapacidad(e.target.value)}
          required
        />
        <button onClick={agregarSala}>Agregar</button>
      </div>
    </div>
  );
};

export default SalasAdmin;
