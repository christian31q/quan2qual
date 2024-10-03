import requestMongo from "../api/request";

// Projects in Mongo
export const createProjectInDB = async (projectName, userId) => {
    const projectData = {
        document: {
          name: projectName,
          user_id: userId,
          created_at: new Date(),
        }
    };

    const result = await requestMongo("projects", projectData, "insertOne");
    return result;
};

export const fetchProjectsFromDB = async () => {
    const result = await requestMongo('projects', {}, 'find');
    return result.documents;
};

// Eliminar un proyecto y todas las sesiones asociadas
export const deleteProject = async (projectId) => {
    try {
      // 1. Buscar todas las sesiones asociadas al proyecto
      const sessionsResult = await requestMongo('sessions', {
        filter: { project_id: projectId }
      }, 'find');  // Obtenemos las sesiones asociadas al projectId
  
      const sessions = sessionsResult.documents || [];  // Obtener las sesiones si existen
  
      if (sessions.length === 0) {
        //console.log('No se encontraron sesiones asociadas al proyecto.');
      } else {
        // 2. Para cada sesión, eliminar los datos asociados (actores, imágenes, etc.)
        for (const session of sessions) {
          // Eliminar actores asociados a la sesión
          await requestMongo('actors', {
            filter: { session_id: session._id }
          }, 'deleteMany');
          //console.log(`${deleteActorsResult.deletedCount} actors eliminados de la sesión ${session._id}`);

          // Eliminar instancias de actores de relación asociadas a la sesión
          await requestMongo('actors_instances', {
            filter: { sessionId: session._id }
          }, 'deleteMany');
          //console.log(`${deleteActorsInstancesResult.deletedCount} actors_instances eliminadas de la sesión ${session._id}`);
  
          // Eliminar tipos de relación asociadas a la sesión
          await requestMongo('types', {
            filter: { session_id: session._id }
          }, 'deleteMany');
          //console.log(`${deleteTypesResult.deletedCount} types eliminadas de la sesión ${session._id}`);

          // Eliminar relaciones asociadas a la sesión
          await requestMongo('relationships', {
            filter: { session_id: session._id }
          }, 'deleteMany');
          //console.log(`${deleteRelationshipsResult.deletedCount} relationships eliminadas de la sesión ${session._id}`);
          
  
          // Otros datos relacionados a la sesión pueden ser eliminados aquí...
          // const deleteOtherDataResult = await requestMongo('otherCollection', { filter: { session_id: session._id } }, 'deleteMany');
          // console.log(`${deleteOtherDataResult.deletedCount} otros datos eliminados de la sesión ${session._id}`);
        }
  
        // 3. Eliminar las sesiones después de eliminar los datos relacionados
        const deleteSessionsResult = await requestMongo('sessions', {
          filter: { project_id: projectId }
        }, 'deleteMany');  // Eliminar todas las sesiones asociadas al projectId
        console.log(`${deleteSessionsResult.deletedCount} sesiones eliminadas asociadas al proyecto ${projectId}`);
      }
  
      // 4. Eliminar el proyecto en sí
      const deleteProjectResult = await requestMongo('projects', {
        filter: { _id: { "$oid": projectId } }
      }, 'deleteOne');  // Eliminamos el proyecto
  
      if (deleteProjectResult.deletedCount > 0) {
        console.log(`Proyecto ${projectId} eliminado exitosamente.`);
      } else {
        console.error(`Proyecto ${projectId} no encontrado o no pudo ser eliminado.`);
      }
  
      // 5. Retornar el número de proyectos eliminados (1 si se eliminó, 0 si no)
      return deleteProjectResult.deletedCount;
    } catch (error) {
      console.error('Error al eliminar el proyecto y los datos asociados:', error);
      throw error; 
    }
};

// Sessions in Mongo

export const createSessionInDB = async (sessionData) => {
    const result = await requestMongo("sessions", sessionData, "insertOne");
    return result;
};

export const getSessionsByProject = async (projectId) => {
    const result = await requestMongo('sessions', { filter: {
        project_id: projectId
    } }, 'find');
    return result.documents;
};

export const getSessionFromDB = async (sessionId) => {
    const result = await requestMongo("sessions", { filter: { 
        _id: { "$oid": sessionId }
    } }, 'findOne');
    return  result.document;
  };

export const deleteSession = async (sessionId) => {
    try {
      console.log('Session ID a eliminar: ', sessionId);
  
      // 1. Eliminar actores asociados a la sesión
      await requestMongo('actors', {
        filter: { session_id: sessionId  }
      }, 'deleteMany');
      //console.log(`${deleteActorsResult.deletedCount} actores eliminados de la sesión ${sessionId}`);
  
      // 2. Eliminar instancias de actores asociadas a la sesión
      await requestMongo('actors_instances', {
        filter: { sessionId: sessionId  }
      }, 'deleteMany');
      //console.log(`${deleteActorsInstancesResult.deletedCount} instancias de actores eliminadas de la sesión ${sessionId}`);
  
      // 3. Eliminar tipos asociados a la sesión
      await requestMongo('types', {
        filter: { session_id: sessionId  }
      }, 'deleteMany');
      //console.log(`${deleteTypesResult.deletedCount} tipos eliminados de la sesión ${sessionId}`);
  
      // 4. Eliminar relaciones asociadas a la sesión
      await requestMongo('relationships', {
        filter: { session_id: sessionId  }
      }, 'deleteMany');
      //console.log(`${deleteRelationshipsResult.deletedCount} relaciones eliminadas de la sesión ${sessionId}`);
  
      // Otros datos relacionados a la sesión pueden ser eliminados aquí
      // await requestMongo('otherCollection', { filter: { session_id: { "$oid": sessionId } } }, 'deleteMany');
      // console.log('Otros datos eliminados de la sesión');
  
      // 5. Finalmente, eliminar la sesión
      const deleteSessionResult = await requestMongo('sessions', {
        filter: { _id: { "$oid": sessionId } }
      }, 'deleteOne');
      //console.log(`${deleteSessionResult.deletedCount > 0 ? 'Sesión eliminada exitosamente' : 'Sesión no encontrada'}`);
  
      // Retornar el número de sesiones eliminadas (1 si se eliminó, 0 si no)
      return deleteSessionResult.deletedCount;
    } catch (error) {
      console.error('Error al eliminar la sesión y los datos asociados:', error);
      throw error;
    }
};

// Actores en Mongo DB

export const createActorInDB = async (actorData) => {
    const result = await requestMongo("actors", { document: actorData }, "insertOne");
    return result;
};

export const fetchActorsFromDB = async (sessionId) => {
    const result = await requestMongo('actors', { filter: { 
        session_id: sessionId
    } }, 'find');
    return result.documents;
};

export const updateActorInDB = async (actorId, updatedData) => {
    const result = await requestMongo('actors', {
        filter: { _id: { "$oid": actorId } },
        update: {
            "$set": updatedData
        }
    }, 'updateOne');
    return result;
};

export const deleteActorFromDB = async (actorId) => {
    const result = await requestMongo('actors', { filter: { _id: { "$oid": actorId } } }, 'deleteOne');
    return result.deletedCount;
};

// Tipos de relaciones en Mongo DB

export const createRelationTypeInDB = async (relationTypeData) => {
    const result = await requestMongo("types", { document: relationTypeData }, "insertOne");
    return result;
};

export const getRelationTypesFromDB = async (sessionId) => {
    const result = await requestMongo("types", { filter: { 
        session_id: sessionId
    } }, "find");
    return result;
};

export const updateRelationTypeInDB = async (relationTypeId, updatedData) => {
    console.log('Type ID: ', relationTypeId);
    console.log('Update data: ', updatedData);
    const result = await requestMongo('types', {
        filter: { _id: { "$oid": relationTypeId } },
        update: {
            "$set": updatedData
        }
    }, 'updateOne');
    return result;
};

export const deleteRelationTypeInDB = async (relationTypeId) => {
    const result = await requestMongo("types", { filter: { _id: { "$oid": relationTypeId } } }, "deleteOne");
    return result;
};

// Actores dropeados en Mongo DB

export const createActorInstanceInDB = async (actorInstance) => {
    const result = await requestMongo("actors_instances", { document: actorInstance }, "insertOne");
    return result;
};

// Método para obtener instancias de actores por `imageIndex` y `sessionId`
export const getActorInstancesFromDB = async (sessionId, imageIndex) => {
    try {
      const result = await requestMongo('actors_instances', {
        filter: {
          sessionId: sessionId,  
          imageIndex: imageIndex     // Filtramos por la imagen actual
        }
      }, 'find');
      
      return result.documents;  // Retornamos los documentos encontrados
    } catch (error) {
      console.error('Error al obtener instancias de actores:', error);
      return [];
    }
};  

export const updateActorInstanceInDB = async (actorId, newPosition) => {
    const result = await requestMongo("actors_instances", {
      filter: { _id: { "$oid": actorId } },  // Filtro para encontrar la instancia por ID
      update: { 
        "$set": { position: newPosition }  // Actualizar solo la posición
      }
    }, "updateOne");
    return result;
};

export const deleteActorInstanceInDB = async (actorId) => {
    const result = await requestMongo("actors_instances", { filter: { _id: { "$oid": actorId } } }, "deleteOne");
    return result;
};

// Relaciones en Mongo DB

export const createRelationshipInDB = async (relationshipData) => {
  const result = await requestMongo("relationships", { document: relationshipData }, "insertOne");
  return result;
};

export const getRelationshipsFromDB = async (sessionId) => {
  const result = await requestMongo("relationships", { filter: { session_id: sessionId } }, "find");
  return result;
};

export const updateRelationshipInDB = async (relationshipId, updatedData) => {
  const result = await requestMongo("relationships", {
    filter: { _id: { "$oid": relationshipId } },
    update: { "$set": updatedData }
  }, "updateOne");
  return result;
}

export const deleteRelationshipFromDB = async (relationshipId) => {
  const result = await requestMongo("relationships", { filter: { _id: { "$oid": relationshipId } } }, "deleteOne");
  return result;
};