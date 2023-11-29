import { useState } from 'react';
import styled from 'styled-components';

const PreguntaContainer = styled.div`
  background-color: #f0f7ff; /* Azul claro */
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
`;

const PreguntaAbierta = ({ onAgregar }) => {
    const [textoPregunta, setTextoPregunta] = useState('');

    const handleAgregarPregunta = () => {
        const pregunta = {
            tipo: 'Abierta',
            textoPregunta,
        };
        onAgregar(pregunta);
        setTextoPregunta('');
    };

    return (
        <PreguntaContainer>
            <h3 style={{ color: '#ff6600' }}>Pregunta Abierta</h3>
            <input
                type="text"
                placeholder="Texto de la pregunta"
                value={textoPregunta}
                onChange={(e) => setTextoPregunta(e.target.value)}
                style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            />
            <button
                onClick={handleAgregarPregunta}
                style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#ff6600',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Agregar Pregunta
            </button>
        </PreguntaContainer>
    );
};

export default PreguntaAbierta;