import React, { useState, useRef } from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';

const ImageTimeline = ({ images, setSelectedImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const timelineRef = useRef(null);

  const handleSeek = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(images[index]); // Actualiza la imagen seleccionada en el contenedor de subida
  };

  return (
    <Flex direction="column" width="100%" gap="15px">
        {/* Secciones extra para linea de tiempo */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar linea de tiempo */}
      </Flex>
      {/* Timeline de imágenes */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px" ref={timelineRef}>
        {images.map((image, index) => (
          <Box
            key={index}
            minWidth="51px"
            height="51px"
            mx="5px"
            cursor="pointer"
            border={index === currentImageIndex ? '3px solid #fdc600' : '2px solid transparent'}
            borderRadius="8px"
            onClick={() => handleSeek(index)}
            transition="border 0.2s ease-in-out"
          >
            <Image
              src={image}
              width="100%"
              height="100%"
              objectFit="cover"
              borderRadius="8px"
              alt={`Thumbnail ${index + 1}`}
            />
          </Box>
        ))}
      </Flex>
      {/* Secciones extra para cantidad de actores */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar cantidad de actores */}
      </Flex>
      {/* Secciones extra para relaciones */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar relaciones */}
      </Flex>
    </Flex>
  );
};

export default ImageTimeline;

