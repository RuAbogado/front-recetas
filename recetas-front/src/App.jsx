// Importo las rutas necesarias de React Router DOM
import { Routes, Route } from 'react-router-dom';

// Importo los componentes y páginas de mi aplicación
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CrearReceta from './pages/CrearReceta';
import DetalleReceta from './pages/DetalleReceta';
import EditarReceta from './pages/EditarReceta';

// Importo los estilos generales de la app
import './index.css';

// Componente principal de la aplicación
function App() {
  return (
    <>
      {/* Navbar fija que se muestra en todas las páginas */}
      <Navbar />

      {/* Definición de rutas usando React Router */}
      <Routes>
        {/* Ruta de inicio que muestra todas las recetas */}
        <Route path="/" element={<Home />} />

        {/* Ruta para crear una nueva receta */}
        <Route path="/crear" element={<CrearReceta />} />

        {/* Ruta para ver el detalle de una receta específica por su ID */}
        <Route path="/receta/:id" element={<DetalleReceta />} />

        {/* Ruta para editar una receta específica por su ID */}
        <Route path="/editar/:id" element={<EditarReceta />} />
      </Routes>
    </>
  );
}

// Exporto el componente App como default
export default App;