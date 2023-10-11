import React from 'react';
import { Flex, Box, Text, Input, Button, Center, FormLabel } from '@chakra-ui/react';
import bgImage from '../assets/Trama.png';

function PasswordRecovery() {
  const backgroundImageStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center center', // Centrar la imagen tanto horizontal como verticalmente
    backgroundImage: `url(${bgImage})`, 
  };

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      style={backgroundImageStyle} // Aplicar el estilo a la imagen de fondo
    >
      <Box p="6" bg="#D05543" borderRadius="md" boxShadow="lg" w="26.25rem" h="16.4375rem" textAlign="center">
        <Text 
            fontSize="1.875rem" 
            fontWeight="bold" 
            mb="4" 
            fontFamily="Optima LT Pro" 
            color="#041D39"
        >
          ¿Olvidó su contraseña?
        </Text>
        <Text 
            fontSize="lg" 
            fontWeight="400" 
            mb="2" 
            textAlign="left"
            ml="2.3rem"
        >
          Usuario*
        </Text>
        <Center>
          <Input
            type="email"
            w="20rem"
            h="3rem"
            bg="white"
            placeholder="Escriba su usuario"
            mb="8"
            textAlign="center"
            fontSize="1.25rem"
            shadow="lg"
          />
        </Center>
        <Center>
          <Button 
            color="white"
            w="20rem"
            h="2.375rem"
            bg="#041D39"
            fontSize="1.25rem"
            fontWeight="400"
            _hover={{ backgroundColor: 'gray.600' }}
          >
            Olvide mi contraseña
          </Button>
        </Center>
      </Box>
    </Flex>
  );
}

export default PasswordRecovery;
