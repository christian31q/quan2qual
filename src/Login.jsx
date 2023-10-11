/*import React from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Image,
  Flex,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importa los iconos de React
import { MdLockOutline } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import loginImage from './assets/Trama.png';

function Login() {
  return (
    <ChakraProvider>
      <Flex
        bg="#041D39"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Image
          src={loginImage}
          alt="Imagen de inicio de sesión"
          maxH={{ base: 'auto', md: '100vh' }}
          flex={{ base: 'none', md: 2 }}
          marginRight={{ base: '0', md: '6.75rem' }}
        />

        <Box
          bg="#D05543"
          p="1.25em"
          borderRadius="md"
          boxShadow="lg"
          w={{ base: '100%', md: '26.25rem' }}
          h="32.9375rem"
          textAlign="center"
          marginRight={{ base: 0, md: '6.75rem' }}
        >
          <Flex
            alignItems="center"
            flexDirection="column"
            h="100%"
          >
            <Text
              fontSize="3xl"
              fontWeight="700"
              mb={6}
              fontFamily="Optima LT Pro"
              color="#041D39"
            >
              Bienvenido
            </Text>
            <Stack spacing={6}>
              <FormControl id="email" maxW="20rem" textAlign="center">
                <FormLabel></FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BiUser fontSize="1.5rem" color="#041D39" />} // Utiliza el icono de React
                  />
                  <Input 
                    type="email"
                    placeholder="Escriba su usuario" 
                    _placeholder={{ color: "#041D39" }}
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
                    children={<MdLockOutline fontSize="1.5rem" color="#041D39" />} // Utiliza el icono de React
                  />
                  <Input
                    type="password"
                    placeholder="Escriba su contraseña"
                    _placeholder={{ color: "#041D39" }}
                    textAlign="center"
                    fontSize="1rem"
                    bg="white"
                    shadow="lg"
                  />
                </InputGroup>
              </FormControl>

              <Flex justify="flex-end">
                <Text color="#041D39" fontSize="md">
                  ¿Olvidó su contraseña?
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
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
export default Login;
*/
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from './Components/LoginPage';

function Login() {
  return (
    <ChakraProvider>
      <LoginPage/>
    </ChakraProvider>
  );
}

export default Login;

