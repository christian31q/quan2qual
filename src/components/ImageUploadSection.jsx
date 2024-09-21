import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, HStack, Icon, Text } from '@chakra-ui/react';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import { v4 as uuidv4 } from 'uuid';
import useActorStore from '../store/actorStore';

// Función para convertir archivo a Base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file); // Convertir el archivo a Base64
  });
};

function ImageUploadSection({ mediaRef, setSelectedImages, currentImage, setCurrentTime, setDuration, sessionId }) {
  const { actors, fetchActors } = useActorStore();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [droppedActors, setDroppedActors] = useState([]);
  const containerRef = useRef();

  // Maneja la selección de archivos
  const handleFileChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...selectedFiles, ...newFiles];

    // Convertir archivos a Base64 y crear URLs temporales
    const imageUrls = await Promise.all(
      updatedFiles.map(async (file) => ({
        id: uuidv4(),  // Generamos un ID único para cada archivo
        fileName: file.name,  // Guardar el nombre del archivo
        base64: await getBase64(file),  // Convertir a Base64
        sessionId,  // Asignamos la imagen a la sesión actual
      }))
    );

    setSelectedFiles(updatedFiles);
    setSelectedImages(imageUrls.map(img => img.base64));  // Actualizamos las imágenes en el componente padre

    // Guardamos en localStorage en Base64
    const savedImages = JSON.parse(localStorage.getItem(`images-${sessionId}`)) || [];
    const combinedImages = [...savedImages, ...imageUrls];
    localStorage.setItem(`images-${sessionId}`, JSON.stringify(combinedImages));
  };

  // Carga las imágenes almacenadas en localStorage cuando se monta el componente
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem(`images-${sessionId}`));
    if (storedImages) {
      setSelectedFiles(storedImages.map(img => ({ fileName: img.fileName, base64: img.base64 })));
      setSelectedImages(storedImages.map(img => img.base64));
    }
  }, [sessionId]);

  // Cargar actores al montar el componente
  useEffect(() => {
    fetchActors(sessionId); // Llama a la función de Zustand para obtener actores de MongoDB
  }, [fetchActors]);

  // Maneja el arrastre y caída de actores
  const handleDrop = (e) => {
    e.preventDefault();
    const actorId = e.dataTransfer.getData('actorId'); // Obtener el ID del actor arrastrado
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
      // Aquí el `actors` debería venir del store o un estado que tenga la lista de actores
      const originalActor = actors.find((a) => a._id === actorId); // Usamos `_id`
      if (!originalActor) return;

      const newActorInstance = {
        id: originalActor._id,
        actor: originalActor,
        position: { x: percentX, y: percentY },
      };

      setDroppedActors((prev) => [...prev, newActorInstance]);
    }
  };

  // Maneja el inicio del arrastre de actores
  const handleDragStart = (e, actorId) => {
    e.dataTransfer.setData('actorId', actorId.toString()); // Asignar `actorId`
  };

  // Renderiza el área de carga de imágenes
  const renderImages = () => {
    return (
      <>
        {/* Si hay una imagen seleccionada, mostrar solo esa imagen */}
        {currentImage ? (
          <img
            ref={mediaRef}
            src={currentImage}
            alt="Imagen seleccionada"
            width="100%"
            height="100%"
            style={{ objectFit: 'contain' }}
          />
        ) : selectedFiles.length > 0 ? (
          <img
            ref={mediaRef}
            src={selectedFiles[0].base64}
            alt="Primera imagen"
            width="100%"
            height="100%"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          // Mostrar el input grande cuando no haya imágenes
          <label className='file-upload-label'>
            <span>Seleccionar las imágenes</span>
            <Input
              type='file'
              id='file-upload-input-large'
              accept='image/*'
              onChange={handleFileChange}
              className='file-upload-input'
              multiple
            />
          </label>
        )}
  
        {/* Input de subida de archivos oculto para el botón "Subir más" */}
        <Input
          type='file'
          id='file-upload-input-hidden'
          accept='image/*'
          onChange={handleFileChange}
          className='file-upload-input'
          multiple
          style={{ display: 'none' }}  // Oculto para ser clickeado por el botón extra
        />
      </>
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
          handleDragStart={(e, actorId) => handleDragStart(e, actorId)}
        />
      </Box>
      <Box
        ref={containerRef}
        w='60vw'
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
        {renderImages()}
        {droppedActors.map((dropped) => (
          <Box
            key={dropped.id}
            position='absolute'
            left={`${dropped.position.x}%`}
            top={`${dropped.position.y}%`}
            draggable
            onDragStart={(e) => handleDragStart(e, dropped.id)}
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

export default ImageUploadSection;
