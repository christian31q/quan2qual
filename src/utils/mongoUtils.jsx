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

export const deleteProject = async (projectId) => {
    const result = await requestMongo('projects', { filter: { 
        _id: { "$oid": projectId }
    } }, 'deleteOne');    
    return result.deletedCount;
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
    console.log('Session id a eliminar: ', sessionId);

    const result = await requestMongo('sessions', { filter: { 
        _id: { "$oid": sessionId }
    } }, 'deleteOne');

    console.log("Result mongoUtils: ", result);
    return result.deletedCount;
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
