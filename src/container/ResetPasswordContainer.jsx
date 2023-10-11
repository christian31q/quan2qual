import React from 'react';
import { Box, Text, Center, Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ResetPasswordContainer() {
  return (
    <Box 
        p="6" 
        bg="#D05543" 
        borderRadius="md" 
        boxShadow="lg" 
        w="26.25rem"
        h="22.375rem" 
        textAlign="center">
      <Text 
          fontSize="1.875rem" 
          fontWeight="bold" 
          mb="4" 
          fontFamily="Optima LT Pro" 
          color="#041D39"
      >
        Restablecer Contraseña
      </Text>
      <Text 
          fontSize="lg" 
          fontWeight="400" 
          mb="1.19" 
          textAlign="left"
          ml="2.4rem"
      >
        Nueva contraseña*
      </Text>
      <Center>
        <Input
          type='password'
          w="20rem"
          h="3rem"
          bg="white"
          textAlign="center"
          placeholder="Escriba su nueva contraseña"
          _placeholder={{ color: '#041D39' }}
          mb="1.19rem"
          fontSize="1.25rem"
          shadow="lg"
          isRequired
        />
      </Center>
      <Text 
          fontSize="lg" 
          fontWeight="400" 
          mb="2" 
          textAlign="left"
          ml="2.4rem"
      >
        Confirmar contraseña*
      </Text>
      <Center>
        <Input
          type='password'
          w="20rem"
          h="3rem"
          bg="white"
          textAlign="center"
          placeholder="Escriba su nueva contraseña"
          _placeholder={{ color: '#041D39' }}
          mb="1.69rem"
          fontSize="1.25rem"
          shadow="lg"
          isRequired
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
            <Link to="/login">Restablecer Contraseña</Link>
        </Button>
      </Center>
    </Box>
  );
}

export default ResetPasswordContainer;
