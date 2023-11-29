/*import { useState, useEffect } from 'react';
import {  Container, Row, Col, Card, Image, Table } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavigationBar from '../components/NavigationBar';
import informeIcon from '../images/informeIcon.png';
import estadisticaIcon from '../images/estadisticaIcon.png';
import { Link } from 'react-router-dom';  // Importa Link

export default function Navigation() {
    const [encuestas, setEncuestas] = useState([]);
    const [estadisticas, setEstadisticas] = useState([]);
    useEffect(() => {
        fetch('https:localhost:3003/encuestador')  
            .then((response) => response.json())
            .then((data) => setEncuestas(data))
            .catch((error) => console.error('Error al obtener encuestas:', error));

        fetch('https:localhost:3003/estadisticas')  
            .then((response) => response.json())
            .then((data) => setEstadisticas(data))
            .catch((error) => console.error('Error al obtener estadísticas:', error));
    }, []);  
    
    const data = estadisticas.map((stat) => ({ categoria: stat.categoria, valor: stat.valor }));

    return (
        <div>
            <NavigationBar />
            <Container fluid className="mt-4">
                <Row>
                    <Col md={8}>
                        <h2 style={{ color: '#FFA500', textAlign: 'center' }}>Encuestas Activas</h2>
                        {encuestas.map((encuesta) => (
                            <Card key={encuesta.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{encuesta.titulo}</Card.Title>
                                    <Card.Text>{encuesta.descripcion}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>

                    <Col md={4}>
                        <h2 style={{ color: '#0074CC', textAlign: 'center' }}>Estadísticas</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Categoría</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estadisticas.map((stat) => (
                                    <tr key={stat.categoria}>
                                        <td>{stat.categoria}</td>
                                        <td>{stat.valor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Card>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data}>
                                        <XAxis dataKey="categoria" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="valor" fill="#0074CC" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                        <div style={{ marginBottom: '100px' }} />
                        <div style={{ marginBottom: '100px' }} />
                        <Card>
                            <Card.Body>
                                <h2> Manejo </h2>
                                <div style={{ marginBottom: '20px' }} />
                                <Link to="/encuestador/agregarEncuesta" className="btn btn-primary mb-2" style={{ width: '100%', borderRadius: '10px' }}>
                                    <Image
                                        src={informeIcon}
                                        alt="Icono de Informe"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top mr-2"
                                    />
                                    Agregar Encuesta
                                </Link>
                                <div style={{ marginBottom: '10px' }} />
                                <Link to="/encuestador/encuesta" className="btn btn-primary mb-2" style={{ width: '100%', borderRadius: '10px' }}>
                                    <Image
                                        src={estadisticaIcon}
                                        alt="Icono de Informe"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top mr-2"
                                    />
                                    Ver Encuestas
                                </Link>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}*/


import {  Container, Row, Col, Card, Image,Table  } from 'react-bootstrap';
import { Link } from 'react-router-dom';  
import estadisticaIcon from '../images/estadisticaIcon.png';

import informeIcon from '../images/informeIcon.png';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavigationBar from '../components/NavigationBar';


export default function Navigation() {
    const informes = [
        { id: 1, titulo: 'Encuesta 1', contenido: 'Encuesta 1' },
        
    ];

    const estadisticas = [
        { categoria: 'Categoría 1', valor: 20 },
        { categoria: 'Categoría 2', valor: 30 },
        
    ];


    const data = estadisticas.map(stat => ({ categoria: stat.categoria, valor: stat.valor }));

    return (
        <div>
<NavigationBar />
        <Container fluid className="mt-4">
                <Row>
                    <Col md={8}>
                        <h2 style={{ color: '#FFA500', textAlign: 'center' }}>Informes Activos</h2>
                        {informes.map((informe) => (
                            <Card key={informe.id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{informe.titulo}</Card.Title>
                                    <Card.Text>{informe.contenido}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>

                
                    <Col md={4}>
                        <h2 style={{ color: '#0074CC', textAlign: 'center' }}>Estadísticas</h2>
                        <Table striped bordered hover>
                        </Table>
                        <Card>
                            <Card.Body>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data}>
                                        <XAxis dataKey="categoria" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="valor" fill="#0074CC" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card.Body>
                        </Card>
                        <div style={{ marginBottom: '100px' }} />
                        <Card>
                            <Card.Body>
                                <h2> Manejo </h2>
                                <div style={{ marginBottom: '20px' }} />
                                <Link to="/encuestador/agregarEncuesta" className="btn btn-primary mb-2" style={{ width: '100%', borderRadius: '10px' }}>
                                    <Image
                                        src={informeIcon}
                                        alt="Icono de Informe"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top mr-2"
                                    />
                                    Agregar Encuesta
                                </Link>
                                <div style={{ marginBottom: '10px' }} />
                                <Link to="/encuestador/encuesta" className="btn btn-primary mb-2" style={{ width: '100%', borderRadius: '10px' }}>
                                    <Image
                                        src={estadisticaIcon}
                                        alt="Icono de Informe"
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top mr-2"
                                    />
                                    Ver Encuestas
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                        
                    
                </Row>
            </Container>
        </div>
        
    )
}