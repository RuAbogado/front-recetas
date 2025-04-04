import RecetaForm from "../components/RecetaForm";

export default function CrearReceta() {
  return (
    <div className="container">
      <div className="form-card">
        <h1 className="form-title">Agregar nueva receta</h1>
        <RecetaForm modo="crear" />
      </div>
    </div>
  );
}