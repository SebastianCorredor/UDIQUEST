import logoImage from '../images/logoUdiQuest.png';
import { FaUser } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
const NavigationBar = () => {
    const navigation = useNavigate();
    const pageTitleStyle = {
        color: 'white',
        fontSize: '1.5rem',
    };
    const handleLogin = async () => {
        navigation('/login');
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand className="ml-auto">
                    <img
                        alt=""
                        src= {logoImage}
                        width="90"
                        height="32"
                        className="d-inline-block align-top mr-2"
                    />
                    
                </Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <span style={pageTitleStyle}> Normalización UDI </span>
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <NavDropdown 
                    title={<span><FaUser className="mr-2" />{}</span>} 
                    id="basic-nav-dropdown" 
                    drop="start">
                        <NavDropdown.Item onClick={handleLogin}>Cerrar sesión</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
