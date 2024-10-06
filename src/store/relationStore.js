import { create } from 'zustand';
import { 
  createRelationshipInDB, 
  getRelationshipsFromDB, 
  updateRelationshipInDB, 
  deleteRelationshipFromDB 
} from '../utils/mongoUtils';

const useRelationStore = create((set) => ({
  relations: [],
  temporaryRelation: null,

  setTemporaryRelation: (relation) => set({ temporaryRelation: relation }),

  // Cargar relaciones desde la base de datos
  loadRelations: async (sessionId) => {
    try {
      const result = await getRelationshipsFromDB(sessionId);
      set(() => ({ relations: result.documents })); // Asignar las relaciones obtenidas desde la DB
    } catch (error) {
      console.error('Error cargando relaciones desde la DB: ', error);
    }
  },

  // Añadir una nueva relación (local + DB)
  addRelation: async (newRelation) => {
    try {
      const result = await createRelationshipInDB(newRelation); // Guardar en la DB
      const createdRelation = { ...newRelation, _id: result.insertedId }; // Incluir el ID generado por Mongo
      set((state) => ({
        relations: [...state.relations, createdRelation], // Actualizar el estado local
      }));
    } catch (error) {
      console.error('Error creando relación: ', error);
    }
  },

  // Actualizar una relación existente (local + DB)
  updateRelation: async (relationId, updatedRelationData) => {
    try {
      const { _id, ...dataToUpdate } = updatedRelationData;

      await updateRelationshipInDB(relationId, dataToUpdate); // Actualizar en la DB
      set((state) => ({
        relations: state.relations.map((relation) =>
          relation._id === relationId ? { ...relation, ...dataToUpdate } : relation
        ),
      }));
    } catch (error) {
      console.error('Error actualizando relación: ', error);
    }
  },

  // Eliminar una relación (local + DB)
  removeRelation: async (relationId) => {
    try {
      await deleteRelationshipFromDB(relationId); // Eliminar de la DB
      set((state) => ({
        relations: state.relations.filter((relation) => relation._id !== relationId),
      }));
    } catch (error) {
      console.error('Error eliminando relación: ', error);
    }
  },
}));

export default useRelationStore;