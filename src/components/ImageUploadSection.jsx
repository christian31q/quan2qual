import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Input, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
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

function ImageUploadSection({ mediaRef, setSelectedImages, currentImage,  sessionId, currentImageIndex, actorsPerImage, setActorsPerImage  }) {
  const { t } = useTranslation();
  const { actors, fetchActors } = useActorStore();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [droppedActors, setDroppedActors] = useState([]);
  const [actorToDelete, setActorToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(`Índice de la imagen activa en ImageUploadSection: ${currentImageIndex}`);
  }, [currentImageIndex]);

  // Obtener los actores de la imagen activa
  const actorsForCurrentImage = actorsPerImage[currentImageIndex] || [];

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
    const actorId = e.dataTransfer.getData('actorId');
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX'));  // Leer el desplazamiento en X
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY'));  // Leer el desplazamiento en Y
  
    if (!actorId) return;
  
    const containerRect = containerRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left - offsetX;  // Ajustar posición en X
    const dropY = e.clientY - containerRect.top - offsetY;   // Ajustar posición en Y
  
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
      const originalActor = actors.find((a) => a._id === actorId);
      if (!originalActor) return;
  
      const newActorInstance = {
        id: uuidv4(),
        actorId: originalActor._id,
        actor: originalActor,
        position: { x: percentX, y: percentY },
        imageIndex: currentImageIndex,
      };

      console.log('Actor dropped: ', newActorInstance);
  
      setDroppedActors((prev) => [...prev, newActorInstance]);

      // Actualizar `actorsPerImage` para la imagen actual
      setActorsPerImage((prev) => {
        const updated = { ...prev };
        const currentActors = updated[currentImageIndex] || [];  // Obtener actores de la imagen actual
        updated[currentImageIndex] = [...currentActors, newActorInstance];  // Agregar nuevo actor
        return updated;  // Actualizar el estado global
      });
    }
  };   

  // Maneja el inicio del arrastre de actores
  const handleDragStart = (e, actorId) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Obtener el tamaño y posición del actor
    const offsetX = e.clientX - rect.left;  // Posición relativa del cursor dentro del actor (X)
    const offsetY = e.clientY - rect.top;

    // Almacenar el ID del actor y la posición relativa en `dataTransfer`
    e.dataTransfer.setData('actorId', actorId.toString());
    e.dataTransfer.setData('offsetX', offsetX.toString());
    e.dataTransfer.setData('offsetY', offsetY.toString());
  };

  // Escuchar cambios en los actores originales
  useEffect(() => {
    const updateActorInstances = () => {
      setDroppedActors((prevDroppedActors) =>
        prevDroppedActors.map((instance) => {
          const originalActor = actors.find((actor) => actor._id === instance.actorId);
          if (originalActor) {
            // Actualizar propiedades como el color, nombre, etc.
            return {
              ...instance,
              actor: { ...instance.actor, ...originalActor },  // Actualizar instancia con los datos originales
            };
          }
          return instance;
        })
      );
    };
  
    // Cada vez que cambian los actores, actualizamos las instancias
    updateActorInstances();
  }, [actors]);  // Ejecuta el efecto cada vez que los actores cambian
  
  const handleOpenDeleteModal = (actorId) => {
    onOpen();
    setActorToDelete(actorId); // Guardar la instancia seleccionada para eliminar
    setIsDeleteModalOpen(true);
  };

// Confirmar la eliminación de una instancia
const handleConfirmDelete = () => {
  // Eliminar la instancia de droppedActors
  setDroppedActors((prev) => prev.filter((instance) => instance.id !== actorToDelete));
  setIsDeleteModalOpen(false); // Cerrar el modal
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
        {actorsForCurrentImage.map((instance) => (
          <Box key={instance.id} left={`${instance.position.x}%`} top={`${instance.position.y}%`} position="absolute">
            {/* Renderización del actor */}
            <Icon>{instance.actor.icon}</Icon>
          </Box>
        ))}
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
        {droppedActors.map((instance) => (
          <Box
            key={instance.id}
            position='absolute'
            cursor='move'
            left={`${instance.position.x}%`}
            top={`${instance.position.y}%`}
            draggable
            onDragStart={(e) => handleDragStart(e, instance.id)}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            borderRadius='lg'
            padding='12px'
            backgroundColor='transparent'
            onMouseEnter={(e) => e.currentTarget.querySelector('.delete-btn').style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.querySelector('.delete-btn').style.opacity = 0}
          >
            {instance.actor && (
              <>
                <Icon
                  width='50px'
                  height='50px'
                  fontSize='60px'
                  bg={instance.actor.color}
                  borderRadius='100%'
                >
                  <IconPickerItem value={instance.actor.icon} size={24} />
                </Icon>
                <Box
                  bg='black'
                  color='white'
                  borderRadius='4px'
                  fontSize='14px'
                  fontWeight='600'
                  width='max-content'
                >
                  {instance.actor.name}
                </Box>
                {/* Botón "X" para eliminar la instancia */}
                <Box
                  className="delete-btn"
                  position="absolute"
                  top="0px"
                  right="0px"
                  width="20px"
                  height="20px"
                  bg="red"
                  borderRadius="50%"
                  color="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="14px"
                  cursor="pointer"
                  opacity={0}  // Invisible al inicio
                  transition="opacity 0.2s ease"
                  onClick={() => handleOpenDeleteModal(instance.id)}
                >
                  X
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
      {/* Modal de confirmación */}
      {isDeleteModalOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('deleteConfirmationTitle')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {t('deleteConfirmationMessage')}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleConfirmDelete} 
            >
              {t('deleteButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
      )}
    </HStack>
  );
}

export default ImageUploadSection;
