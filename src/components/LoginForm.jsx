import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiShow, BiHide } from 'react-icons/bi';
import { MdLockOutline } from 'react-icons/md';
import LoadingPage from '../pages/LoadingPage';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    if (email && password) {
      setIsLoading(true);

      //Simulación carga de datos 
      setTimeout(() =>{
        setIsLoading(false);
        navigateTo('/dashboardNewLoadProject')
        // Realizar aquí la lógica de autenticación
        // Por ahora, simplemente marca como autenticado
        setIsAuthenticated(true);
      }, 4000);
    }
  };

  return (
    <div>
      {isLoading ? (<LoadingPage/>) : (
    <Flex alignItems="center" flexDirection="column" h="100%">
      <Text fontSize="3xl" fontWeight="700" mb={6} fontFamily="Optima LT Pro" color="#041D39">
        Bienvenido
      </Text>
      <form>
      <Stack spacing={6}>
        <FormControl id="email" maxW="20rem" textAlign="center" >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Escriba su contraseña"
              _placeholder={{ color: '#041D39' }}
              textAlign="center"
              fontSize="1rem"
              bg="white"
              shadow="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleShowClick}
                bg="transparent"
                _hover={{ bg: "transparent" }}
              >
                {showPassword ? (
                  <BiShow fontSize="1.5rem" color="#041D39" />
                ) : (
                  <BiHide fontSize="1.5rem" color="#041D39" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Flex justify="flex-end">
          <Text _hover={{ textDecoration: 'underline' }} cursor="pointer">
            <Link to="/passwordRecovery">¿Olvidó su contraseña?</Link>
          </Text>
        </Flex>

        <Button
          type='submit'
          color="white"
          w="20rem"
          h="2.375rem"
          bg="#041D39"
          _hover={{ backgroundColor: 'gray.600' }}
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
        {isAuthenticated ? (
          <Text color="green.500" fontWeight="bold" mb={6}>
            ¡Credenciales correctas! Acceso concedido.
          </Text>
        ) : null}
      </Stack>
      </form>
    </Flex>
    )}
    </div>
  );
}

export default LoginForm;
