// Importo hooks y dependencias necesarias
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

// Componente principal que muestra todas las recetas registradas
export default function Home() {
  const [recetas, setRecetas] = useState([]); // Estado local para guardar el arreglo de recetas

  // useEffect para cargar las recetas cuando se monta el componente
  useEffect(() => {
    axios.get(API_URL) // Hago la petición al backend
      .then(res => setRecetas(res.data)) // Guardo los datos en el estado
      .catch(err => console.error("Error al cargar recetas:", err)); // En caso de error, lo muestro en consola
  }, []); // El arreglo vacío hace que esto solo se ejecute una vez al inicio

  return (
    <div className="container">
      {/* Recorro cada receta y la muestro en una tarjeta */}
      {recetas.map(receta => (
        <div key={receta.id} className="recipe-card">
          
          {/* Imagen principal de la receta */}
          <img
            src={receta.imagenes[0]} // Tomo la primera imagen (ya tiene URL completa)
            alt={receta.titulo}
          />

          {/* Contenido de la receta: título, autor y enlace */}
          <div className="recipe-content">
            <h2 className="recipe-title-home">{receta.titulo}</h2>
            <p className="recipe-author-home">Por: {receta.autor}</p>

            {/* Enlace para ver más detalles de la receta */}
            <Link to={`/receta/${receta.id}`} className="recipe-link">
              Ver más →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}