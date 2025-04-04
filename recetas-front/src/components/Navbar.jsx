import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🍰 Recetas Chulas</h1>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/crear">Nueva Receta</Link>
      </div>
    </nav>
  );
}