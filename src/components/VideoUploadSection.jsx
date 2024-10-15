import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Button, Input, HStack, Icon, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import { v4 as uuidv4 } from 'uuid';
import useActorStore from '../store/actorStore';
import useActorDragStore from '../store/actorDragStore';
import useRelationStore from '../store/relationStore';
import { getActorInstancesFromDB } from '../utils/mongoUtils';
import { motion } from 'framer-motion';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import RelationPopup from './relations/RelationPopup';
import { useWavesurfer } from '@wavesurfer/react';
import WaveSurfer from 'wavesurfer.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';

import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

function VideoUploadSection({ mediaType, mediaRef, waveRef, setCurrentTime, setDuration, sessionId, isCreatingRelation, setIsCreatingRelation }) {
  const { t } = useTranslation();
  const { actors, fetchActors } = useActorStore();
  const { actorsInstances, addActor, updateActorPosition, updateActorAttributes, removeActor } = useActorDragStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [droppedActors, setDroppedActors] = useState([]); 

  //const mediaRef = useRef(null); // Referencia del video
  //const waveRef = useRef(null);
  const [wavesurfer, setWavesurfer] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialShown, setTutorialShown] = useState(false);
  //const [actors, setActors] = useState([]);
  const [dragOffset, setDragOffset] = useState({ x: 10, y: 10 });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (videoUrl) {
        // Liberar la URL previa para evitar fugas de memoria
        URL.revokeObjectURL(videoUrl);
      }
      // Crear una nueva URL solo cuando se selecciona un nuevo archivo
      const newUrl = URL.createObjectURL(file);
      setVideoUrl(newUrl);  // Guardar la nueva URL
      setSelectedFile(file); // Guardar el archivo seleccionado
    }
  };

  // Crear y destruir la instancia de WaveSurfer
  useEffect(() => {
    if (mediaType === 'video' && mediaRef.current && selectedFile && waveRef.current) {
      if (!wavesurfer) {
        // Crear WaveSurfer una vez
        const waveInstance = WaveSurfer.create({
          container: waveRef.current,
          waveColor: 'rgb(253 198 0)',
          progressColor: 'white',
          height: 50,
          barWidth: 2,
          barHeight: 3,
          barGap: 1,
          responsive: true,
          backend: 'MediaElement',  // Necesario para sincronizar con video
          media: mediaRef.current,  // Vincular el video a la onda
        });

        waveInstance.on('ready', () => {
          setDuration(waveInstance.getDuration());
        });

        waveInstance.on('audioprocess', () => {
          setCurrentTime(waveInstance.getCurrentTime());
        });

        setWavesurfer(waveInstance);  // Guardar la instancia
      }

      return () => {
        // Destruir la instancia de WaveSurfer cuando el componente se desmonta o cambia el archivo de video
        if (wavesurfer) {
          wavesurfer.destroy();
          setWavesurfer(null);
        }
      };
    }
  }, [mediaType, selectedFile, waveRef, mediaRef, wavesurfer]);

  // Cargar actores al montar el componente
  useEffect(() => {
    fetchActors(sessionId); // Llama a la función de Zustand para obtener actores de MongoDB
  }, [fetchActors]);

  // Activar el modo de creación de relaciones y mostrar tutorial solo si es la primera vez
  useEffect(() => {
    if (isCreatingRelation) {
      //const hasEnoughActors = checkActorsForRelation();

      if (!tutorialShown) {
        setIsTutorialOpen(true);
      }
    }
  }, [isCreatingRelation, tutorialShown]);

  // Cerrar el modal del tutorial y desactivar el trigger
  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    setTutorialShown(true);
  };
  // Maneja el arrastre y caída de actores
  const handleDrop = async (e) => {
    e.preventDefault();
    
    const actorId = e.dataTransfer.getData('actorId');
    const offsetX = parseFloat(e.dataTransfer.getData('offsetX'));
    const offsetY = parseFloat(e.dataTransfer.getData('offsetY'));
  
    if (!actorId) return;
  
    const containerRect = mediaRef.current.getBoundingClientRect();
    const dropX = e.clientX - containerRect.left - offsetX;
    const dropY = e.clientY - containerRect.top - offsetY;
  
    const posX = Math.max(0, Math.min(dropX, containerRect.width));
    const posY = Math.max(0, Math.min(dropY, containerRect.height));
  
    console.log('Posición ajustada (posX, posY):', { posX, posY });
  
    // Convertir a porcentaje relativo al contenedor
    const percentX = (posX / containerRect.width) * 100;
    const percentY = (posY / containerRect.height) * 100;
    
    const originalActor = actors.find((a) => a._id === actorId);
    if (!originalActor) return;
  
    const newActorInstance = {
      actorId,
      actor: originalActor,
      position: { x: percentX, y: percentY },  // Guardar la posición en porcentaje
      imageIndex: 1,
      sessionId,
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'3xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('tutorialModalTitle')}</ModalHeader>
                <ModalBody>
                  <Box marginBottom='16px'>
                    <Text>{t('tutorialModalText1')}</Text>
                    <Text>{t('tutorialModalText2')}</Text>
                    <Text>
                      {t('tutorialModalText3')}
                    </Text>
                    <Text>{t('tutorialModalText4')}</Text>
                  </Box>
                    <video width="100%" height="auto" autoPlay loop>
                      <source src='../../src/assets/Quan2Qual_Tuto.mp4' type='video/mp4'/>
                    </video>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>{t('tutorialModalButton')}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
  };

  const renderMediaViewer = () => {
    if (mediaType === 'video') {
      return selectedFile ? (
        <>
          {/* Video cargado */}
          <video
            ref={mediaRef}  // Aquí el video se referencia para WaveSurfer
            src={videoUrl}
            width="100%"
            height="100%"
            id="video-container"
            style={{ marginBottom: '10px' }}
          />
        </>
      ) : (
        <label className='file-upload-label'>
          <span>{t('selectVideoFile')}</span>
          <Input
            type='file'
            accept='video/*'
            onChange={handleFileChange}
            className='file-upload-input'
          />
        </label>
      );
    } else {
      return <Text>{t('mediaNosSupported')}</Text>;
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
        alignItems={actors == 0 ? 'center' : 'flex-start'}
      >
        <GridBodyActors
          actors={actors}
          handleDragStart={(e, actorId) => handleDragStart(e, actorId)}
        />
      </Box>
      <Box
        ref={mediaRef}
        w='60vw'
        //h='auto'
        maxHeight='55vh'
        p={4}
        borderWidth='3px'
        borderRadius='lg'
        borderColor='#173378'
        boxSizing="border-box"
        outline={isCreatingRelation ? '5px solid #5dff5d' : 'none'}
        outlineOffset={isCreatingRelation ? '0px' : '0px'}
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
        transition="outline 0.3s ease-in-out, outline-offset 0.3s ease-in-out"
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
      {/* Modal de tutorial */}
      <TutorialModal isOpen={isTutorialOpen} onClose={handleCloseTutorial} />
      <ToastContainer/>
    </HStack>
  );
}

export default VideoUploadSection;
