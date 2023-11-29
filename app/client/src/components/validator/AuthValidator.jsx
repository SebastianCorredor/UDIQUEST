import { useState, useEffect } from 'react';

import HomePage from "../../pages/HomePage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const tokenExistAndStillValid = () => {
            const storedToken = localStorage.getItem('token');
            console.log('Stored Token:', storedToken); // Imprime el token almacenado en consola
            if (storedToken) {
                const parsedToken = parseJwt(storedToken);
                console.log('Parsed Token:', parsedToken); // Imprime el token parseado en consola
                return parsedToken.exp * 1000 > Date.now();
            }
            return false;
        };

        setIsLoggedIn(tokenExistAndStillValid());
    }, []);

    console.log('isLoggedIn:', isLoggedIn); // Imprime el estado isLoggedIn en consola

    return isLoggedIn ? <HomePage /> : <LoginPage />;
};

export default Main;