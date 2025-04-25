// Importo Link desde react-router-dom para navegar entre páginas sin recargar
import { Link } from 'react-router-dom';

// Componente funcional que representa la barra de navegación principal
export default function Navbar() {
  return (
    // Contenedor principal de la barra de navegación con clase CSS 'navbar'
    <nav className="navbar">

      {/* Título o nombre de la aplicación */}
      <h1>🍰 Recetas Chulas</h1>

      {/* Enlaces de navegación a otras páginas de la app */}
      <div>
        {/* Enlace que lleva al inicio (lista de recetas) */}
        <Link to="/">Inicio</Link>

        {/* Enlace que lleva al formulario para crear una nueva receta */}
        <Link to="/crear">Nueva Receta</Link>
      </div>
    </nav>
  );
}