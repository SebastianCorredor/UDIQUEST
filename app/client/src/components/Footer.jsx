import { Navbar } from 'react-bootstrap';

export default function Footer() {
    return (
        <div style={{ position: 'relative', marginTop: '60px' }}>
            <Navbar bg="dark" variant="dark" fixed="bottom">
                <Navbar.Text className="mx-auto text-white">
                    Creado por: 2Pi | Teléfono: undotrecuatro | Correo: equisde@dede.edu.co
                </Navbar.Text>
            </Navbar>
        </div>
    );
}