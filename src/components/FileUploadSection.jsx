import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, HStack, Icon, Text } from '@chakra-ui/react';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import { v4 as uuidv4 } from 'uuid';

function FileUploadSection({ mediaType, mediaRef, currentTime, setCurrentTime, setDuration }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [droppedActors, setDroppedActors] = useState([]); 
  const containerRef = useRef(); 
  const [actors, setActors] = useState([]);
  const [dragOffset, setDragOffset] = useState({ x: 10, y: 10 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (mediaType === 'video' || mediaType === 'image') {
      if (mediaRef.current) {
        const handleTimeUpdate = () => {
          setCurrentTime(mediaRef.current.currentTime);
        };

        const handleLoadedMetadata = () => {
          setDuration(mediaRef.current.duration);
        };

        mediaRef.current.addEventListener('timeupdate', handleTimeUpdate);
        mediaRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
          mediaRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          mediaRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }
    }
  }, [mediaRef, setCurrentTime, setDuration, mediaType]);

  useEffect(() => {
    const storedActors = JSON.parse(localStorage.getItem('actors'));
    if (storedActors) {
      setActors(storedActors);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    
    const actorId = e.dataTransfer.getData('actorId');
    if (!actorId) return;

    const containerRect = containerRef.current.getBoundingClientRect();
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
      if (!originalActor) return;

      const newActorInstance = {
        id: uuidv4(),
        actor: originalActor,
        position: { x: percentX, y: percentY },
      };

      setDroppedActors((prev) => [...prev, newActorInstance]);
    }
  };   

  const handleDragStart = (e, actorId, isExistingActor) => {
    setDragOffset({ x: e.clientX, y: e.clientY });
    e.dataTransfer.setData('actorId', actorId.toString()); 
  };

  const renderMediaViewer = () => {
    if (mediaType === 'video') {
      return selectedFile ? (
        <video
          ref={mediaRef}
          width='100%'
          height='100%'
          controls={false}
          onLoadedData={() => mediaRef.current.pause()}
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
      );
    } else if (mediaType === 'image') {
      return selectedFile ? (
        <img
          ref={mediaRef}
          src={URL.createObjectURL(selectedFile)}
          alt='Imagen seleccionada'
          width='100%'
          height='100%'
        />
      ) : (
        <label className='file-upload-label'>
          <span>Seleccionar las imágenes</span>
          <Input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='file-upload-input'
          />
        </label>
      );
    } else {
      return <Text>Media type no soportado aún.</Text>;
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
          handleDragStart={(e, actorId) => handleDragStart(e, actorId, false)}
        />
      </Box>
      <Box
        ref={containerRef}
        w='60vw'
        //h='auto'
        maxHeight='55vh'
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
        {renderMediaViewer()}

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
