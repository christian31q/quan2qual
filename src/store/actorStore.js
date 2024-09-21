import { create } from 'zustand';
import { createActorInDB, fetchActorsFromDB, updateActorInDB, deleteActorFromDB } from '../utils/mongoUtils';

const useActorStore = create((set, get) => ({
    actors: [],
    loading: false,
    error: null,
  
    // Obtener todos los actores de MongoDB
    fetchActors: async (sessionId) => {
      set({ loading: true });
      try {
        const actors = await fetchActorsFromDB(sessionId);
        set({ actors, loading: false });
      } catch (err) {
        set({ error: 'Error al obtener los actores', loading: false });
      }
    },
  
    // Crear un nuevo actor en MongoDB
    createActor: async (actorData) => {
      try {
        const result = await createActorInDB(actorData);
        set((state) => ({
          actors: [...state.actors, { ...actorData, _id: result.insertedId }],
        }));
      } catch (err) {
        set({ error: 'Error al crear el actor' });
      }
    },
  
    // Actualizar un actor en MongoDB
    updateActor: async (actorId, updatedData) => {
      try {
        await updateActorInDB(actorId, updatedData);
        set((state) => ({
          actors: state.actors.map((actor) =>
            actor._id === actorId ? { ...actor, ...updatedData } : actor
          ),
        }));
      } catch (err) {
        set({ error: 'Error al actualizar el actor' });
      }
    },
  
    // Eliminar un actor de MongoDB
    deleteActor: async (actorId) => {
      try {
        await deleteActorFromDB(actorId);
        set((state) => ({
          actors: state.actors.filter((actor) => actor._id !== actorId),
        }));
      } catch (err) {
        set({ error: 'Error al eliminar el actor' });
      }
    },
  }));
  
  export default useActorStore;