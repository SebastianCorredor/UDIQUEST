import { useState } from "react";
import PreguntaAbierta from "./PreguntaAbierta";
import PreguntaCerrada from "./PreguntaCerrada";
import PreguntaMixta from "./PreguntaMixta";
import Footer from "./Footer";
import styled from "styled-components";
import Navigation from "./NavigationBar";
import { useNavigate } from 'react-router-dom';

const Encuesta = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("Activo");
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [fechaActivacion, setFechaActivacion] = useState("");
    const [fechaDesactivacion, setFechaDesactivacion] = useState("");
    const navigate = useNavigate();
    const handleEnviarEncuesta = () => {
        console.log("Enviando encuesta:", {
            titulo,
            descripcion,
            estado,
            fechaCreacion,
            fechaActivacion,
            fechaDesactivacion,
            preguntas,
        });

        alert("Encuesta enviada con éxito");

        navigate('/encuestador');
        setTitulo("");
        setDescripcion("");
        setEstado("Activo");
        setFechaCreacion("");
        setFechaActivacion("");
        setFechaDesactivacion("");
        setPreguntas([]);
    };
    const handleAgregarPregunta = (pregunta) => {
        setPreguntas([...preguntas, pregunta]);
    };
    const EncuestaContainer = styled.div`
    background-color: #f0f7ff; /* Azul claro */
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #333;`;
    const Button = styled.button`
    margin-bottom: 10px;
    padding: 8px 16px;
    background-color: #ff6600;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;`;
    const Campo = styled.div`
    margin-bottom: 15px;

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
        color: #ff6600; /* Naranja */
    }

    input[type="text"],
    input[type="date"],
    select,
    textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      color: #333;
    }
  `;

    

    return (
        <>
            <Navigation />
            <EncuestaContainer>

                <div>
                    <h2 style={{ color: "#ff6600" }}>Crear Encuesta</h2>
                    <Campo>
                        <label>Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </Campo>
                    <Campo>
                        <label>Descripción:</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Campo>
                    <Campo>
                        <label>Estado:</label>
                        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </Campo>
                    <Campo>
                        <label>Fecha de Creación:</label>
                        <input
                            type="date"
                            value={fechaCreacion}
                            onChange={(e) => setFechaCreacion(e.target.value)}
                        />
                    </Campo>
                    <PreguntaAbierta onAgregar={handleAgregarPregunta} />
                    <PreguntaCerrada onAgregar={handleAgregarPregunta} />
                    <PreguntaMixta onAgregar={handleAgregarPregunta} />

                    <div>
                        <h2 style={{ color: "#ff6600" }}>Preguntas Agregadas</h2>
                        <ul>
                            {preguntas.map((pregunta, index) => (
                                <li key={index}>
                                    {pregunta.tipo === "Abierta" && (
                                        <div>
                                            <h4>Pregunta Abierta:</h4>
                                            <p>{pregunta.textoPregunta}</p>
                                        </div>
                                    )}
                                    {pregunta.tipo === "Cerrada" && (
                                        <div>
                                            <h4>Pregunta Cerrada:</h4>
                                            <p>{pregunta.textoPregunta}</p>
                                            <ul>
                                                {pregunta.opciones.map((opcion, index) => (
                                                    <li key={index}>{opcion}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {pregunta.tipo === "Mixta" && (
                                        <div>
                                            <h4>Pregunta Mixta:</h4>
                                            <p>{pregunta.textoPregunta}</p>
                                            <ul>
                                                {pregunta.opciones.map((opcion, index) => (
                                                    <li key={index}>{opcion}</li>
                                                ))}
                                            </ul>
                                            <p>
                                                Con Respuesta Abierta:{" "}
                                                {pregunta.conRespuestaAbierta ? "Sí" : "No"}
                                            </p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button onClick={handleEnviarEncuesta}>Enviar Encuesta</Button>

            </EncuestaContainer>

            <Footer />
        </>
    );
};

export default Encuesta;
