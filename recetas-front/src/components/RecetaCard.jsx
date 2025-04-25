// Importo Link de react-router-dom para hacer navegación interna
import { Link } from 'react-router-dom';

// Componente que representa una "tarjeta" individual de receta
// Recibe una receta como prop
export default function RecetaCard({ receta }) {
  return (
    // Contenedor principal con estilos para que se vea como una tarjeta moderna
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">

      {/* Imagen principal de la receta (uso solo la primera imagen) */}
      <img
        src={receta.imagenes[0]} // Ya contiene la URL completa desde S3 o local
        alt={receta.titulo}
        className="w-full h-48 object-cover" // Se adapta visualmente sin deformar
      />

      {/* Contenido de la tarjeta: título, autor y enlace */}
      <div className="p-4">
        {/* Título de la receta */}
        <h2 className="text-lg font-bold">{receta.titulo}</h2>

        {/* Nombre del autor de la receta */}
        <p className="text-sm text-gray-600">Por: {receta.autor}</p>

        {/* Enlace para ver los detalles completos de la receta */}
        <Link
          to={`/receta/${receta.id}`} // Navega a la vista de detalle por ID
          className="text-rose-500 font-semibold mt-2 inline-block"
        >
          Ver más →
        </Link>
      </div>
    </div>
  );
}