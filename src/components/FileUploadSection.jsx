import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, HStack, Icon } from '@chakra-ui/react';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import { v4 as uuidv4 } from 'uuid';

function FileUploadSection({ videoRef, currentTime, setCurrentTime, setDuration }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [droppedActors, setDroppedActors] = useState([]); // Para almacenar actores soltados
  const videoContainerRef = useRef(); // Para el contenedor del área de destino
  const [actors, setActors] = useState([]);
  const [dragOffset, setDragOffset] = useState({ x: 10, y: 10 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (videoRef.current) {
      const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
      };

      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoRef, setCurrentTime, setDuration]);

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
    
    const actorId = e.dataTransfer.getData('actorId');
    if (!actorId) {
      console.error("No actorId found in dataTransfer!");
      return;
    }
  
    const containerRect = videoContainerRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left;
    const dropY = e.clientY - containerRect.top;
  
    const posX = Math.max(0, Math.min(dropX, containerRect.width));
    const posY = Math.max(0, Math.min(dropY, containerRect.height));
  
    const percentX = (posX / containerRect.width) * 100;
    const percentY = (posY / containerRect.height) * 100;
  
    const existingActor = droppedActors.find((a) => a.id === actorId);
  
    if (existingActor) {
      setDroppedActors((prev) =>
        prev.map((actorInstance) => {
          if (actorInstance.id === actorId) {
            return { ...actorInstance, position: { x: percentX, y: percentY } };
          }
          return actorInstance;
        })
      );
    } else {
      const originalActor = actors.find((a) => a.id === parseInt(actorId, 10));
      if (!originalActor) {
        console.error(`Actor not found with ID: ${actorId}`);
        return;
      }
  
      const newActorInstance = {
        id: uuidv4(),
        actor: originalActor,
        position: { x: percentX, y: percentY },
      };
  
      setDroppedActors((prev) => [...prev, newActorInstance]);
    }
  };   
  
  const handleDragStart = (e, actorId, isExistingActor) => {
    const containerRect = videoContainerRef.current.getBoundingClientRect();
    const offsetX = containerRect.right - e.clientX;
    const offsetY = containerRect.bottom - e.clientY;

    console.log('container rect: ', containerRect);
    console.log('offsetX: ', offsetX);
    console.log('offsetY: ', offsetY);
  
    setDragOffset({ x: offsetX, y: offsetY });
  
    e.dataTransfer.setData('actorId', actorId.toString()); // Asignar el ID
  
    if (isExistingActor) {
      console.log("Dragging existing actor with ID:", actorId); // Depuración
    } else {
      console.log("Dragging new actor with ID:", actorId); // Depuración
    }
  };  

  return (
    <HStack spacing={4}>
      <Box
        w='30vw'
        h='55vh'
        p={4}
        borderWidth='3px'
        borderRadius='lg'
        borderColor='#173378'
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
        h='auto'
        p={4}
        borderWidth='3px'
        borderRadius='lg'
        borderColor='#173378'
        bg='#173378'
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
        {droppedActors.map((dropped) => (
          <Box
            key={dropped.id}
            position='absolute'
            left={`${dropped.position.x}%`}
            top={`${dropped.position.y}%`}
            draggable
            onDragStart={(e) => handleDragStart(e, dropped.id, true)}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            borderRadius='lg'
            padding='12px'
            backgroundColor='transparent'
          >
            {dropped.actor && (
              <>
                <Icon
                  width='50px'
                  height='50px'
                  fontSize='60px'
                  bg={dropped.actor.color}
                  borderRadius='100%'
                >
                  <IconPickerItem value={dropped.actor.icon} size={24} />
                </Icon>
                <Box
                  bg='black'
                  color='white'
                  borderRadius='4px'
                  fontSize='14px'
                  fontWeight='600'
                  width='max-content'
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