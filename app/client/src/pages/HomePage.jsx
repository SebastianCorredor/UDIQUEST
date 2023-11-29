import { Link } from 'react-router-dom';
import logoImage from '../images/PanelExample.png';

export default function HomePage() {
  const softwareDescription = `
    El Software UDIQuest es una herramienta innovadora diseñada para simplificar la vida cotidiana de los usuarios. 
    Ofrece una amplia gama de funcionalidades y una interfaz intuitiva, lo que lo convierte en una elección ideal para...`;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <header style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: '#3498db', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>UDIQuest</h1>
        <p style={{ fontSize: '1.5rem' }}>Bienvenido a UDIQuest</p>
        <img alt="" src={logoImage} width="750" height="400" className="d-inline-block align-top mr-2" />
      </header>
      <main style={{ padding: '2rem' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#FFA500' }}>¿Qué es el Software de Normalización UDIQuest?</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>{softwareDescription}</p>
        </section>
        <section style={{ textAlign: 'center' }}>
          {/* Utiliza el componente Link para las redirecciones */}
          <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#FFA500', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Iniciar Sesión
            </button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#FFA500', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Registrarse
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
