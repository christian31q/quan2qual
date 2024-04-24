import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, HStack, Icon } from '@chakra-ui/react';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';

function FileUploadSection({ videoRef }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [droppedActors, setDroppedActors] = useState([]); // Para almacenar actores soltados
  const videoContainerRef = useRef(); // Para el contenedor del área de destino
  const [actors, setActors] = useState([]);
  const [dragOffset, setDragOffset] = useState({ x: 50, y: 50 }); // Para el offset del arrastre

  // Ahora que se pueda modificar el drag dentro de la zona asignada
  // Cuando se edita cambiar los elementos de la ficha en drag

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

  const handleDragOver = (e) => {
    e.preventDefault(); // Permitir el evento de soltar
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const containerRect = videoContainerRef.current.getBoundingClientRect();

    const dropX = e.clientX - containerRect.left - dragOffset.x; // Calcular coordenada X ajustando por el offset
    const dropY = e.clientY - containerRect.top - dragOffset.y; // Calcular coordenada Y ajustando por el offset

    const actorName = e.dataTransfer.getData('actorName');
    const actor = actors.find((a) => a.name === actorName);

    // Almacenar actor y posición relativa
    setDroppedActors((prev) => [
      ...prev,
      { actor, position: { x: dropX, y: dropY } },
    ]);
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
        <GridBodyActors actors={actors} handleDragStart={(e) => {
          const containerRect = videoContainerRef.current.getBoundingClientRect();

          // Calcular el offset al arrastrar, basado en el centro del elemento
          const elementRect = e.target.getBoundingClientRect();
          const offsetX = e.clientX - elementRect.left - elementRect.width / 2;
          const offsetY = e.clientY - elementRect.top - elementRect.height / 2;

          setDragOffset({ x: offsetX, y: offsetY });

          e.dataTransfer.setData('actorName', e.target.getAttribute('data-actor-name'));
        }} />
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
            key={index}
            position='absolute'
            left={`${dropped.position.x}px`}
            top={`${dropped.position.y}px`}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            borderRadius='lg'
            padding='16px'
            backgroundColor='transparent'
          >
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
          </Box>
        ))}
      </Box>
    </HStack>
  );
}

export default FileUploadSection;