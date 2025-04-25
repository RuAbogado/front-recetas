// Verifico si estoy en entorno de desarrollo (local) o producción
const dev = import.meta.env.DEV;

// URL base de la API para consumir recetas
// Si estoy en desarrollo, uso localhost
// Si estoy en producción, uso la URL del API Gateway desplegado en AWS
export const API_URL = dev
  ? "http://localhost:3000/api/recetas"
  : "https://b66dvz9bh3.execute-api.us-east-1.amazonaws.com/api/recetas";

// URL base para acceder a imágenes
// En desarrollo, accedo desde la carpeta local "uploads"
// En producción, uso el bucket público de Amazon S3
export const IMAGE_URL = dev
  ? "http://localhost:3000/uploads"
  : "https://recetas-imagenes.s3.amazonaws.com";