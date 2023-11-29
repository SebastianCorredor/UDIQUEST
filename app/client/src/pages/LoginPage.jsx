import { useEffect, useState } from 'react';
import axios from 'axios'; 
import {
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Button,
    Box,
    Typography,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window.atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}
export default function LoginPage() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userToken, setUserToken] = useState(null);

    const handleLogin = async () => {
        if (!userType) {
            console.log('Selecciona un tipo de usuario');
            return;
        }

        try {
            let response = null;
            if (userType === 'student') {
                response = await axios.post('http://localhost:3003/login/student', { email, password });
            } else if (userType === 'admin') {
                response = await axios.post('http://localhost:3003/login/admin', { email, password });
            } else if (userType === 'pollster') {
                response = await axios.post('http://localhost:3003/login/pollster', { email, password });
            }

            const token = response.data.token;
            console.log(`Token de ${userType}:`, token);
            console.log(`Iniciar sesión como ${userType}`);
            localStorage.setItem(`auth_${userType}_${email}_${password}`, JSON.stringify({ token, timestamp: Date.now() }));
            setUserToken(token);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    useEffect(() => {
        if (userToken) {
            const storedToken = JSON.parse(localStorage.getItem(`auth_${userType}_${email}_${password}`));
            if (storedToken && storedToken.token) {
                const { token } = storedToken;
                const decodedToken = parseJwt(token);
                const expirationTime = decodedToken.exp * 1000;

                if (expirationTime > Date.now()) {
                    setUserToken(token);
                } else {
                    localStorage.removeItem(`auth_${userType}_${email}_${password}`);
                    setUserToken(null);
                    navigate('/login');
                }
            }
        }
    }, [userToken, userType, email, password, navigate]);

    useEffect(() => {
        if (userToken) {
            if (userType === 'student') {
                navigate('/estudiante');
            } else if (userType === 'admin') {
                navigate('/admin/user');
            } else if (userType === 'pollster') {
                navigate('/encuestador');
            }
        }
    }, [userToken, userType, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f0f0',
                backgroundImage: 'linear-gradient(to bottom, #00c3ff, #0085ff)',
                padding: '20px',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    width: '400px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" sx={{ color: '#FFA500', marginBottom: '20px' }}>
                    Inicio de Sesión
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="userType"
                        name="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    >
                        <FormControlLabel value="student" control={<Radio />} label="Estudiante" sx={{}} />
                        <FormControlLabel value="admin" control={<Radio />} label="Administrador" sx={{}} />
                        <FormControlLabel value="pollster" control={<Radio />} label="Encuestador" sx={{}} />
                    </RadioGroup>
                </FormControl>
                {userType === 'student' && (
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField onChange={(event) => setEmail(event.target.value)} label="Correo Estudiante" variant="outlined" style={{ marginBottom: '10px' }} />
                        <TextField onChange={(event) => setPassword(event.target.value)} label="Contraseña Estudiante" variant="outlined" type="password" style={{ marginBottom: '10px' }} />
                        <Button variant="contained" onClick={handleLogin} style={{ backgroundColor: '#FFA500', color: 'white' }}>
                            Inicia Sesión!
                        </Button>
                    </form>
                )}
                {userType === 'admin' && (
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField onChange={(event) => setEmail(event.target.value)} label="Correo Administrador" variant="outlined" style={{ marginBottom: '10px' }} />
                        <TextField onChange={(event) => setPassword(event.target.value)} label="Contraseña Administrador" variant="outlined" type="password" style={{ marginBottom: '10px' }} />
                        <Button variant="contained" onClick={handleLogin} style={{ backgroundColor: '#FFA500', color: 'white' }}>
                            Inicia Sesión!
                        </Button>
                    </form>
                )}
                {userType === 'pollster' && (
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField onChange={(event) => setEmail(event.target.value)} label="Correo Encuestador" variant="outlined" style={{ marginBottom: '10px' }} />
                        <TextField onChange={(event) => setPassword(event.target.value)} label="Contraseña Encuestador" variant="outlined" type="password" style={{ marginBottom: '10px' }} />
                        <Button variant="contained" onClick={handleLogin} style={{ backgroundColor: '#FFA500', color: 'white' }}>
                            Inicia Sesión!
                        </Button>
                    </form>
                )}
            </Paper>
        </Box>
    );
}
/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

export default function LoginPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loginSuccesful, setLoginSuccesful] = useState(false);

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const expirationTime = parseJwt(token);
            const currentTime = Date.now();

            if (expirationTime.exp * 1000 > currentTime) {
                setLoginSuccesful(true);
                const timeUntilExpiration = (expirationTime.exp * 1000) - currentTime;

                const timeoutId = setTimeout(() => {
                    localStorage.removeItem('token');
                    setLoginSuccesful(false);
                }, timeUntilExpiration);

                return () => clearTimeout(timeoutId);
            } else {
                localStorage.removeItem('token');
                setLoginSuccesful(false);
            }
        } else {
            // Si no hay un token válido, asegurémonos de que el usuario esté en la página de inicio de sesión
            setLoginSuccesful(false);
        }
    }, []);

    const handleLogin = (e) => {

        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        fetch('http://localhost:3003/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    const parsedToken = parseJwt(result.token);
                    if (parsedToken.userType === 'admin') {
                        navigate('/admin/user');
                    } else if (parsedToken.userType === 'student') {
                        navigate('/');
                    } else if (parsedToken.userType === 'pollster') {
                        navigate('/encuestador/agregarEncuesta');
                    }
                    setLoginSuccesful(true);
                } else {
                    setLoginSuccesful(false);
                }
            })
            .catch(error => {
                console.log(error);
                setLoginSuccesful(false);
            });


        e.preventDefault();

        // Expresión regular para validar correo .udi.edu.co
        const emailRegex = /^[a-zA-Z0-9._%+-]+@udi\.edu\.co$/;

        if (!email.includes('@')) {
            alert('El correo debe contener el símbolo @');
            return;
        }

        if (!emailRegex.test(email)) {
            // El correo no cumple con el formato .udi.edu.co
            alert('El correo debe ser de tipo .udi.edu.co');
            return; // Detener la ejecución si el correo no es válido
        }

        console.log({
            email: email,
            password: password
        }

        );
    };


    return (
        <>{loginSuccesful ? <HomePage /> :
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ flex: 1, backgroundColor: '#FFA500' }}></div>
                <div style={{ flex: 1, backgroundColor: 'white' }}></div>
                <div style={{ flex: 1, backgroundColor: '#3498db' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', padding: '40px', borderRadius: '8px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Iniciar Sesión</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input
                            onChange={(event) => setEmail(event.target.value)}
                            type="text"
                            placeholder="Correo email"
                            style={{ padding: '1rem', margin: '0.5rem', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                        <input
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Contraseña"
                            style={{ padding: '1rem', margin: '0.5rem', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#3498db',
                                color: 'white',
                                padding: '1.5rem',
                                margin: '1rem 0',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                width: '100%',
                                boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.1)',
                            }}
                            onClick={handleLogin}
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        }</>
    )
}
*/
/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

export default function LoginPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loginSuccesful, setLoginSuccesful] = useState(false);

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const expirationTime = parseJwt(token);
            const currentTime = Date.now();

            if (expirationTime.exp * 1000 > currentTime) {
                setLoginSuccesful(true);
                const timeUntilExpiration = (expirationTime.exp * 1000) - currentTime;

                const timeoutId = setTimeout(() => {
                    localStorage.removeItem('token');
                    setLoginSuccesful(false);
                }, timeUntilExpiration);

                return () => clearTimeout(timeoutId);
            } else {
                localStorage.removeItem('token');
                setLoginSuccesful(false);
            }
        } else {
            // Si no hay un token válido, asegurémonos de que el usuario esté en la página de inicio de sesión
            setLoginSuccesful(false);
        }
    }, []);

    const handleLogin = (e) => {

        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        fetch('http://localhost:3003/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    const parsedToken = parseJwt(result.token);
                    if (parsedToken.userType === 'admin') {
                        navigate('/admin/user');
                    } else if (parsedToken.userType === 'student') {
                        navigate('/');
                    } else if (parsedToken.userType === 'pollster') {
                        navigate('/encuestador/agregarEncuesta');
                    }
                    setLoginSuccesful(true);
                } else {
                    setLoginSuccesful(false);
                }
            })
            .catch(error => {
                console.log(error);
                setLoginSuccesful(false);
            });


        e.preventDefault();

        // Expresión regular para validar correo .udi.edu.co
        const emailRegex = /^[a-zA-Z0-9._%+-]+@udi\.edu\.co$/;

        if (!email.includes('@')) {
            alert('El correo debe contener el símbolo @');
            return;
        }

        if (!emailRegex.test(email)) {
            // El correo no cumple con el formato .udi.edu.co
            alert('El correo debe ser de tipo .udi.edu.co');
            return; // Detener la ejecución si el correo no es válido
        }

        console.log({
            email: email,
            password: password
        }

        );
    };


    return (
        <>{loginSuccesful ? <HomePage /> :
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ flex: 1, backgroundColor: '#FFA500' }}></div>
                <div style={{ flex: 1, backgroundColor: 'white' }}></div>
                <div style={{ flex: 1, backgroundColor: '#3498db' }}></div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', padding: '40px', borderRadius: '8px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', background: 'white' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Iniciar Sesión</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input
                            onChange={(event) => setEmail(event.target.value)}
                            type="text"
                            placeholder="Correo email"
                            style={{ padding: '1rem', margin: '0.5rem', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                        <input
                            onChange={(event) => setPassword(event.target.value)}
                            type="password"
                            placeholder="Contraseña"
                            style={{ padding: '1rem', margin: '0.5rem', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#3498db',
                                color: 'white',
                                padding: '1.5rem',
                                margin: '1rem 0',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                width: '100%',
                                boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.1)',
                            }}
                            onClick={handleLogin}
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        }</>
    )
}
*/