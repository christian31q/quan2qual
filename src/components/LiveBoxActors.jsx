import React, { useState } from 'react';
import {
  Box,
  Divider,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { SketchPicker } from 'react-color';
import { FiEdit3 } from 'react-icons/fi';
import { IoMdAddCircleOutline } from "react-icons/io";

import ColorPicker from '@radial-color-picker/react-color-picker';
import '@radial-color-picker/react-color-picker/dist/style.css';

function LiveBoxActors({ isOpen, onClose }) {
  const [actorName, setActorName] = useState('');
  const [actorColor, setActorColor] = useState('#ffffff');

  const handleColorChange = (color) => {
    setActorColor(color.hex);
  };

  const handleIconPickerClick = () => {
    // Aquí puedes implementar la lógica para elegir un ícono
  };

  const handleAddAttribute = () => {
    console.log("Añadir atributo");
    // Aquí puedes implementar la lógica para agregar un nuevo atributo
  };

  const handleCancel = () => {
    // Lógica para cerrar el LiveBox
    onClose();
  };

  const handleCreateActor = () => {
    // Lógica para crear un nuevo actor
    console.log('Crear actor:', actorName, actorColor);
    onClose();
  };

  const [color, setColor] = React.useState({
    hue: 90,
    saturation: 100,
    luminosity: 50,
    alpha: 1,
});

const onInput = hue => {
    setColor(prev => {
        return {
            ...prev,
            hue,
        };
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
      <Text fontSize="rem" mb="4" textAlign="center">
        Crear nuevo actor
      </Text>
      <Divider mb="4" />
      <Flex alignItems="center" mb="4">
        {/*<SketchPicker color={actorColor} onChange={handleColorChange} />*/}
        <ColorPicker {...color} onInput={onInput} />
        <Button ml="4" onClick={handleIconPickerClick}>
          <FiEdit3 />
        </Button>
      </Flex>
      <Divider mb="4" />
      <HStack mb="4" spacing="4" justifyContent="center">
        <VStack spacing="4">
          <Text>ID</Text>
          <Input
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
            placeholder="ID del actor"
          />
        </VStack>
        <VStack spacing="4">
          <Text>Label</Text>
          <Input
            placeholder="Label del actor" 
            />
        </VStack>
      </HStack>
      <Text fontSize="xl" mb="4" textAlign="center">
        Atributos adicionales
      </Text>
      <VStack mb="4" spacing="2">
        <HStack spacing="4">
          <Input placeholder="Atributo 1" />
          <Input placeholder="Valor 1" />
        </HStack>
        <HStack spacing="4">
          <Input placeholder="Atributo 2" />
          <Input placeholder="Valor 2" />
        </HStack>
        <IconButton
            colorScheme='gray'
            aria-label='Search database'
            icon={<IoMdAddCircleOutline />}
            onClick={handleAddAttribute}
            fontSize="30px"
            width="10rem"
            borderRadius="0.75rem"
        />
      </VStack>
      <Flex justify="center" justifyContent="space-evenly"> {/* Centra los botones */}
        <Button mr="2" onClick={handleCancel} colorScheme='red' width= "10.375rem" height= "2.8125rem">
          Cancelar
        </Button>
        <Button mr="2" onClick={handleCreateActor} colorScheme="green" width= "10.375rem" height= "2.8125rem">
          Crear
        </Button>
      </Flex>
    </Box>
  );
}

export default LiveBoxActors;