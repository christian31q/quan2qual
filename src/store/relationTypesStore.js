import { create } from 'zustand';
import { createRelationTypeInDB, getRelationTypesFromDB, updateRelationTypeInDB, deleteRelationTypeInDB } from '../utils/mongoUtils'; // Importar los métodos de Mongo

const useRelationTypeStore = create((set, get) => ({
  relationTypes: [],  // Estado inicial para almacenar los tipos de relaciones
  loading: false,
  error: null,

  // Método para obtener los tipos de relaciones desde la DB
  fetchRelationTypes: async (sessionId) => {
    try {
      set({ loading: true, error: null }); // Activar el estado de carga
      const result = await getRelationTypesFromDB(sessionId);
      
      if (result && result.documents) {
        set({ relationTypes: result.documents, loading: false });  // Guardar los tipos obtenidos
      } else {
        set({ error: 'No se encontraron tipos de relación.', loading: false });
      }
    } catch (error) {
      console.error('Error al obtener los tipos de relación:', error);
      set({ error: 'Error al obtener los tipos de relación.', loading: false });
    }
  },

  // Método para crear un nuevo tipo de relación en la DB y actualizar el estado global
  createRelationType: async (newType) => {
    try {
      set({ loading: true });
      const result = await createRelationTypeInDB(newType);
      
      if (result && result.insertedId) {
        set((state) => ({
          relationTypes: [...state.relationTypes, { ...newType, _id: result.insertedId }],
          loading: false
        }));
      }
    } catch (error) {
      console.error('Error al crear tipo de relación:', error);
      set({ error: 'Error al crear el tipo de relación.', loading: false });
    }
  },

  // Método para actualizar un tipo de relación en la DB y en el estado global
  updateRelationType: async (relationTypeId, updatedData) => {
    try {
      set({ loading: true });
      const result = await updateRelationTypeInDB(relationTypeId, updatedData);
      console.log('Result: ', result);
      console.log('Updated data store: ', updatedData);
      if (result && result.modifiedCount > 0) {
        set((state) => ({
          relationTypes: state.relationTypes.map((type) =>
            type._id === relationTypeId ? { ...type, ...updatedData } : type
          ),
          loading: false,
        }));
      }
    } catch (error) {
      console.error('Error al actualizar tipo de relación:', error);
      set({ error: 'Error al actualizar el tipo de relación.', loading: false });
    }
  },

  // Método para eliminar un tipo de relación en la DB y del estado global
  deleteRelationType: async (relationTypeId) => {
    try {
      set({ loading: true });
      const result = await deleteRelationTypeInDB(relationTypeId);

      if (result && result.deletedCount > 0) {
        set((state) => ({
          relationTypes: state.relationTypes.filter((type) => type._id !== relationTypeId),
          loading: false,
        }));
      }
    } catch (error) {
      console.error('Error al eliminar tipo de relación:', error);
      set({ error: 'Error al eliminar el tipo de relación.', loading: false });
    }
  },
}));

export default useRelationTypeStore;
