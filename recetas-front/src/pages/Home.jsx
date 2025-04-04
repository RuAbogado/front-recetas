import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/recetas")
      .then(res => setRecetas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      {recetas.map(receta => (
        <div key={receta.id} className="recipe-card">
          <img src={`http://localhost:3000/${receta.imagenes[0]}`} alt={receta.titulo} />
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