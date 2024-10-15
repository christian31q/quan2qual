import React, { useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const VideoTimeline = ({ waveRef }) => {
  return (
    <Flex direction="column" width="100%" gap="15px">
      {/* El contenedor donde se renderizará la onda de WaveSurfer */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        <Box ref={waveRef} width="100%" height="100%" />  {/* Aquí irá la onda */}
      </Flex>
      {/* Secciones adicionales */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Frames adicionales */}
      </Flex>
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Keyframes */}
      </Flex>
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Keyframes adicionales */}
      </Flex>
    </Flex>
  );
};

export default VideoTimeline;
