import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecetaForm from "../components/RecetaForm";
import axios from "axios";
import { API_URL } from "../config";

export default function EditarReceta() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(res => setReceta(res.data))
      .catch(err => console.error("Error al obtener la receta:", err));
  }, [id]);

  if (!receta) return <p className="container">Cargando receta...</p>;

  return (
    <div className="container">
      <h1 className="recipe-title">Editar receta</h1>
      <RecetaForm modo="editar" receta={receta} />
    </div>
  );
}