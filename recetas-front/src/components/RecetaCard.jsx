import { Link } from 'react-router-dom';

export default function RecetaCard({ receta }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={`http://localhost:3000/${receta.imagenes[0]}`}
        alt={receta.titulo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold">{receta.titulo}</h2>
        <p className="text-sm text-gray-600">Por: {receta.autor}</p>
        <Link
          to={`/receta/${receta.id}`}
          className="text-rose-500 font-semibold mt-2 inline-block"
        >
          Ver más →
        </Link>
      </div>
    </div>
  );
}