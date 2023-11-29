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

const Input = styled.input`
    margin-bottom: 10px;
    width: calc(100% - 32px);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    margin-bottom: 10px;
    padding: 8px 16px;
    background-color: #ff6600;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const PreguntaMixta = ({ onAgregar }) => {
    const [textoPregunta, setTextoPregunta] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [conRespuestaAbierta, setConRespuestaAbierta] = useState(false);

    const handleAgregarOpcion = () => {
        const nuevaOpcion = prompt('Ingrese una opción');
        if (nuevaOpcion) {
            setOpciones([...opciones, nuevaOpcion]);
        }
    };

    const handleAgregarPregunta = () => {
        const pregunta = {
            tipo: 'Mixta',
            textoPregunta,
            opciones,
            conRespuestaAbierta,
        };
        onAgregar(pregunta);
        setTextoPregunta('');
        setOpciones([]);
        setConRespuestaAbierta(false);
    };

    return (
        <PreguntaContainer>
            <h3 style={{ color: '#ff6600' }}>Pregunta Mixta</h3>
            <Input
                type="text"
                placeholder="Texto de la pregunta"
                value={textoPregunta}
                onChange={(e) => setTextoPregunta(e.target.value)}
            />
            <Button onClick={handleAgregarOpcion}>Agregar Opción</Button>
            <ul>
                {opciones.map((opcion, index) => (
                    <li key={index}>{opcion}</li>
                ))}
            </ul>
            <label style={{ color: '#ff6600' }}>
                <input
                    type="checkbox"
                    checked={conRespuestaAbierta}
                    onChange={(e) => setConRespuestaAbierta(e.target.checked)}
                />
                Con Respuesta Abierta
            </label>
            <Button onClick={handleAgregarPregunta}>Agregar Pregunta</Button>
        </PreguntaContainer>
    );
};

export default PreguntaMixta;