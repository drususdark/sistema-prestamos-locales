import axios from 'axios';

// Servicio para interactuar con la API de usuarios
const usuariosService = {
  // Obtener todos los usuarios (locales)
  obtenerUsuarios: async () => {
    try {
      const response = await axios.get('/api/usuarios');
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },

  // Obtener un usuario específico por ID
  obtenerUsuarioPorId: async (id) => {
    try {
      const response = await axios.get(`/api/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }
};

export default usuariosService;
