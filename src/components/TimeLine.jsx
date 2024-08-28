import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Timeline = ({ duration, currentTime, onSeek }) => {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(currentTime);

  useEffect(() => {
    if (!isDragging) {
      setDragTime(currentTime);
    }
  }, [currentTime, isDragging]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const seekTime = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * duration, 0), duration);
      setDragTime(seekTime);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onSeek(dragTime);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragTime, duration, onSeek]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = timelineRef.current.getBoundingClientRect();
    const seekTime = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * duration, 0), duration);
    setDragTime(seekTime);
    onSeek(seekTime);
  };

  return (
    <Flex direction="column" width="100%" gap="15px">
      {/* Aguja de reproducción */}
      <Box
        position="relative"
        height="51px"
        width="100%"
        bg="#173378"
        borderRadius="12px"
        cursor="pointer"
        ref={timelineRef}
        onMouseDown={handleMouseDown}
      >
        <Box
          position="absolute"
          left={`${(dragTime / duration) * 100}%`}
          top="0"
          bottom="0"
          width="5px"
          height='250px'
          bg="white"
          transition="left 0.1s ease-out"
        >
          {/* Cabeza de la aguja */}
          <Box
            position="absolute"
            top="-10px"
            left="-5px"
            width="15px"
            height="15px"
            bg="white"
            borderRadius="50%"
          />
        </Box>
      </Box>

      {/* Sección de frames */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar tus frames */}
      </Flex>

      {/* Secciones extra para keyframes */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar tus keyframes */}
      </Flex>
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar tus keyframes */}
      </Flex>
    </Flex>
  );
};
/*
    Continuar con la funcionalidad del timeline, separar por frame y añadir marcas de tiempo 
*/
export default Timeline;