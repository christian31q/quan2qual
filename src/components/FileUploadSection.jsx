import React from 'react';
import { Box, Input, HStack, Text } from "@chakra-ui/react";
import '../styles/HandleStyles.css'

function FileUploadSection() {
  const handleFileChange = (e) => {
    // Aquí puedes manejar la selección del archivo y realizar cualquier lógica necesaria
  };

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
        alignItems='center'
      >
        <Text
          fontSize='1.2vw'
          color='white'
          fontWeight='400'
          w='12vw'
          h='10vh'
        >
          Importe un archivo de video para empezar
        </Text>
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
        <label className="file-upload-label">
          <span>Seleccionar archivo de video</span>
          <Input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="file-upload-input"
          />
        </label>
      </Box>
    </HStack>
  );
}

export default FileUploadSection;
