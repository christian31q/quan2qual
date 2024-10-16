import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { IconPickerItem } from 'react-icons-picker';
import { FaDiamond } from "react-icons/fa6";
import { TbCirclesRelation } from "react-icons/tb";
import useActorDragStore from '../store/actorDragStore';
import useRelationStore from '../store/relationStore'; // Importamos la store de relaciones

const VideoTimeline = ({ waveRef, timelineRef, videoDuration }) => {
  const { actorsInstances } = useActorDragStore(); // Obtener actores desde Zustand
  const { relations } = useRelationStore(); // Obtener relaciones desde Zustand
  const [timelineWidth, setTimelineWidth] = useState(0); // Ancho del contenedor del timeline
  const timelineContainerRef = useRef(null);

  // Obtener el ancho del contenedor del timeline
  useEffect(() => {
    if (timelineContainerRef.current) {
      setTimelineWidth(timelineContainerRef.current.offsetWidth);
    }
  }, []);

  // Función para renderizar keyframes de los actores
  const renderActorKeyframes = () => {
    return Object.values(actorsInstances).map((actorInstance, index) => {
      const positionPercentage = (actorInstance.currentTime / videoDuration) * 100;

      return (
        <Box
          key={index}
          position="absolute"
          left={`${positionPercentage}%`} // Posicionamos el keyframe según el tiempo
          top="50%"
          transform="translateY(-50%)"
          zIndex="10"
        >
          <Icon
            bg={actorInstance.actor.color}
            borderRadius="100%"
            w={6}
            h={6}
            title={`Actor: ${actorInstance.actor.name}`}
          >
            <IconPickerItem
              value={actorInstance.actor.icon}
              size={24}
            />
          </Icon>
        </Box>
      );
    });
  };

  // Función para renderizar keyframes de las relaciones
  const renderRelationKeyframes = () => {
    return relations.map((relation, index) => {
      // Convertimos el timeStart y timeEnd en porcentajes para posicionarlos en el timeline
      const startPercentage = (relation.timeStart / videoDuration) * 100;
      const endPercentage = (relation.timeEnd / videoDuration) * 100;
      const relationWidth = endPercentage - startPercentage; // Calculamos el ancho de la barra de la relación

      return (
        <Box
          key={index}
          position="absolute"
          left={`${startPercentage}%`}
          width={`${relationWidth}%`} // Usar el ancho basado en la duración de la relación
          top="50%"
          transform="translateY(-50%)"
          height="20px" 
          bg="green.500" 
          borderRadius="6px"
          title={`Relación: ${relation.type_label}`}
        >
          <Icon
            as={TbCirclesRelation}
            w={6}
            h={6}
            color="white"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
        </Box>
      );
    });
  };

  return (
    <Flex direction="column" width="100%" gap="15px">
      {/* El contenedor donde se renderizará el timeline */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px" position="relative" ref={timelineContainerRef}>
        <Box ref={timelineRef} width="100%" height="100%" />
      </Flex>
      {/* El contenedor donde se renderizará la onda de WaveSurfer */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        <Box ref={waveRef} width="100%" height="100%" />
      </Flex>
      {/* Keyframes actores */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px" position="relative">
        {renderActorKeyframes()} {/* Renderizamos los keyframes de actores */}
      </Flex>
      {/* Keyframes relaciones */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px" position="relative">
        {renderRelationKeyframes()} {/* Renderizamos los keyframes de relaciones */}
      </Flex>
    </Flex>
  );
};

export default VideoTimeline;
