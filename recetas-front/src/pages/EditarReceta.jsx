// Importo hooks y componentes necesarios
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecetaForm from "../components/RecetaForm";
import axios from "axios";
import { API_URL } from "../config";

// Componente para editar una receta existente
export default function EditarReceta() {
  const { id } = useParams();                  // Obtengo el ID de la receta desde la URL
  const [receta, setReceta] = useState(null);  // Estado para guardar los datos de la receta

  // useEffect para obtener los datos de la receta cuando se monta el componente
  useEffect(() => {
    axios.get(`${API_URL}/${id}`)              // Petición al backend usando el ID
      .then(res => setReceta(res.data))        // Guardo los datos en el estado
      .catch(err => console.error("Error al obtener la receta:", err)); // Manejo de errores
  }, [id]);

  // Si aún no se ha cargado la receta, mostrar mensaje de carga
  if (!receta) return <p className="container">Cargando receta...</p>;

  return (
    <div className="container">
      {/* Título de la página */}
      <h1 className="recipe-title">Editar receta</h1>

      {/* Formulario reutilizable en modo edición, con los datos cargados */}
      <RecetaForm modo="editar" receta={receta} />
    </div>
  );
}