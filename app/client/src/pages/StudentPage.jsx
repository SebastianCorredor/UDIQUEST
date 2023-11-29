import { useState, useEffect } from 'react';
import { Button, Card, ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

const encuestasFicticias = [
    { id: 1, titulo: 'Encuesta 1', descripcion: 'Encuesta 1' },

];

const preguntasFicticias = {
    1: [
        { id: 1, enunciado: 'Cuantos años tienes?', tipo: 'texto_abierto'},
        { id: 2, enunciado: 'Tienes ingresos propios?', tipo: 'opcion_multiple', opciones: ['Sí', 'No'] },
        { id: 3, enunciado: 'Tienes mascotas?', tipo: 'opcion_multiple', opciones: ['Perro', 'Gato', '     ']},
        { id: 4, enunciado: '', tipo: 'texto_abierto'},
    ],
    
};

const EncuestasView = () => {
    const [encuestas, setEncuestas] = useState([]);
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [preguntas, setPreguntas] = useState([]);
    const [encuestasEnviadas, setEncuestasEnviadas] = useState([]);
    const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);
    const [mostrarMensajeEnviado, setMostrarMensajeEnviado] = useState(false);

    useEffect(() => {
        setEncuestas(encuestasFicticias);
    }, []);

    const cargarPreguntas = (encuestaId) => {
        setPreguntas(preguntasFicticias[encuestaId]);
        setFormularioVisible(true);
        setEncuestaSeleccionada(encuestas.find((encuesta) => encuesta.id === encuestaId));
        setMostrarMensajeEnviado(false); 
    };

    const enviarEncuesta = () => {

        setEncuestasEnviadas([...encuestasEnviadas, encuestaSeleccionada.id]);
        setMostrarMensajeEnviado(true);
        setTimeout(() => {
            setFormularioVisible(false);
        }, 2000);
    };

    return (
        <>
        <NavigationBar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h2>Encuestas</h2>
            <ListGroup>
                {encuestas.map((encuesta) => (
                    <ListGroupItem
                        key={encuesta.id}
                        action
                        onClick={() => cargarPreguntas(encuesta.id)}
                        style={{
                            cursor: 'pointer',
                            marginBottom: '10px',
                            backgroundColor: encuestasEnviadas.includes(encuesta.id) ? '#868e96' : '#007BFF',
                            color: 'white',
                        }}
                        disabled={encuestasEnviadas.includes(encuesta.id)}
                    >
                        <div>
                            <strong>{encuesta.titulo}</strong>
                            <p style={{ fontSize: '0.8em', marginTop: '5px', marginBottom: '0' }}>{encuesta.descripcion}</p>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>

            {formularioVisible && (
                <Card style={{ marginTop: '20px', width: '100%', maxWidth: '600px', padding: '20px' }}>
                    <h3 style={{ color: '#007BFF' }}>Formulario de Preguntas</h3>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Encuesta: {encuestaSeleccionada.titulo}</p>
                    <p style={{ marginBottom: '20px' }}>{encuestaSeleccionada.descripcion}</p>
                    {preguntas.map((pregunta) => (
                        <div key={pregunta.id} style={{ marginBottom: '20px' }}>
                            <p style={{ fontWeight: 'bold' }}>{pregunta.enunciado}</p>
                            {pregunta.tipo === 'opcion_multiple' && (
                                <select className="form-select" style={{ width: '100%' }}>
                                    {pregunta.opciones.map((opcion) => (
                                        <option key={opcion} value={opcion}>
                                            {opcion}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {pregunta.tipo === 'texto_abierto' && (
                                <textarea className="form-control" rows="3" style={{ width: '100%' }} />
                            )}
                        </div>
                    ))}
                    <Button
                        variant="primary"
                        onClick={enviarEncuesta}
                        style={{ backgroundColor: '#FFA500', border: 'none' }}
                        disabled={mostrarMensajeEnviado}
                    >
                        Enviar Encuesta
                    </Button>
                </Card>
            )}

            {mostrarMensajeEnviado && (
                <Alert variant="success" style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
                    Encuesta enviada con éxito
                </Alert>
            )}
        </div>
        </>
    );
};

export default EncuestasView;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EncuestasView = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [formularioVisible, setFormularioVisible] = useState(false);
  const [preguntas, setPreguntas] = useState([]);

  // Función para cargar las encuestas al montar el componente
  useEffect(() => {
    const cargarEncuestas = async () => {
      try {
        const response = await axios.get('https:localhost:3003/estudiante/encuestas'); 
        setEncuestas(response.data);
      } catch (error) {
        console.error('Error al cargar encuestas:', error);
      }
    };

    cargarEncuestas();
  }, []);

  // Función para cargar preguntas al hacer clic en una encuesta
  const cargarPreguntas = async (encuestaId) => {
    try {
      const response = await axios.get(`https:localhost:3003/estudiante/encuestas:{encuestaId}`); // Reemplaza con tu ruta correcta
      setPreguntas(response.data);
      setFormularioVisible(true);
    } catch (error) {
      console.error('Error al cargar preguntas:', error);
    }
  };

  return (
    <div>
      <h1>Encuestas</h1>
      <ul>
        {encuestas.map((encuesta) => (
          <li key={encuesta.id} onClick={() => cargarPreguntas(encuesta.id)}>
            {encuesta.titulo}
          </li>
        ))}
      </ul>

      {formularioVisible && (
        <div>
          <h2>Formulario de Preguntas</h2>
          /*
          {preguntas.map((pregunta) => (
            <div key={pregunta.id}>
              <p>{pregunta.enunciado}</p>
              {pregunta.tipo === 'opcion_multiple' && (
                <select>
                  {pregunta.opciones.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              )}
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EncuestasView;
*/