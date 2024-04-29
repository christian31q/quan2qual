import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, HStack, Icon } from '@chakra-ui/react';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import { v4 as uuidv4 } from 'uuid';

function FileUploadSection({ videoRef }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [droppedActors, setDroppedActors] = useState([]); // Para almacenar actores soltados
  const videoContainerRef = useRef(); // Para el contenedor del área de destino
  const [actors, setActors] = useState([]);
  const [dragOffset, setDragOffset] = useState({ x: 50, y: 50 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    const storedActors = JSON.parse(localStorage.getItem('actors'));
    if (storedActors) {
      setActors(storedActors);
    }
  }, []);

  useEffect(() => {
    const handleEditActor = (event) => {
      const { index, editedName, editedColor } = event.detail;
      setActors(prevActors => {
        const updatedActors = [...prevActors];
        updatedActors[index] = { ...updatedActors[index], name: editedName, color: editedColor };
        return updatedActors;
      });
    };
  
    document.addEventListener('editActor', handleEditActor);
  
    return () => {
      document.removeEventListener('editActor', handleEditActor);
    };
  }, [actors]);

  useEffect(() => {
    const handleNewActor = (event) => {
      const { detail } = event;
      setActors((prevActors) => {
        const updatedActors = [...prevActors, detail];
        localStorage.setItem('actors', JSON.stringify(updatedActors)); 
        return updatedActors;
      });
    };
  
    document.addEventListener('newActor', handleNewActor);
  
    return () => {
      document.removeEventListener('newActor', handleNewActor);
    };
  }, []);
  
  /*
    al editar color y nombre las instancias no cambian su estado, solo los 
    actores originales, revisar esa parte y forma de borrar el actor una vez
    está en la zona 
  */




  // Este efecto es para actualizar los droppedActors cuando cambian los actores base
  useEffect(() => {
    setDroppedActors((prevDroppedActors) => {
      return prevDroppedActors.map((droppedActor) => {
        const updatedActor = actors.find((actor) => actor.name === droppedActor.actor.name);
        return {
          ...droppedActor,
          actor: updatedActor || droppedActor.actor,
        };
      });
    });
  }, [actors]);

  const handleDrop = (e) => {
    e.preventDefault();
    
    const actorId = e.dataTransfer.getData('actorId'); // Verificar si hay ID
    if (!actorId) {
      console.error("No actorId found in dataTransfer!"); // Manejo de errores
      return;
    }
    
    const containerRect = videoContainerRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left - dragOffset.x;
    const dropY = e.clientY - containerRect.top - dragOffset.y;
    
    // Verificar si es un actor existente
    const existingActor = droppedActors.find((a) => a.id === actorId);

    if (existingActor) {
      // Mover el actor existente
      setDroppedActors((prev) => 
        prev.map((actorInstance) => {
          if (actorInstance.id === actorId) {
            return { ...actorInstance, position: { x: dropX, y: dropY } }; // Actualizar posición
          }
          return actorInstance;
        })
      );
    } else {
      console.log("Current actors:", actors);

      // Si es un actor nuevo, encontrar el actor original por su ID
      const originalActor = actors.find((a) => a.id === parseInt(actorId, 10)); // Buscar el actor original
      if (!originalActor) {
        console.error(`Actor not found with ID: ${actorId}`); // Manejo de errores
        return;
      }

      // Crear una nueva instancia
      const newActorInstance = {
        id: uuidv4(), // Nuevo ID para la instancia
        actor: originalActor,
        position: { x: dropX, y: dropY },
      };

      setDroppedActors((prev) => [...prev, newActorInstance]); // Agregar la nueva instancia
    }
  };
  
  const handleDragStart = (e, actorId, isExistingActor) => {
    const elementRect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - elementRect.left;
    const offsetY = e.clientY - elementRect.top;

    setDragOffset({ x: offsetX, y: offsetY });

    e.dataTransfer.setData('actorId', actorId.toString()); // Asignar el ID

    if (isExistingActor) {
      console.log("Dragging existing actor with ID:", actorId); // Depuración
    } else {
      console.log("Dragging new actor with ID:", actorId); // Depuración
    }
  };

  const handleActorMove = (e) => {
    const actorId = e.dataTransfer.getData('actorId'); // Obtener el ID
    if (!actorId) {
      console.error("No actorId found in dataTransfer!"); // Manejo de errores
      return;
    }
  
    const containerRect = videoContainerRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left - dragOffset.x;
    const dropY = e.clientY - containerRect.top - dragOffset.y;
  
    setDroppedActors((prev) => {
      return prev.map((actorInstance) => {
        if (actorInstance.id === actorId) { // Compara con el ID único del actor
          return { ...actorInstance, position: { x: dropX, y: dropY } }; // Actualizar posición
        }
        return actorInstance;
      });
    });
  };

  return (
    <HStack spacing={4}>
      <Box
        w='30vw'
        h='55vh'
        p={4}
        borderWidth='3px'
        borderRadius='lg'
        borderColor='#041D39'
        align='center'
        mt='2vh'
        ml='2vh'
        display='flex'
        justifyContent='center'
        alignItems='flex-start'
      >
        <GridBodyActors
          actors={actors}
          handleDragStart={(e, actorId) => handleDragStart(e, actorId, false)} // Configurar el ID correctamente
        />
      </Box>
      <Box
        ref={videoContainerRef}
        w='60vw'
        h='55vh'
        p={4}
        borderWidth='3px'
        borderRadius='lg'
        borderColor='#041D39'
        bg='#041D39'
        align='center'
        mt='2vh'
        mr='2.5vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
        position='relative'
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <video
            ref={videoRef}
            width='100%'
            height='100%'
            controls={false}
            onLoadedData={() => videoRef.current.pause()}
          >
            <source src={URL.createObjectURL(selectedFile)} type='video/mp4' />
            Tu navegador no soporta el elemento de video.
          </video>
        ) : (
          <label className='file-upload-label'>
            <span>Seleccionar archivo de video</span>
            <Input
              type='file'
              accept='video/*'
              onChange={handleFileChange}
              className='file-upload-input'
            />
          </label>
        )}

        {droppedActors.map((dropped, index) => (
          <Box
            key={dropped.id} // Usar el ID único para identificar
            position='absolute'
            left={`${dropped.position.x}px`}
            top={`${dropped.position.y}px`}
            draggable // Permite mover dentro de la zona
            onDragStart={(e) => handleDragStart(e, dropped.id, true)} // Para mover actores existentes
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            borderRadius='lg'
            padding='16px'
            backgroundColor='transparent'
          >
            {dropped.actor && (
              <>
                <Icon
                  fontSize='60px'
                  bg={dropped.actor.color}
                  borderRadius='100%'
                >
                  <IconPickerItem value={dropped.actor.icon} size={24} />
                </Icon>
                <Box
                  bg='black'
                  color='white'
                  borderRadius='5px'
                >
                  {dropped.actor.name}
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    </HStack>
  );
}

export default FileUploadSection;