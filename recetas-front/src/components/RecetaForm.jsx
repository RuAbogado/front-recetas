import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { API_URL } from "../config";

export default function RecetaForm({ modo, receta = {} }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState(receta.titulo || "");
  const [autor, setAutor] = useState(receta.autor || "");
  const [ingredientes, setIngredientes] = useState(receta.ingredientes?.join("\n") || "");
  const [pasos, setPasos] = useState(receta.pasos?.join("\n") || "");
  const [imagenes, setImagenes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = [];

      for (const img of imagenes) {
        const fileName = `${Date.now()}-${img.name}`;
        const uploadUrl = `https://recetas-imagenes.s3.amazonaws.com/${fileName}`;

        await fetch(uploadUrl, {
          method: "PUT",
          body: img,
          headers: {
            "Content-Type": img.type,
          },
        });

        imageUrls.push(`https://recetas-imagenes.s3.amazonaws.com/${fileName}`);
      }

      const payload = {
        titulo,
        autor,
        ingredientes,
        pasos,
        imagenes: imageUrls,
      };

      if (modo === "crear") {
        await axios.post(API_URL, payload);
        Swal.fire({ icon: "success", title: "¡Receta creada!", confirmButtonColor: "#d92372" });
      } else {
        await axios.put(`${API_URL}/${id}`, payload);
        Swal.fire({ icon: "success", title: "¡Receta actualizada!", confirmButtonColor: "#d92372" });
      }

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Error al guardar receta", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al guardar la receta.",
        confirmButtonColor: "#e63946",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="input" type="text" placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      <input className="input" type="text" placeholder="Autor" value={autor} onChange={e => setAutor(e.target.value)} required />
      <textarea className="input" placeholder="Ingredientes (uno por línea)" value={ingredientes} onChange={e => setIngredientes(e.target.value)} rows={4} required />
      <textarea className="input" placeholder="Pasos (uno por línea)" value={pasos} onChange={e => setPasos(e.target.value)} rows={4} required />
      <input type="file" multiple onChange={e => setImagenes([...e.target.files])} />
      <button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded">
        {modo === "crear" ? "Crear" : "Actualizar"}
      </button>
    </form>
  );
}