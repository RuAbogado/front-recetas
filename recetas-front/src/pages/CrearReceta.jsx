// Importo el componente reutilizable del formulario de receta
import RecetaForm from "../components/RecetaForm";

// Componente de página para crear una nueva receta
export default function CrearReceta() {
  return (
    // Contenedor general con clase personalizada
    <div className="container">
      
      {/* Tarjeta/formulario centrado para dar mejor presentación */}
      <div className="form-card">
        
        {/* Título de la sección */}
        <h1 className="form-title">Agregar nueva receta</h1>

        {/* Uso el componente de formulario y le paso el modo "crear" */}
        <RecetaForm modo="crear" />

      </div>
    </div>
  );
}