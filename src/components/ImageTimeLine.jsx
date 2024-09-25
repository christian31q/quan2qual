import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';

const ImageTimeline = ({ images, setSelectedImage, currentImageIndex, actorsPerImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef(null);
  const indicatorRef = useRef(null);
  const timelineContainerRef = useRef(null);

  useEffect(() => {
    console.log(`Índice de la imagen activa en ImageTimeline: ${currentImageIndex}`);
  }, [currentImageIndex]);

  // Contar los actores por imagen
  const getActorCountForImage = (index) => {
    // Verificamos si existe la propiedad para el index, si no, devolvemos 0
    return (actorsPerImage && actorsPerImage[index]) ? actorsPerImage[index].length : 0;
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateDragIndex(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateDragIndex(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateDragIndex = (e) => {
    if (!timelineContainerRef.current || !timelineRef.current) return;

    const timelineRect = timelineContainerRef.current.getBoundingClientRect();

    // Seleccionamos el primer elemento de imagen con la clase '.img-timeline'
    const imageElement = timelineRef.current.querySelector('.img-timeline');
    
    // Verificamos si existe la imagen antes de calcular el ancho
    const imageWidth = imageElement?.offsetWidth || 0;
    const imageMargin = 20; // 5px a la izquierda y 5px a la derecha
    const imageWidthWithMargin = imageWidth + imageMargin;

    // Padding a considerar (5px a la izquierda y 5px a la derecha)
    const containerPadding = 10; // Total de 5px * 2

    // Ancho total ocupado por las imágenes
    const totalImageWidth = imageWidthWithMargin * images.length;

    // Posición del mouse relativa al contenedor de la aguja (restamos el padding izquierdo)
    const mouseX = e.clientX - timelineRect.left - 5; // Restamos el padding izquierdo (5px)

    // Limitar el rango de movimiento del mouse al ancho ocupado por las imágenes, incluyendo el padding
    const limitedMouseX = Math.max(0, Math.min(mouseX, totalImageWidth - containerPadding));

    // Calculamos el porcentaje del mouse dentro del área ocupada por las imágenes
    const percentage = limitedMouseX / (totalImageWidth - containerPadding);

    // El índice debe estar basado en la posición exacta dentro de las imágenes
    const index = Math.floor(percentage * images.length);

    // Evitamos que la aguja se salga del rango
    if (index >= 0 && index < images.length) {
      //setCurrentImageIndex(index);
      setSelectedImage(index);

      // Alineamos la aguja al centro de la imagen activa de manera precisa
      if (indicatorRef.current) {
        // Calculamos la posición centrada de la aguja
        const leftPosition = limitedMouseX + 5; // Añadimos el padding izquierdo de 5px para ajustar la posición
        indicatorRef.current.style.left = `${leftPosition}px`;
      }
    }
  };

  useEffect(() => {
    const container = timelineContainerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Flex direction="column" width="100%" gap="15px" overflowX="auto">
      {/* Sección adicional para línea de tiempo con la aguja de seguimiento */}
      <Flex
        alignItems="center"
        position="relative"
        height="51px"
        bg="#173378"
        borderRadius="12px"
        ref={timelineContainerRef}
        onMouseDown={handleMouseDown}
        cursor={isDragging ? 'grabbing' : 'grab'}
        width='100%'
        padding="5px" 
      >
        {/* Aguja de reproducción */}
        <Box
          ref={indicatorRef}
          position="absolute"
          top="0"
          bottom="0"
          width="5px"
          height="65px"
          bg="#fdc600"
          transition="left 0.1s ease-out"
          zIndex="2"
        >
          <Box
            position="absolute"
            top="-10px"
            left="-5px"
            width="15px"
            height="15px"
            bg="#fdc600"
            borderRadius="50%"
          />
        </Box>
      </Flex>

      {/* Timeline de imágenes */}
      <Flex
        alignItems="center"
        height="51px"
        bg="#173378"
        borderRadius="12px"
        ref={timelineRef}
        paddingX="5px"
        whiteSpace="nowrap"
        className="scrollable-container"
        width='100%'
      >
        {images.length === 0 ? (
          <Box width="100%" textAlign="center" color="#ccc">No images available</Box>
        ) : (
          images.map((image, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent='center'
              width="80px"
              height="45px"
              mx="5px"
              cursor="pointer"
              border={index === currentImageIndex ? '3px solid #fdc600' : '2px solid transparent'}
              borderRadius="8px"
              onClick={() => handleImageClick(index)}
              transition="border 0.2s ease-in-out"
              flexShrink="0"
            >
              <Image
                src={image}
                width="72px"
                height="100%"
                objectFit="cover"
                borderRadius="8px"
                alt={`Thumbnail ${index + 1}`}
                className='img-timeline'
              />
                {/* Mostrar el contador de actores */}
                {getActorCountForImage(index) > 0 && (
                  <Box
                    position="absolute"
                    top="5px"
                    right="5px"
                    bg="red"
                    color="white"
                    borderRadius="50%"
                    width="20px"
                    height="20px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="12px"
                  >
                    {getActorCountForImage(index)}
                  </Box>
                )}
            </Box>
          ))
        )}
      </Flex>
      {/* Secciones extra para contador de actores */}
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar contador de actores */}
      </Flex>
      <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar tus keyframes */}
      </Flex>
    </Flex>
  );
};

export default ImageTimeline;

