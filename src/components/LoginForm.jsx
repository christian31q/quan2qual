import React from 'react';
import { Flex, Text, Stack, Button, List, ListItem } from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';
import { MdLockOutline } from 'react-icons/md';
import { FormControl, FormLabel, Input, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <Flex alignItems="center" flexDirection="column" h="100%">
      <Text fontSize="3xl" fontWeight="700" mb={6} fontFamily="Optima LT Pro" color="#041D39">
        Bienvenido
      </Text>
      <Stack spacing={6}>
        <FormControl id="email" maxW="20rem" textAlign="center">
          <FormLabel></FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiUser fontSize="1.5rem" color="#041D39" />}
            />
            <Input
              type="email"
              placeholder="Escriba su usuario"
              _placeholder={{ color: '#041D39' }}
              textAlign="center"
              fontSize="1rem"
              bg="white"
              shadow="lg"
            />
          </InputGroup>
        </FormControl>

        <FormControl id="password" maxW="20rem" textAlign="center">
          <FormLabel></FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdLockOutline fontSize="1.5rem" color="#041D39" />}
            />
            <Input
              type="password"
              placeholder="Escriba su contraseña"
              _placeholder={{ color: '#041D39' }}
              textAlign="center"
              fontSize="1rem"
              bg="white"
              shadow="lg"
            />
          </InputGroup>
        </FormControl>

        <Flex justify="flex-end">
          <Text>
            <Link to="/passwordRecovery">¿Olvidó su contraseña?</Link>
          </Text>
        </Flex>

        <Button
          color="white"
          w="20rem"
          h="2.375rem"
          bg="#041D39"
          _hover={{ backgroundColor: 'gray.600' }}
        >
          Iniciar Sesión
        </Button>
      </Stack>
    </Flex>
  );
}

export default LoginForm;
