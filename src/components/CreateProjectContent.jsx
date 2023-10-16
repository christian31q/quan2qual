/*import React, { useState } from 'react';
import {
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  HStack,
  Box,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function CreateProjectContent() {
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (projectName.trim() === '') {
      // Mostrar un mensaje de error si el campo de nombre del proyecto está vacío
      setErrorMessage('Por favor, complete el nombre del proyecto.');
    } else {
      setErrorMessage(''); // Borrar cualquier mensaje de error anterior
      navigate('/dashboardNewLoadProject');
    }
  };

  return (
    <Stack spacing={4} align="center">
      <Text
        fontSize="1.875rem"
        fontWeight="bold"
        fontFamily="Optima LT Pro"
        color="#041D39"
      >
        Crear Nuevo Proyecto
      </Text>
      <Text fontSize="lg" fontWeight="400" color="#041D39">
        Nombre de proyecto:
      </Text>
      <FormControl maxW="20rem" textAlign="center">
        <FormLabel></FormLabel>
        <Input
          type="text"
          placeholder="Escriba el nombre del proyecto"
          _placeholder={{ color: '#041D39' }}
          textAlign="center"
          fontSize="1rem"
          bg="white"
          shadow="lg"
          mb="1rem"
          w="20rem"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </FormControl>
      <Text color="white" fontSize="md">
        {errorMessage}
      </Text>
      <Stack spacing={4} align="center">
        <HStack spacing='24px'>
            <Link to="/dashboardNewLoadProject">
                <Button
                    w="10rem"
                    h="2.375rem"
                    bg="#041D39"
                    color="white"
                    fontSize="1.25rem"
                    fontWeight="400"
                    _hover={{ backgroundColor: 'gray.600' }}
                >
                    Cancelar
                </Button>
            </Link>
          <Button
            w="10rem"
            h="2.375rem"
            bg="#041D39"
            color="white"
            fontSize="1.25rem"
            fontWeight="400"
            _hover={{ backgroundColor: 'gray.600' }}
            onClick={handleNextClick}
          >
            Siguiente
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
}

export default CreateProjectContent;
*/
import React, { useState } from 'react';
import {
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  HStack,
  Box,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function CreateProjectContent() {
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProjectNameValid, setIsProjectNameValid] = useState(true); // Nuevo estado para validar el nombre del proyecto
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (projectName.trim() === '') {
      // Mostrar un mensaje de error si el campo de nombre del proyecto está vacío
      setErrorMessage('Por favor, complete el nombre del proyecto.');
      setIsProjectNameValid(false); // Establecer el estado de validación como falso
    } else {
      setErrorMessage(''); // Borrar cualquier mensaje de error anterior
      setIsProjectNameValid(true); // Establecer el estado de validación como verdadero
      navigate('/dashboardNewLoadProject');
    }
  };

  return (
    <Stack spacing={4} align="center">
      <Text
        fontSize="1.875rem"
        fontWeight="bold"
        fontFamily="Optima LT Pro"
        color="#041D39"
      >
        Crear Nuevo Proyecto
      </Text>
      <Text fontSize="lg" fontWeight="400" color="#041D39">
        Nombre de proyecto:
      </Text>
      <FormControl
        maxW="20rem"
        textAlign="center"
        isInvalid={!isProjectNameValid} // Aplicar el estilo de campo no válido
      >
        <FormLabel></FormLabel>
        <Input
          type="text"
          placeholder="Escriba el nombre del proyecto"
          _placeholder={{ color: '#041D39' }}
          textAlign="center"
          fontSize="1rem"
          bg="white"
          shadow="lg"
          mb="1rem"
          w="20rem"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </FormControl>
      <Text color="white" fontSize="md">
        {errorMessage}
      </Text>
      <Stack spacing={4} align="center">
        <HStack spacing='24px'>
          <Link to="/dashboardNewLoadProject">
            <Button
              w="10rem"
              h="2.375rem"
              bg="#041D39"
              color="white"
              fontSize="1.25rem"
              fontWeight="400"
              _hover={{ backgroundColor: 'gray.600' }}
            >
              Cancelar
            </Button>
          </Link>
          <Button
            w="10rem"
            h="2.375rem"
            bg="#041D39"
            color="white"
            fontSize="1.25rem"
            fontWeight="400"
            _hover={{ backgroundColor: 'gray.600' }}
            onClick={handleNextClick}
          >
            Siguiente
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
}

export default CreateProjectContent;
