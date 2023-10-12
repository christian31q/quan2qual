import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Center, Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, InputLeftElement, InputGroup } from '@chakra-ui/react';

function PasswordRecoveryContainer() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordRecovery = (e) => {
    e.preventDefault(); // Evita la presentación del formulario por defecto

    if (email.trim() !== '') {
      navigateTo('/resetPassword');
    } else {
      // Muestra un mensaje de error o realiza alguna acción en caso de correo no válido.
      //console.log('Correo no válido');
    }
  };

  return (
    <Center>
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
        <Center>
        <form onSubmit={handlePasswordRecovery}>
          <FormControl id="passwordRecovery" color="#041D39" isRequired>
            <FormLabel ml="0.5rem">Usuario*</FormLabel>
            <InputGroup>
              <Input
                type="email"
                w="20rem"
                h="3rem"
                bg="white"
                textAlign="center"
                placeholder="Escriba su usuario"
                _placeholder={{ color: '#041D39' }}
                mb="1.88rem"
                fontSize="1.25rem"
                shadow="lg"
                isRequired
                value={email}
                onChange={handleEmailChange}
              />
            </InputGroup>
            <Button
              type="submit"
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
          </FormControl>
        </form>
        </Center>
      </Box>
    </Center>
  );
}

export default PasswordRecoveryContainer;
