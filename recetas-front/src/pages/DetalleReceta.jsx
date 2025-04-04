import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DetalleReceta() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/recetas/${id}`)
      .then(res => setReceta(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const eliminar = async () => {
    if (confirm("¿Eliminar esta receta?")) {
      await axios.delete(`http://localhost:3000/api/recetas/${id}`);
      navigate("/");
    }
  };

  if (!receta) return <p className="p-4">Cargando receta...</p>;

  return (
    <div className="container">
      <img
        className="recipe-img"
        src={`http://localhost:3000/${receta.imagenes[0]}`}
        alt={receta.titulo}
      />
      <h1 className="recipe-title">{receta.titulo}</h1>
      <p className="recipe-author">Por: {receta.autor}</p>

      <h2 className="section-title">Ingredientes</h2>
      <ul className="recipe-list">
        {receta.ingredientes.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>

      <h2 className="section-title">Pasos</h2>
      <ul className="recipe-list">
        {receta.pasos.map((p, i) => <li key={i} className="recipe-step">{p}</li>)}
      </ul>

      <div className="button-group">
        <Link to={`/editar/${receta.id}`} className="btn btn-edit">Editar</Link>
        <button onClick={eliminar} className="btn btn-delete">Eliminar</button>
      </div>
    </div>
  );
}