import React from 'react';
import { Box, Text, Center, Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function PasswordRecoveryContainer() {
  return (
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
          ml="2.4rem"
      >
        Usuario*
      </Text>
      <Center>
        <Input
          w="20rem"
          h="3rem"
          bg="white"
          textAlign="center"
          placeholder="Escriba su usuario"
          _placeholder={{ color: '#041D39' }}
          mb="8"
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
            <Link to="/resetPassword">Olvide mi contraseña</Link>
        </Button>
      </Center>
    </Box>
  );
}

export default PasswordRecoveryContainer;
