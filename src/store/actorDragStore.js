import { create } from 'zustand';
import { 
  createActorInstanceInDB, 
  updateActorInstanceInDB, 
  deleteActorInstanceInDB 
} from '../utils/mongoUtils';  // Importar las funciones de la DB

const useActorDragStore = create((set, get) => ({
  actorsInstances: {},

  // Acción para establecer actores en Zustand
  setActorsInstances: (newActors) => {
    set((state) => ({
        actorsInstances: {
          ...state.actorsInstances,
          ...newActors,  // Agregar o actualizar actores desde la DB
        },
    }));
  },

  // Agregar un actor y guardarlo en la base de datos
  addActor: async (actorData) => {
    try {
      // Crear el actor en la base de datos y obtener el ID generado por MongoDB
      const { insertedId } = await createActorInstanceInDB(actorData);

      // Usamos el ID generado por MongoDB para almacenar el actor en Zustand
      set((state) => ({
        actorsInstances: {
          ...state.actorsInstances,
          [insertedId]: {
            ...actorData,  // Guardar el actor en Zustand
            _id: insertedId,  // Asegurarse de tener el ID de MongoDB
          },
        },
      }));
      
      console.log('Actor guardado en la base de datos con ID:', insertedId);
    } catch (error) {
      console.error('Error al guardar el actor en la base de datos:', error);
    }
  },

  // Actualizar la posición de un actor y guardarlo en la base de datos
  updateActorPosition: async (actorId, newPosition) => {
    set((state) => ({
      actorsInstances: {
        ...state.actorsInstances,
        [actorId]: {
          ...state.actorsInstances[actorId],
          position: newPosition,  // Actualizar la posición en Zustand
        },
      },
    }));

    try {
      await updateActorInstanceInDB(actorId, newPosition);  // Actualizar en la base de datos
      console.log('Posición del actor actualizada en la base de datos:', newPosition);
    } catch (error) {
      console.error('Error al actualizar la posición en la base de datos:', error);
    }
  },

  // Eliminar un actor y removerlo de la base de datos
  removeActor: async (instanceId) => {
    set((state) => {
      const updatedActors = { ...state.actorsInstances };
      delete updatedActors[instanceId];  // Eliminar del estado
      return { actorsInstances: updatedActors };
    });

    try {
      await deleteActorInstanceInDB(instanceId);  // Eliminar en la base de datos
      console.log('Actor eliminado de la base de datos:', instanceId);
    } catch (error) {
      console.error('Error al eliminar el actor de la base de datos:', error);
    }
  },

  // Actualizar atributos (nombre, color, etc.) de un actor en Zustand
  updateActorAttributes: (actorId, updatedAttributes) => {
    set((state) => ({
      actorsInstances: {
        ...state.actorsInstances,
        [actorId]: {
          ...state.actorsInstances[actorId],
          actor: {
            ...state.actorsInstances[actorId].actor,
            ...updatedAttributes,  // Actualizar atributos en Zustand
          },
        },
      },
    }));
  },
}));

export default useActorDragStore;
