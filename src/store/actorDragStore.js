import { create } from 'zustand';

// Estado global para gestionar los actores y sus posiciones
const useActorDragStore = create((set) => ({
  actorsInstances: {},
  
  // Actualizar la posición de un actor
  updateActorPosition: (actorId, newPosition) => {
    set((state) => ({
      actorsInstances: {
        ...state.actorsInstances,
        [actorId]: {
          ...state.actorsInstances[actorId],
          position: newPosition,
        },
      },
    }));
  },

  // Agregar un actor
  addActor: (instanceId, actorData) => {
    set((state) => ({
      actorsInstances: {
        ...state.actorsInstances,
        [instanceId]: actorData,  // Guardar el actor
      },
    }));
  },

  // **Nuevo método para actualizar el actor**
  updateActorAttributes: (actorId, updatedAttributes) => {
    set((state) => ({
      actorsInstances: {
        ...state.actorsInstances,
        [actorId]: {
          ...state.actorsInstances[actorId],
          actor: {
            ...state.actorsInstances[actorId].actor,
            ...updatedAttributes,
          },
        },
      },
    }));
  },

  // Eliminar un actor
  removeActor: (instanceId) => {
    set((state) => {
      const updatedActors = { ...state.actorsInstances };
      delete updatedActors[instanceId];
      return { actorsInstances: updatedActors };
    });
  },
}));

export default useActorDragStore;
