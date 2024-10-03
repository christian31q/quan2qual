import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Input, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Icon, Text, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import { v4 as uuidv4 } from 'uuid';
import useActorStore from '../store/actorStore';
import useActorDragStore from '../store/actorDragStore';
import useRelationStore from '../store/relationStore';
import { getActorInstancesFromDB } from '../utils/mongoUtils';
import { motion } from 'framer-motion';
import Xarrow from "react-xarrows";
import RelationPopup from './relations/RelationPopup';

import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

// Función para convertir archivo a Base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file); // Convertir el archivo a Base64
  });
};

const MotionBox = motion(Box);

function ImageUploadSection({ mediaRef, setSelectedImages, currentImage,  sessionId, currentImageIndex, isCreatingRelation, setIsCreatingRelation  }) {
  const { t } = useTranslation();
  const { actors, fetchActors } = useActorStore();
  const { actorsInstances, addActor, updateActorPosition, updateActorAttributes, removeActor } = useActorDragStore();

  const { relations, setTemporaryRelation, loadRelations, addRelation } = useRelationStore();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [droppedActors, setDroppedActors] = useState([]);
  const [actorToDelete, setActorToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialShown, setTutorialShown] = useState(false);

  // Estados para los actores a relacionar
  const [selectedActor, setSelectedActor] = useState(null); // El actor source
  //const [relations, setRelations] = useState([]); // Relación (source -> target)
  const actorRefs = useRef({});

  // Estados al crear una relación entre actores
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para el popup
  const [existingRelations, setExistingRelations] = useState([]); // Relaciones existentes
  const [newRelation, setNewRelation] = useState(null); // La relación asignada

  // Cargar las relaciones cuando el componente se monta
  useEffect(() => {
    if (sessionId) {
      loadRelations(sessionId);
    }
  }, [sessionId, loadRelations]);

  // Crear la relación
  const handleCreateRelation = (source, target, type, direction, relationClass) => {
    addRelation({
      source,
      target,
      type,
      direction,
      class: relationClass,
      session_id: sessionId,
    });
  };

  // Este método se ejecuta al conectar dos actores
  const handleActorConnection = (sourceId, targetId) => {
    // Si se conectan dos actores, abrir el modal
    setIsPopupOpen(true);
    //console.log('Source Actor ID: ', sourceId);
    //console.log('Target Actor ID: ', targetId);
  };

  console.log('Relations: ', relations);

  const handleActorClick = (actorId) => {
    console.log('Actor ref ID: ', actorId);
    if(isCreatingRelation) {
      if (!selectedActor) {
        // Seleccionamos el primer actor (source)
        setSelectedActor(actorId);
      } else {
        // Si ya hay un actor seleccionado, abrimos el pop-up
        const newRelation = {
          source: selectedActor,   // Actor de origen
          target: actorId,         // Actor de destino
          session_id: sessionId,   // Agregar el session_id a la relación
        };
    
        // Almacenar la relación temporalmente en Zustand
        setTemporaryRelation(newRelation);  // Esto se guarda en el estado, pero no se envía a MongoDB aún
    
        // Llamar a la función para abrir el pop-up y asignar la relación
        handleActorConnection(selectedActor, actorId);
    
        // Reiniciar el actor seleccionado
        setSelectedActor(null);
      }
    }
  };

  const getActorStyle = (actorId) => {
    if (selectedActor === actorId) {
      return { outline: '5px solid #5dff5d' }; // El actor seleccionado tiene un borde verde
    }
    return {}; // Sin estilo especial si no está seleccionado
  };

  // Obtener los actores de la imagen activa
  const actorsForCurrentImage = Object.values(actorsInstances).filter(
    (actor) => (actor.imageIndex === currentImageIndex && actor.sessionId === sessionId)
  );

  console.log('actorsForCurrentImage: ', actorsForCurrentImage.length);
  
  const checkActorsForRelation = () => {
    if (actorsForCurrentImage.length < 2) {
      // Mostrar toast si no hay suficientes actores
      setIsCreatingRelation(false); // Desactivar el modo de relación si no hay suficientes actores
      showToast('Debe haber al menos dos actores en la zona para crear una relación.', 'error');
      return false;
    }
    return true;
  };

  // Activar el modo de creación de relaciones y mostrar tutorial solo si es la primera vez
  useEffect(() => {
    if (isCreatingRelation) {
      const hasEnoughActors = checkActorsForRelation();

      if (!tutorialShown && hasEnoughActors) {
        setIsTutorialOpen(true);
      }
    }
  }, [isCreatingRelation, actorsForCurrentImage, currentImageIndex, tutorialShown]);  

  // Cerrar el modal del tutorial y desactivar el trigger
  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    setTutorialShown(true);
  };

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

  // Lógica para cargar los actores según la imagen actual
  useEffect(() => {
    const fetchActorsForCurrentImage = async () => {
      try {
        // Llamar a la base de datos para obtener los actores que coincidan con `currentImageIndex` y `sessionId`
        const fetchedActors = await getActorInstancesFromDB(sessionId, currentImageIndex);

        // Actualizar los actores en Zustand
        updateActorsInZustand(fetchedActors);
        
      } catch (error) {
        console.error('Error al obtener actores de la base de datos:', error);
      }
    };

    // Ejecutamos la función si el índice de imagen es válido
    if (currentImageIndex !== null) {
      fetchActorsForCurrentImage();
    }
  }, [currentImageIndex, sessionId]);

  // Función para actualizar Zustand con los actores obtenidos de la base de datos
const updateActorsInZustand = (fetchedActors) => {
  const { setActorsInstances } = useActorDragStore.getState();  // Obtener la acción de Zustand

  const actorsMap = {};  // Convertir actores a un objeto
  fetchedActors.forEach(actor => {
    actorsMap[actor._id] = actor;
  });

  // Actualizar Zustand con los actores de la base de datos
  setActorsInstances(actorsMap);
};

  // Maneja el arrastre y caída de actores
  const handleDrop = async (e) => {
    e.preventDefault();
    
    const actorId = e.dataTransfer.getData('actorId');
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX'));
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY'));
  
    if (!actorId) return;
  
    const containerRect = containerRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left - offsetX;
    const dropY = e.clientY - containerRect.top - offsetY;
  
    const posX = Math.max(0, Math.min(dropX, containerRect.width));
    const posY = Math.max(0, Math.min(dropY, containerRect.height));
  
    const percentX = (posX / containerRect.width) * 100;
    const percentY = (posY / containerRect.height) * 100;
    
    const originalActor = actors.find((a) => a._id === actorId);
    if (!originalActor) return;
  
    const newActorInstance = {
      actorId,          // ID del actor original
      actor: originalActor,
      position: { x: percentX, y: percentY },
      imageIndex: currentImageIndex,
      sessionId,  // Asegúrate de pasar el sessionId
    };
  
    // Añadir la nueva instancia al store de Zustand y la base de datos
    await addActor(newActorInstance);
  };
  
  // Maneja el inicio del arrastre de actores
  const handleDragStart = (e, instanceId) => {
    console.log(instanceId);
    // Asegurarnos de que actorId exista
    if (!instanceId) {
      console.error('El actor no tiene un ID válido');
      return;
    }

    // Obtener la posición relativa del cursor dentro del actor
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;  // Posición relativa del cursor dentro del actor (X)
    const offsetY = e.clientY - rect.top;   // Posición relativa del cursor dentro del actor (Y)

    // Guardar el offset en dataTransfer
    e.dataTransfer.setData('actorId', instanceId);  // Aquí usamos el instanceId que es el _id de MongoDB
    e.dataTransfer.setData('offsetX', offsetX);  // Guardar el offset en X
    e.dataTransfer.setData('offsetY', offsetY);  // Guardar el offset en Y
  };

  // Actualizar la posición del actor cuando se mueve (handleDragEnd)
  const handleDragEnd = async (e, instanceId) => {
    console.log(instanceId);
    // Asegurarnos de que actorId exista
    if (!instanceId) {
      console.error('El actor no tiene un ID válido');
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left;
    const dropY = e.clientY - containerRect.top;

    const posX = Math.max(0, Math.min(dropX, containerRect.width));
    const posY = Math.max(0, Math.min(dropY, containerRect.height));

    const percentX = (posX / containerRect.width) * 100;
    const percentY = (posY / containerRect.height) * 100;

    // Actualizar la posición del actor en Zustand y la base de datos
    try {
      await updateActorPosition(instanceId, { x: percentX, y: percentY });  // Actualiza Zustand y la base de datos
      console.log(`Posición actualizada en DB para el actor ${instanceId}: { x: ${percentX}, y: ${percentY} }`);
    } catch (error) {
      console.error('Error al actualizar la posición en la base de datos:', error);
    }
  };

// Escuchar cambios en los actores originales y actualizar las instancias
useEffect(() => {
  Object.keys(actorsInstances).forEach((actorId) => {
    const instance = actorsInstances[actorId];
    const originalActor = actors.find((oActor) => oActor._id === instance.actor._id);

    if (originalActor) {
      // Evitar actualizar si las propiedades clave no han cambiado
      const { name: instanceName, color: instanceColor } = instance.actor;
      const { name: originalName, color: originalColor } = originalActor;

      // Solo actualiza si las propiedades clave son diferentes
      if (instanceName !== originalName || instanceColor !== originalColor) {
        updateActorAttributes(actorId, originalActor);  // Actualiza las propiedades usando Zustand
      }
    }
  });
}, [actors, actorsInstances, updateActorAttributes]);
  
  const handleOpenDeleteModal = (actorId) => {
    onOpen();
    setActorToDelete(actorId); // Guardar la instancia seleccionada para eliminar
    setIsDeleteModalOpen(true);
  };

// Confirmar la eliminación de una instancia
const handleConfirmDelete = () => {
  // Eliminar el actor de Zustand
  removeActor(actorToDelete);
  setIsDeleteModalOpen(false);
};

const showToast = (message, type) => {
  toast({
    title: `${type}`,
    description: message,
    status: `${type}`,
    duration: 3000,
    isClosable: true,
  });
};

  // Componentes extras

  const TutorialModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cómo crear una relación entre actores</ModalHeader>
                <ModalBody>
                  <Box marginBottom='16px'>
                    <Text>Para relacionar los actores:</Text>
                    <Text>1. Haz clic en el primer actor (source). Una flecha pequeña aparecerá. </Text>
                    <Text> 2. Luego, haz clic en el segundo actor (target). 
                           Una flecha se dibujará desde la fuente (source) al destino (target).
                    </Text>
                    <Text>3. Asigna el tipo de relación que corresponda</Text>
                  </Box>
                    <Image 
                      boxSize='100%'
                      objectFit='cover'
                      src='../../src/assets/Tuto_Relation.gif' 
                      alt='tuto_relation'
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>Entendido</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
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
        outline={isCreatingRelation ? '5px solid #5dff5d' : 'none'}
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
        {actorsForCurrentImage.map((instance) => (
          <MotionBox
          key={instance._id}
          id={instance._id}
          position="absolute"
          className="Motionbox"
          cursor={isCreatingRelation ? 'default' : 'move'}  // Desactivar el cursor de mover si isCreatingRelation es true
          left={`${instance.position.x}%`}
          top={`${instance.position.y}%`}
          draggable={!isCreatingRelation}  // Bloquear el drag si isCreatingRelation es true
          onDragStart={isCreatingRelation ? undefined : (e) => handleDragStart(e, instance._id)}  // Desactivar el drag start
          onDragEnd={isCreatingRelation ? undefined : (e) => handleDragEnd(e, instance._id)}  // Desactivar el drag end
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="lg"
          padding="12px"
          backgroundColor="transparent"
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          whileHover={isCreatingRelation ? {cursor: "pointer"} : { scale: 1.1 }}  // Desactivar el hover si isCreatingRelation es true
          dragElastic={0.2}
          onMouseEnter={(e) => {
            if (!isCreatingRelation) {
              e.currentTarget.querySelector('.delete-btn').style.opacity = 1;  // Mostrar el botón de eliminar si no estamos creando relación
            }
          }}
          onMouseLeave={(e) => {
            if (!isCreatingRelation) {
              e.currentTarget.querySelector('.delete-btn').style.opacity = 0;  // Ocultar el botón de eliminar si no estamos creando relación
            }
          }}
        >
            {instance.actor && (
              <>
                <Icon
                  key={instance._id}
                  id={`actor-${instance._id}`}
                  className='Instance'
                  width='50px'
                  height='50px'
                  fontSize='60px'
                  bg={instance.actor.color}
                  borderRadius='100%'
                  onClick={() => handleActorClick(instance._id)}
                  style={getActorStyle(instance._id)}
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
                  onClick={() => handleOpenDeleteModal(instance._id)}
                  style={{ display: isCreatingRelation ? 'none' : 'flex' }}
                >
                  X
                </Box>
              </>
            )}
            {relations.map((relation) => (
              <Xarrow
                key={relation._id}
                start={relation.source}
                end={relation.target}   
                color="#5dff5d"
                strokeWidth={2}
                path="smooth"
                headSize={6}
                labels={{ middle:<div style={{ background: "black", color: "white", fontSize: "0.8em", fontStyle: "normal" }}>{relation.type}</div> }}
              />
            ))}
          </MotionBox>
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
      {/* Modal de tutorial */}
      <TutorialModal isOpen={isTutorialOpen} onClose={handleCloseTutorial} />
      <ToastContainer/>
      <RelationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        existingRelations={existingRelations}  // Relación existente en el proyecto
        onCreateRelation={handleCreateRelation} // Lógica para crear la relación
      />
    </HStack>
  );
}

export default ImageUploadSection;
