import React, { useState } from 'react';
import { Text, Stack, Box, Button, Center, HStack } from '@chakra-ui/react';
import SessionTitleInput from '../components/SessionTitleInput';
import IconButtons from '../components/IconButtons';
import { Link, useNavigate } from 'react-router-dom';

function AddSessionTypeContainer() {
  const [showAlert, setShowAlert] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isSessionTitleValid, setIsSessionTitleValid] = useState(true);
  const [isIconSelected, setIsIconSelected] = useState(false);
  const navigate = useNavigate();

  const handleCreateSession = () => {
    let hasError = false;

    if (!sessionTitle.trim()) {
      setIsSessionTitleValid(false);
      hasError = true;
    } else {
      setIsSessionTitleValid(true);
    }

    if (!selectedIcon) {
      setIsIconSelected(true);
      hasError = true;
    } else {
      setIsIconSelected(false);
    }

    if (hasError) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      // Agregar aquí la lógica para crear la sesión.

      if (selectedIcon === 1) {
        navigate('/videoWindow');
      } else if (selectedIcon === 2) {
        navigate('/imagenWindow');
      } else if (selectedIcon === 3) {
        navigate('/audioWindow');
      }
    }
  };

  const handleSessionTitleChange = (value) => {
    setSessionTitle(value);
    // Cuando cambia el valor del input, oculta el mensaje de error.
    setShowAlert(false);
    setIsSessionTitleValid(true);
  };

  return (
    <Box p="6" bg="#D05543" borderRadius="md" boxShadow="lg" w="46.875rem" h="40rem" textAlign="center">
      <Stack spacing={4} align="center">
        <Text fontSize="2.8125rem" fontWeight="700" fontFamily="Optima LT Pro" color="#041D39" mt="1.5rem">
          Añadir Tipo de Sesión
        </Text>
        <Text fontSize="1.875rem" fontWeight="400" color="#041D39">
          Nueva Sesión
        </Text>
        <Center>
          <SessionTitleInput
            value={sessionTitle}
            onChange={handleSessionTitleChange}
            isInvalid={!isSessionTitleValid}
            errorMessage="Por favor, complete el campo del título de la sesión."
          />
        </Center>
        {showAlert && (
          <Text fontSize="1rem" mt="0" color="white">
            Por favor, complete el campo del título de la sesión o seleccione un tipo de archivo/estudio.
          </Text>
        )}
        <Text fontSize="1.875rem" fontWeight="400" color="#041D39">
          Tipo archivo/estudio:
        </Text>
        <IconButtons
          selectedIcon={selectedIcon}
          onIconSelect={(icon) => setSelectedIcon(icon)}
          isIconSelected={isIconSelected}
        />
      </Stack>
      <HStack spacing="5.44rem" justifyContent="center">
        <Link to="/dashboardNewLoadProject">
          <Button
            w="10rem"
            h="2.375rem"
            bg="#041D39"
            color="white"
            fontSize="1.25rem"
            fontWeight="400"
            shadow="lg"
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
          shadow="lg"
          _hover={{ backgroundColor: 'gray.600' }}
          onClick={handleCreateSession}
        >
          Crear
        </Button>
      </HStack>
    </Box>
  );
}

export default AddSessionTypeContainer;



