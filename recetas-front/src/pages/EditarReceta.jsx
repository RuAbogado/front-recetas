import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecetaForm from "../components/RecetaForm";
import axios from "axios";

export default function EditarReceta() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/recetas/${id}`)
      .then(res => setReceta(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!receta) return <p className="container">Cargando receta...</p>;

  return (
    <div className="container">
      <h1 className="recipe-title">Editar receta</h1>
      <RecetaForm modo="editar" receta={receta} />
    </div>
  );
}