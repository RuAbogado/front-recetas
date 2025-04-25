import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

export default function Home() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setRecetas(res.data))
      .catch(err => console.error("Error al cargar recetas:", err));
  }, []);

  return (
    <div className="container">
      {recetas.map(receta => (
        <div key={receta.id} className="recipe-card">
          <img
            src={receta.imagenes[0]} // URL completa directamente desde MongoDB
            alt={receta.titulo}
          />
          <div className="recipe-content">
            <h2 className="recipe-title-home">{receta.titulo}</h2>
            <p className="recipe-author-home">Por: {receta.autor}</p>
            <Link to={`/receta/${receta.id}`} className="recipe-link">
              Ver más →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}