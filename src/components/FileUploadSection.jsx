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

  const handleDragOver = (e) => {
    e.preventDefault(); // Permitir el evento de soltar
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const containerRect = videoContainerRef.current.getBoundingClientRect();

    const dropX = e.clientX - containerRect.left - dragOffset.x; // Calcular coordenadas relativas
    const dropY = e.clientY - containerRect.top - dragOffset.y;

    const actorName = e.dataTransfer.getData('actorName');
    const actor = actors.find((a) => a.name === actorName);

    if (!actor) {
      console.error(`Actor not found: ${actorName}`);
      return;
    }

    const newActorInstance = {
      id: uuidv4(), // ID único para cada instancia
      actor,
      position: { x: dropX, y: dropY },
    };

    setDroppedActors((prev) => [...prev, newActorInstance]); // Agregar nuevo actor
  };

  const handleDragStart = (e, actorId, isExistingActor) => {
    const containerRect = videoContainerRef.current.getBoundingClientRect();
    const elementRect = e.target.getBoundingClientRect();

    const offsetX = e.clientX - elementRect.left;
    const offsetY = e.clientY - elementRect.top;

    setDragOffset({ x: offsetX, y: offsetY });

    if (!isExistingActor) {
      e.dataTransfer.setData('actorName', actorId);
    } else {
      e.dataTransfer.setData('actorId', actorId); // Para identificar al actor en el área de arrastre
    }
  };

  const handleActorMove = (e) => {
    const actorId = e.dataTransfer.getData('actorId');
    const containerRect = videoContainerRef.current.getBoundingClientRect();

    const dropX = e.clientX - containerRect.left - dragOffset.x; // Coordenadas relativas
    const dropY = e.clientY - containerRect.top - dragOffset.y;

    setDroppedActors((prev) =>
      prev.map((actor) => {
        if (actor.id === actorId) {
          return { ...actor, position: { x: dropX, y: dropY } };
        }
        return actor;
      })
    );
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
          handleDragStart={(e) => handleDragStart(e, e.target.getAttribute('data-actor-name'), false)}
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
        onDragOver={handleDragOver}
        onDrop={(e) => {
          if (e.dataTransfer.getData('actorId')) {
            handleActorMove(e); // Mover actor existente
          } else {
            handleDrop(e); // Agregar nuevo actor
          }
        }}
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