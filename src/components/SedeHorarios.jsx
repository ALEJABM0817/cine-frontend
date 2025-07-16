import React from 'react';
import { useNavigate } from 'react-router-dom';

const SedeHorarios = ({ sedes, isLoggedIn, peliculaId }) => {
  const navigate = useNavigate();

  const handleHorarioClick = (horarioId) => {
    if (isLoggedIn) {
      navigate(`/comprar/${horarioId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="sedes-container">
      {sedes.map((sede) => (
        <div key={sede.sede.id} className="sede-bloque">
          <h3>{sede.sede.nombre}</h3>
          <div className="horarios">
            {sede.horarios.map((horario) => (
              <button
                key={horario.id}
                onClick={() => handleHorarioClick(horario.id)}
                className="horario-btn"
              >
                {new Date(horario.fecha).toLocaleString()} - {horario.sala.nombre}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SedeHorarios;
