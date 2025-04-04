import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CrearReceta from './pages/CrearReceta';
import DetalleReceta from './pages/DetalleReceta';
import EditarReceta from './pages/EditarReceta';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CrearReceta />} />
        <Route path="/receta/:id" element={<DetalleReceta />} />
        <Route path="/editar/:id" element={<EditarReceta />} />
      </Routes>
    </>
  );
}

export default App;