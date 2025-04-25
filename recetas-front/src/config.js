const dev = import.meta.env.DEV;

export const API_URL = dev
  ? "http://localhost:3000/api/recetas"
  : "https://b66dvz9bh3.execute-api.us-east-1.amazonaws.com/api/recetas";


export const IMAGE_URL = dev
  ? "http://localhost:3000/uploads"
  : "https://recetas-imagenes.s3.amazonaws.com";