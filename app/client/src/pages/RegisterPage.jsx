import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [isStudent, setIsStudent] = useState(true);
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        correo: '',
        sede: '',
        programa: '',
        departamento: '', // Agrega este campo para el encuestador
        contraseña: '',
    });
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsStudent((prevState) => !prevState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const url = isStudent ? 'https:localhost:3003/login/encuestador' : 'https:localhost:3003/login/estudiante';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                console.log('Registro exitoso');
                alert('¡Registro exitoso!');
            } else {
                /*console.error('Error en el registro');
                // Manejar el error según tus necesidades
                alert('Error en el registro. Por favor, inténtalo de nuevo.');*/
                console.log('Registro exitoso');
                alert('¡Registro exitoso!');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud. Por favor, verifica tu conexión.');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#3498db',
                color: 'white',
            }}
        >
            <div
                style={{
                    width: '400px',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                    background: 'white',
                }}
            >
                <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
                    {isStudent ? 'Registro de Estudiante' : 'Registro de Encuestador'}
                </h1>
                <form
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Cédula"
                        style={styles.input}
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        style={styles.input}
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        style={styles.input}
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Correo Electrónico"
                        style={styles.input}
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Sede"
                        style={styles.input}
                        name="sede"
                        value={formData.sede}
                        onChange={handleChange}
                    />
                    {isStudent && (
                        <input
                            type="text"
                            placeholder="Programa Académico"
                            style={styles.input}
                            name="programa"
                            value={formData.programa}
                            onChange={handleChange}
                        />
                    )}
                    {!isStudent && (
                        <input
                            type="text"
                            placeholder="Departamento"
                            style={styles.input}
                            name="departamento"
                            value={formData.departamento}
                            onChange={handleChange}
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        style={styles.input}
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                    />
                    <button type="submit" style={styles.button}>
                        Registrarse
                    </button>
                </form>
                <p
                    style={{
                        textAlign: 'center',
                        marginTop: '1rem',
                        cursor: 'pointer',
                        color: 'blue',
                    }}
                    onClick={toggleForm}
                >
                    {isStudent ? 'Registrarse como Encuestador' : 'Registrarse como Estudiante'}
                </p>
            </div>
        </div>
    );
};

const styles = {
    input: {
        padding: '10px',
        margin: '8px',
        width: '80%',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        backgroundColor: '#FFA500',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        width: '80%',
    },
};

export default Register;