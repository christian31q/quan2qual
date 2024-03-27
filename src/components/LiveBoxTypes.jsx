import React, { useState } from 'react';
import {
  Box,
  Divider,
  Text,
  Button,
  Flex,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import IconPicker from 'react-icons-picker';
import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

const LiveBoxTypes = ({ isOpen, onClose }) => {
  // Estado para el nombre del tipo de relación
  const [relationTypeName, setRelationTypeName] = useState('');
  // Estado para el ícono del tipo de relación
  const [relationTypeIcon, setRelationTypeIcon] = useState("FaUsers");
  // Estado para los atributos del tipo de relación
  const [attributes, setAttributes] = useState([]);

  const handleCancel = () => {
    // Lógica para cancelar y cerrar el LiveBox
    onClose();
  };

  const handleCreateRelationType = () => {
    // Lógica para validar y crear el nuevo tipo de relación
    // Se debería implementar la lógica de validación aquí
    // Una vez validado, se puede crear el tipo de relación
    // y cerrar el LiveBox

    // Ejemplo de función para mostrar un mensaje de éxito
    showToast('Tipo de relación creado correctamente', 'success');

    // Cerrar el LiveBox
    onClose();
  };

  const showToast = (message, type) => {
    // Función para mostrar un mensaje de toast
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="#272F34"
      p="30px"
      borderRadius="md"
      boxShadow="md"
      display={isOpen ? 'block' : 'none'}
      zIndex="999"
      minWidth="650px"
    >
      {/* Título del LiveBox */}
      <Text fontSize="1.5rem" mb="4" textAlign="center">
        Crear nuevo tipo de relación
      </Text>
      {/* Separador */}
      <Divider mb="4" />
      {/* Dropdown con opciones */}
      {/* Aquí se debe agregar el dropdown con las diferentes opciones */}
      {/* Botones de acción */}
      <Flex justify="center" justifyContent="space-evenly">
        <Button mr="2" onClick={handleCancel} colorScheme='red' width= "10.375rem" height= "2.8125rem">
          Cancelar
        </Button>
        <Button mr="2" onClick={handleCreateRelationType} colorScheme="green" width= "10.375rem" height= "2.8125rem">
          Crear
        </Button>
      </Flex>
      {/* Contenedor para mostrar los toasts */}
      <ToastContainer />
    </Box>
  );
};

export default LiveBoxTypes;
