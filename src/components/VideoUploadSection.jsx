import React, { useState, useRef, useEffect } from 'react';
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

import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

function VideoUploadSection({ mediaType, mediaRef, currentTime, setCurrentTime, setDuration, sessionId, isCreatingRelation, setIsCreatingRelation }) {
  const { t } = useTranslation();
  const { actors, fetchActors } = useActorStore();
  const { actorsInstances, addActor, updateActorPosition, updateActorAttributes, removeActor } = useActorDragStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [droppedActors, setDroppedActors] = useState([]); 
  const containerRef = useRef(); 

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialShown, setTutorialShown] = useState(false);
  //const [actors, setActors] = useState([]);
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
        <video
          ref={mediaRef}
          width='100%'
          height='100%'
          controls={false}
          onLoadedData={() => mediaRef.current.pause()}
        >
          <source src={URL.createObjectURL(selectedFile)} type='video/mp4' />
            {t('mediaNosSupported')}
        </video>
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
