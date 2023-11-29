
import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';
const datosFicticios = [
    {
        id: 1,
        titulo: 'Encuesta 1',
        descripcion: 'Encuesta 1',
        estado: 'Activa',
        fechacreacion: '2023-11-01',
        
        preguntas: [
            {
                id: 101,
                textopregunta: 'Cuantos años tienes?',
                opciones: [
                    
                    
                ],
            },{
                id: 102,
                textopregunta: 'Tienes ingresos propios?',
                opciones: [
                    { id: 1001, texto: 'Si' },
                    { id: 1002, texto: 'No' },
                    
                ],
            },
            {
                id: 103,
                textopregunta: 'Tienes mascotas?',
                opciones: [
                    { id: 1004, texto: 'Perro' },
                    { id: 1005, texto: 'Gato' },
                    { id: 1006, texto: 'Texto Abierto' },
                ],
            },
        ],
    },

];
const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #1e3f66; /* Azul institucional */
`;

const EncuestaCard = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
`;

const EncuestaTitle = styled.h3`
  color: #ff6a00; /* Naranja institucional */
`;

const EncuestaDescription = styled.p`
  margin-bottom: 10px;
`;

const PreguntaText = styled.p`
  margin-bottom: 5px;
`;

const EncuestasList = () => {
    const [encuestas, ] = useState([...datosFicticios]); 

    return (
        <>
            <NavigationBar />
            <Container>
                <Title>Encuestas del Encuestador</Title>
                {encuestas.map((encuesta) => (
                    <EncuestaCard key={encuesta.id}>
                        <EncuestaTitle>{encuesta.titulo}</EncuestaTitle>
                        <EncuestaDescription>
                            Descripción: {encuesta.descripcion}
                        </EncuestaDescription>
                        <EncuestaDescription>
                            Estado: {encuesta.estado}
                        </EncuestaDescription>
                        <EncuestaDescription>
                            Fecha de Creación: {encuesta.fechacreacion}
                        </EncuestaDescription>
                        

                        <EncuestaTitle>Preguntas:</EncuestaTitle>
                        {encuesta.preguntas.map((pregunta) => (
                            <div key={pregunta.id}>
                                <PreguntaText>{pregunta.textopregunta}</PreguntaText>
                                {pregunta.opciones && (
                                    <ul>
                                        {pregunta.opciones.map((opcion) => (
                                            <li key={opcion.id}>{opcion.texto}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </EncuestaCard>
                ))}
            </Container>
            <Footer />     </>
    );
};

export default EncuestasList;
