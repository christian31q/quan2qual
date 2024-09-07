import requestMongo from "../api/request";


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

export const getSessionsByProject = async (projectId) => {
    const result = await requestMongo('sessions', { filter: {
        project_id: projectId
    } }, 'find');
    return result.documents;
};

export const deleteSession = async (sessionId) => {
    console.log('Session id a eliminar: ', sessionId);

    const result = await requestMongo('sessions', { filter: { 
        _id: { "$oid": sessionId }
    } }, 'deleteOne');

    console.log("Result mongoUtils: ", result);
    return result.deletedCount;
};

  