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

  