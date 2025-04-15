import axios from 'axios';

// Servicio para interactuar con la API de vales
const valesService = {
  // Crear un nuevo vale
  crearVale: async (valeData) => {
    try {
      const response = await axios.post('/api/vales', valeData);
      return response.data;
    } catch (error) {
      console.error('Error al crear vale:', error);
      throw error;
    }
  },

  // Obtener todos los vales
  obtenerVales: async () => {
    try {
      const response = await axios.get('/api/vales');
      return response.data;
    } catch (error) {
      console.error('Error al obtener vales:', error);
      throw error;
    }
  },

  // Buscar vales con filtros
  buscarVales: async (filtros) => {
    try {
      const response = await axios.get('/api/vales/buscar', { params: filtros });
      return response.data;
    } catch (error) {
      console.error('Error al buscar vales:', error);
      throw error;
    }
  },

  // Marcar vale como pagado
  marcarComoPagado: async (valeId) => {
    try {
      const response = await axios.put(`/api/vales/${valeId}/pagar`);
      return response.data;
    } catch (error) {
      console.error('Error al marcar vale como pagado:', error);
      throw error;
    }
  },

  // Exportar vales a CSV
  exportarVales: () => {
    window.open('/api/vales/exportar', '_blank');
  }
};

export default valesService;
