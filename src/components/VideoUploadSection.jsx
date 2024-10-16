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
import { FaRegUserCircle } from "react-icons/fa";


import { createStandaloneToast } from '@chakra-ui/react';
import { act } from 'react';

const { ToastContainer, toast } = createStandaloneToast();

const MotionBox = motion(Box);

function VideoUploadSection({ mediaType, mediaRef, waveRef, timelineRef, setDuration, sessionId, isCreatingRelation, setIsCreatingRelation }) {
  const { t } = useTranslation();
  const { actors, fetchActors } = useActorStore();
  const { actorsInstances, addActor, updateActorPosition, updateActorAttributes, removeActor } = useActorDragStore();
  const { relations, setTemporaryRelation, loadRelations, addRelation } = useRelationStore();
  
  console.log(relations);

  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const [wavesurfer, setWavesurfer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);  // Estado para el tiempo actual del video
  const [actorToDelete, setActorToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialShown, setTutorialShown] = useState(false);

  // Estados al crear una relación entre actores
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para el popup
  const [existingRelations, setExistingRelations] = useState([]); // Relaciones existentes

  const regionsPlugin = useMemo(() => RegionsPlugin.create({ dragSelection: false }), []);

  // Estados para los actores a relacionar
  const [selectedActor, setSelectedActor] = useState(null); // El actor source
  const [relationTimeStart, setRelationTimeStart] = useState(null);

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

  // Cargar las relaciones cuando el componente se monta
  useEffect(() => {
    if (sessionId) {
      loadRelations(sessionId);
    }
  }, [sessionId, loadRelations]);

  // Detectar cambio en el modo de relación
  useEffect(() => {
    if (!isCreatingRelation) {
      // Si el modo de relación se desactiva, limpiar el actor seleccionado
      setSelectedActor(null);
    }
  }, [isCreatingRelation]);

  // Este método se ejecuta al conectar dos actores
  const handleActorConnection = (sourceId, targetId) => {
    // Si se conectan dos actores, abrir el modal
    setIsPopupOpen(true);
  };

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

  // Click en los actores para seleccionar y crear relaciones
  const handleActorClick = (actorId) => {
    console.log('Actor ref ID: ', actorId);

    if (isCreatingRelation) {
      // Buscar el actor seleccionado en la lista de actores
      const selectedActorInstance = actorsInstances[actorId];  // Actor fuente o destino

      if (!selectedActorInstance) {
        console.error(`Actor con ID ${actorId} no encontrado`);
        return;
      }

      const actorTime = selectedActorInstance.currentTime;  // Obtener el currentTime del actor

      // Verificar si el actor seleccionado es el mismo que ya está seleccionado
      if (selectedActor === actorId) {
        // Si es el mismo actor, des-seleccionarlo
        setSelectedActor(null);
        return; 
      }

      if (!selectedActor) {
        // Si no hay actor seleccionado aún, seleccionamos el primero (source) y capturamos su `currentTime`
        setSelectedActor(actorId);
        setRelationTimeStart(actorTime);  // Guardar `currentTime` del primer actor
        console.log(`Actor fuente seleccionado: ${actorId} en el tiempo ${actorTime}`);
      } else {
        // Si ya hay un actor seleccionado, comparamos los `currentTime` de ambos actores
        const firstActorTime = relationTimeStart;  // Tiempo del primer actor seleccionado
        const secondActorTime = actorTime;  // Tiempo del segundo actor seleccionado

        // Definir `timeStart` como el menor de los dos tiempos y `timeEnd` como el mayor
        const timeStart = Math.min(firstActorTime, secondActorTime);
        const timeEnd = Math.max(firstActorTime, secondActorTime);

        const newRelation = {
          source: selectedActor,  // Actor de origen (actor fuente)
          target: actorId,        // Actor de destino
          session_id: sessionId,  // Agregar el session_id a la relación
          timeStart: timeStart - 0.5,   // El menor de los tiempos es `timeStart`
          timeEnd: timeEnd + 0.5,       // El mayor de los tiempos es `timeEnd`
        };
        
        // Almacenar la relación temporalmente en Zustand
        setTemporaryRelation(newRelation);  // Esto se guarda en el estado, pero no se envía a MongoDB aún

        // Llamar a la función para abrir el pop-up y asignar la relación
        handleActorConnection(selectedActor, actorId);

        // Reiniciar el actor seleccionado
        setSelectedActor(null);
        setRelationTimeStart(null);  // Reiniciar el `timeStart`
      }
    }
  };

  // Asignar outline al actor seleccionado
  const getActorStyle = (actorId) => {
    if (selectedActor === actorId && isCreatingRelation) {
      return { outline: '5px solid #5dff5d' }; // El actor seleccionado tiene un borde verde
    }
    return {}; // Sin estilo especial si no está seleccionado
  };
  
  // Obtener los actores que están en la ventana de tiempo actual del video (±1 segundo)
  const actorsForCurrentTime = Object.values(actorsInstances).filter(
    (actor) =>
      actor.currentTime >= currentTime - 0.5 &&
      actor.currentTime <= currentTime + 0.5 &&
      actor.sessionId === sessionId
  );

  console.log('Actors current time: ', actorsForCurrentTime);
 
  // Obtener todos los actores que corresponden a la sesión
  const actorsForSession = Object.values(actorsInstances).filter(
    (actor) => actor.sessionId === sessionId
  );

  // Crear regiones para los actores apenas se carga el video o el wavesurfer
  useEffect(() => {
    if (wavesurfer && actorsForSession.length > 0) {
      // Limpiar todas las regiones existentes (opcional)
      regionsPlugin.clearRegions();

      // Crear una región para cada actor en función de su currentTime
      if (regionsPlugin){
        actorsForSession.forEach((actor) => {
          regionsPlugin.addRegion({
            start: actor.currentTime - 0.5,  // Añadir un margen antes del tiempo del actor
            end: actor.currentTime + 0.5,    // Duración de 1 segundo
            //content: actor.actor.name,
            color: actor.actor.color,  // Puedes personalizar el color según el actor
            drag: false,
            resize: false,
          });
          console.log(`Región creada para actor: ${actor.actor.name} en ${actor.currentTime}s`);
        });
      } else {
        console.error("El plugin de regiones no está disponible.");
      }
    }
  }, [wavesurfer, actorsForSession]);

  // Escuchar el evento 'timeupdate' del video para actualizar el currentTime
  useEffect(() => {
    if (mediaRef.current) {
      const videoElement = mediaRef.current;

      const updateTime = () => {
        setCurrentTime(videoElement.currentTime);  // Actualizar el estado con el tiempo actual
      };

      // Añadir el eventListener para 'timeupdate' del video
      videoElement.addEventListener('timeupdate', updateTime);

      return () => {
        // Limpiar el listener cuando el componente se desmonta
        videoElement.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [mediaRef]);

  // Escuchar el evento 'seeking' de WaveSurfer para actualizar el currentTime cuando se interactúa con la onda
  useEffect(() => {
    if (wavesurfer) {
      // Añadir el eventListener para 'seeking' en WaveSurfer
      wavesurfer.on('seeking', (currentTime) => {
        setCurrentTime(currentTime);
        console.log('Seeking', currentTime + 's')
      })

      return () => {
        // Limpiar el listener cuando el componente se desmonta
        wavesurfer.un('seeking', (currentTime) => {
          setCurrentTime(currentTime);
          console.log('Seeking', currentTime + 's')
        })
      };
    }
  }, [wavesurfer, mediaRef]);

  const checkActorsForRelation = () => {
    if (actorsForCurrentTime.length < 2) {
      // Mostrar toast si no hay suficientes actores
      setIsCreatingRelation(false); // Desactivar el modo de relación si no hay suficientes actores
      showToast(`${t('toastWarningCountActors')}`, 'warning');
      return false;
    }
    return true;
  };
  // Lógica para cargar los actores según el currentTime del video
  useEffect(() => {
    const fetchActorsForCurrentTime = async () => {
      try {
        // Llamar a la base de datos para obtener los actores que coincidan con `currentTime` y `sessionId`
        const fetchedActors = await getActorInstancesFromDB(sessionId, currentTime);

        // Actualizar los actores en Zustand
        updateActorsInZustand(fetchedActors);
      } catch (error) {
        console.error('Error al obtener actores de la base de datos:', error);
      }
    };

    // Ejecutamos la función si el currentTime es válido
    if (currentTime !== null) {
      fetchActorsForCurrentTime();
    }
  }, [currentTime, sessionId]);

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

  // Crear y destruir la instancia de WaveSurfer
  useEffect(() => {
    if (mediaType === 'video' && mediaRef.current && selectedFile && waveRef.current && timelineRef.current) {
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
          plugins: [
            regionsPlugin,  // Usar el plugin de regiones memoizado
            Timeline.create({
              container: timelineRef.current,  // Contenedor para el timeline
            }),
          ],
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
  }, [mediaType, selectedFile, waveRef, timelineRef, mediaRef, wavesurfer, regionsPlugin]);

  // Cargar actores al montar el componente
  useEffect(() => {
    fetchActors(sessionId); // Llama a la función de Zustand para obtener actores de MongoDB
  }, [fetchActors]);

  // Activar el modo de creación de relaciones y mostrar tutorial solo si es la primera vez
  useEffect(() => {
    if (isCreatingRelation) {
      const hasEnoughActors = checkActorsForRelation();

      if (!tutorialShown && hasEnoughActors) {
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

    if (!actorId || !mediaRef.current || !wavesurfer) return;

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

    // Obtener el tiempo actual del video
    const currentTime = mediaRef.current.currentTime;

    console.log(currentTime);
    
    const newActorInstance = {
      actorId,
      actor: originalActor,
      position: { x: percentX, y: percentY },  // Guardar la posición en porcentaje
      currentTime: currentTime,
      sessionId,
    };

    // Añadir la nueva instancia al store de Zustand y la base de datos
    await addActor(newActorInstance);

    // Crear una región de 1 segundo en el tiempo actual utilizando el plugin de regiones
    if (regionsPlugin) {
      regionsPlugin.addRegion({
        start: currentTime - 0.5,  // Tiempo actual del video
        end: currentTime + 0.5,    // Duración de 1 segundo
        //content: `${originalActor.name}`,
        color: `${originalActor.color}`,
        drag: false,
        resize: false,
      });
    } else {
      console.error("El plugin de regiones no está disponible.");
    }    
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
  
    const containerRect = mediaRef.current.getBoundingClientRect();
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

  // Modal para eliminar una instancia
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
  
  // Componente para renderizar las flechas
  const RelationsArrows = ({ relations, currentTime }) => {
    return (
      <>
        {relations.map((relation) => {
          // Mostrar la flecha si el currentTime está dentro del rango de tiempo de la relación
          if (relation.timeStart <= currentTime && currentTime <= relation.timeEnd) {
            return (
              <Xarrow
                key={relation._id}
                start={`actor-${relation.source}`} // ID de inicio debe coincidir con el actor
                end={`actor-${relation.target}`}   // ID de destino debe coincidir con el actor
                color="#5dff5d"
                strokeWidth={3}
                path="smooth"
                headSize={6}
                labels={{
                  middle: (
                    <div
                      style={{
                        background: "black",
                        color: "white",
                        fontSize: "0.8em",
                        fontStyle: "normal",
                      }}
                    >
                      {relation.type_label}
                    </div>
                  ),
                }}
              />
            );
          }
          return null;
        })}
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
        <Xwrapper>
          {actorsForCurrentTime.map((instance) => {
            // Verificar si el actor ya tiene relaciones existentes
            const isRelated = relations.some(
              (relation) => relation.source === instance._id || relation.target === instance._id
            );

            return (
              <MotionBox
                key={instance._id}
                id={`actor-${instance._id}`}
                position="absolute"
                className="Motionbox"
                cursor={isCreatingRelation ? "default" : isRelated ? "default" : "move"}  // Bloquear cursor si está relacionado o creando relación
                left={`${instance.position.x}%`}
                top={`${instance.position.y}%`}
                draggable={!isCreatingRelation && !isRelated}  // Permitir arrastrar si no está creando relación y no está relacionado
                onDragStart={!isCreatingRelation && !isRelated ? (e) => handleDragStart(e, instance._id) : undefined}
                onDragEnd={!isCreatingRelation && !isRelated ? (e) => handleDragEnd(e, instance._id) : undefined}
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
                whileHover={!isCreatingRelation && !isRelated ? { scale: 1.1 } : { cursor: "default" }}
                dragElastic={0.2}
                onMouseEnter={(e) => {
                  if (!isCreatingRelation && !isRelated) {
                    e.currentTarget.querySelector(".delete-btn").style.opacity = 1;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isCreatingRelation && !isRelated) {
                    e.currentTarget.querySelector(".delete-btn").style.opacity = 0;
                  }
                }}
              >
                {instance.actor && (
                  <>
                    <Icon
                      className="Instance"
                      width="50px"
                      height="50px"
                      fontSize="60px"
                      bg={instance.actor.color}
                      borderRadius="100%"
                      onClick={() => handleActorClick(instance._id)}  // Permitir seleccionar para nuevas relaciones
                      style={getActorStyle(instance._id)}  // Añadir borde verde si está seleccionado
                    >
                      <IconPickerItem value={instance.actor.icon} size={24} />
                    </Icon>
                    <Box
                      bg="black"
                      color="white"
                      borderRadius="4px"
                      fontSize="14px"
                      fontWeight="600"
                      width="max-content"
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
                      opacity={0}
                      transition="opacity 0.2s ease"
                      onClick={() => handleOpenDeleteModal(instance._id)}
                      style={{ display: isCreatingRelation || isRelated ? "none" : "flex" }}  // Mostrar la "X" solo si no está relacionado
                    >
                      X
                    </Box>
                  </>
                )}

                {/* Renderizar las flechas fuera del bucle de actores */}
                <RelationsArrows relations={relations} currentTime={currentTime} />
              </MotionBox>
            );
          })}
        </Xwrapper>
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
        currentTime={currentTime}
      />
    </HStack>
  );
}

export default VideoUploadSection;
