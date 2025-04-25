// Importo hooks y librerías necesarias
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { API_URL } from "../config";

// Componente del formulario para crear o editar una receta
export default function RecetaForm({ modo, receta = {} }) {
  const navigate = useNavigate();           // Para redirigir después de guardar
  const { id } = useParams();               // Obtener el ID de la receta en modo edición

  // Estados locales para los campos del formulario
  const [titulo, setTitulo] = useState(receta.titulo || "");
  const [autor, setAutor] = useState(receta.autor || "");
  const [ingredientes, setIngredientes] = useState(receta.ingredientes?.join("\n") || "");
  const [pasos, setPasos] = useState(receta.pasos?.join("\n") || "");
  const [imagenes, setImagenes] = useState([]); // Archivos seleccionados desde input

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = [];

      // Si no se suben nuevas imágenes en modo edición, se conservan las anteriores
      if (imagenes.length === 0 && modo === "editar") {
        imageUrls.push(...receta.imagenes);
      } else {
        // Subo cada imagen al bucket de S3 (público)
        for (const img of imagenes) {
          const fileName = `${Date.now()}-${img.name}`; // Nombre único basado en timestamp
          const uploadUrl = `https://recetas-imagenes.s3.amazonaws.com/${fileName}`;

          // Subo el archivo con fetch usando método PUT
          await fetch(uploadUrl, {
            method: "PUT",
            body: img,
            headers: {
              "Content-Type": img.type,
            },
          });

          // Guardo la URL de la imagen ya subida
          imageUrls.push(`https://recetas-imagenes.s3.amazonaws.com/${fileName}`);
        }
      }

      // Objeto con los datos a guardar o actualizar
      const payload = {
        titulo,
        autor,
        ingredientes,
        pasos,
        imagenes: imageUrls,
      };

      // POST si estamos creando, PUT si estamos editando
      if (modo === "crear") {
        await axios.post(API_URL, payload);
        Swal.fire({ icon: "success", title: "¡Receta creada!", confirmButtonColor: "#d92372" });
      } else {
        await axios.put(`${API_URL}/${id}`, payload);
        Swal.fire({ icon: "success", title: "¡Receta actualizada!", confirmButtonColor: "#d92372" });
      }

      // Después de un segundo y medio, redireccionamos al inicio
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

  // Formulario con inputs controlados y campos obligatorios
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="input"
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        required
      />

      <input
        className="input"
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={e => setAutor(e.target.value)}
        required
      />

      <textarea
        className="input"
        placeholder="Ingredientes (uno por línea)"
        value={ingredientes}
        onChange={e => setIngredientes(e.target.value)}
        rows={4}
        required
      />

      <textarea
        className="input"
        placeholder="Pasos (uno por línea)"
        value={pasos}
        onChange={e => setPasos(e.target.value)}
        rows={4}
        required
      />

      {/* Input para seleccionar múltiples archivos de imagen */}
      <input
        type="file"
        multiple
        onChange={e => setImagenes([...e.target.files])}
      />

      {/* Botón que cambia su texto según si se crea o edita */}
      <button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded">
        {modo === "crear" ? "Crear" : "Actualizar"}
      </button>
    </form>
  );
}