// Importo hooks y librerías necesarias
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config"; // Ya no se necesita una URL separada para las imágenes

// Componente para mostrar los detalles de una receta específica
export default function DetalleReceta() {
  const { id } = useParams();              // Obtener el ID desde la URL
  const [receta, setReceta] = useState(null); // Estado local para guardar los datos de la receta
  const navigate = useNavigate();          // Para redireccionar después de eliminar

  // Cargar la receta al montar el componente o cuando cambie el ID
  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => setReceta(res.data))   // Guardar los datos de la receta
      .catch(err => console.error(err));  // Manejo de errores
  }, [id]);

  // Función para eliminar la receta actual
  const eliminar = async () => {
    if (confirm("¿Eliminar esta receta?")) {
      try {
        await axios.delete(`${API_URL}/${id}`); // Llamada al backend para eliminar
        navigate("/"); // Redirige al inicio una vez eliminada
      } catch (err) {
        console.error("Error al eliminar", err);
      }
    }
  };

  // Mostrar mensaje de carga mientras se obtiene la receta
  if (!receta) return <p className="p-4">Cargando receta...</p>;

  return (
    <div className="container">
      {/* Imagen principal de la receta */}
      <img className="recipe-img" src={receta.imagenes[0]} alt={receta.titulo} />

      {/* Título y autor de la receta */}
      <h1 className="recipe-title">{receta.titulo}</h1>
      <p className="recipe-author">Por: {receta.autor}</p>

      {/* Lista de ingredientes */}
      <h2 className="section-title">Ingredientes</h2>
      <ul className="recipe-list">
        {receta.ingredientes.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>

      {/* Lista de pasos */}
      <h2 className="section-title">Pasos</h2>
      <ul className="recipe-list">
        {receta.pasos.map((p, i) => <li key={i} className="recipe-step">{p}</li>)}
      </ul>

      {/* Botones para editar o eliminar la receta */}
      <div className="button-group">
        {/* Botón para ir al formulario de edición */}
        <Link to={`/editar/${receta.id}`} className="btn btn-edit">Editar</Link>

        {/* Botón para eliminar receta */}
        <button onClick={eliminar} className="btn btn-delete">Eliminar</button>
      </div>
    </div>
  );
}