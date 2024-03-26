import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, HStack, Text } from "@chakra-ui/react";
import VideoControls from './VideoControls';
import GridBodyActors from './actors/GridBodyActors';
import '../styles/HandleStyles.css';



function FileUploadSection({ videoRef }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const [actors, setActors] = useState([]);

  useEffect(() => {
    // Recuperar datos del almacenamiento local al cargar el componente
    const storedActors = JSON.parse(localStorage.getItem('actors'));
    console.log('Actores recuperados del almacenamiento local:', storedActors);

    if (storedActors) {
      setActors(storedActors);
    }
  }, []);


  return (
    <HStack spacing={4}>
      <Box 
        w='30vw'
        h='55vh'
        p={4} 
        borderWidth="3px" 
        borderRadius="lg"
        borderColor='#041D39'
        align="center"
        mt='2vh'
        ml='2vh'
        display='flex'
        justifyContent='center'
        alignItems='flex-start'
      >
        {/* Renderiza GridBodyActors fuera del Text */}
        <GridBodyActors data={actors} />
        {/*<Text
          fontSize='1.2vw'
          color='white'
          fontWeight='400'
          w='12vw'
          h='10vh'
        >
          Importe un archivo de video para empezar
  </Text>*/}
      </Box>
      <Box 
        w='60vw'
        h='55vh' 
        p={4} 
        borderWidth="3px" 
        borderRadius="lg"
        borderColor='#041D39'
        bg='#041D39'
        align="center"
        mt='2vh'
        mr='2.5vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        {selectedFile ? (
          <video ref={videoRef} width="100%" height="100%" controls={false} onLoadedData={() => videoRef.current.pause()}>
            <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        ) : (
          <label className="file-upload-label">
            <span>Seleccionar archivo de video</span>
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="file-upload-input"
            />
          </label>
        )}
      </Box>
    </HStack>
  );
}

export default FileUploadSection;