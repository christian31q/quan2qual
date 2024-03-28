import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Text,
  Button,
  Flex,
  VStack,
  Select,
  Input,
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  InputGroup,
  Tooltip
} from '@chakra-ui/react';
import { TbWeight } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

const LiveBoxTypes = ({ isOpen, onClose }) => {
  // Estado para el nombre del tipo de relación
  const [relationTypeName, setRelationTypeName] = useState('');
  // Estado para el ícono del tipo de relación
  const [relationTypeIcon, setRelationTypeIcon] = useState("FaUsers");
  // Estado para los atributos del tipo de relación
  const [attributes, setAttributes] = useState([]);
  // Estado para la opción seleccionada en el dropdown
  const [selectedOption, setSelectedOption] = useState('');

  // Estado para los valores de los inputs de la relación de amistad
  const [friendshipInputs, setFriendshipInputs] = useState({
    nivel: '',
    frecuencia: '',
    intereses: '',
    fecha: '',
    notas: '',
    peso: 1,
  });

  // Función para reiniciar los valores del LiveBox
  const resetLiveBox = () => {
    setRelationTypeName('');
    setRelationTypeIcon("FaUsers");
    setAttributes([]);
    setSelectedOption('');
    setFriendshipInputs({
      nivel: '',
      frecuencia: '',
      intereses: '',
      fecha: '',
      notas: '',
      peso: 1,
    });
  };

  // Efecto para reiniciar los valores cuando se abre el LiveBox
  useEffect(() => {
    if (isOpen) {
      resetLiveBox();
    }
  }, [isOpen]);

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

  // Función para manejar el cambio en la opción seleccionada
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Funciones para manejar los cambios en los inputs de la relación de amistad
  const handleFriendshipInputChange = (e) => {
    const { name, value } = e.target;
    setFriendshipInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // Función para manejar el cambio en el slider del peso de la relación de amistad
  const handleFriendshipSliderChange = (value) => {
    setFriendshipInputs((prevInputs) => ({
      ...prevInputs,
      peso: value,
    }));
  };

  const [sliderValue, setSliderValue] = React.useState(5)
  const [showTooltip, setShowTooltip] = React.useState(false)

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
      <Flex justify="center" mb="4">
        <Select
          placeholder="Selecciona un tipo de relación"
          value={selectedOption}
          onChange={handleOptionChange}
          width="300px"
        >
          <option style={{color: 'black'}} value="option1">Relación de amistad</option>
          <option style={{color: 'black'}} value="option2">Relación de trabajo en equipo</option>
          <option style={{color: 'black'}} value="option3">Relación de comunicación</option>
          <option style={{color: 'black'}} value="option4">Relación de impacto</option>
          <option style={{color: 'black'}} value="custom">Relación personalizada</option>
        </Select>
      </Flex>
      {/* Inputs específicos para cada opción */}
      {selectedOption === 'option1' && (
        <VStack spacing="4" align="stretch">
          <InputGroup flexDirection='column' gap='20px'>
            <Text mb='8px'>Nivel de amistad:</Text>
            <Input
              placeholder="Cercano, conocido"
              name="nivel"
              value={friendshipInputs.nivel}
              onChange={handleFriendshipInputChange}
              mb='10px'
            />
            <Text mb='8px'>Frecuencia de interacción:</Text>
             <Input
              placeholder="3 veces por semana"
              name="frecuencia"
              value={friendshipInputs.frecuencia}
              onChange={handleFriendshipInputChange}
              mb='10px'
            />
            <Text mb='8px'>Intereses compartidos:</Text>
             <Input
              placeholder="Música, deportes"
              name="intereses"
              value={friendshipInputs.intereses}
              onChange={handleFriendshipInputChange}
              mb='10px'
            />
            <Text mb='8px'>Fecha de inicio de la relación:</Text>
            <Input
              placeholder="Fecha de inicio de la relación"
              name="fecha"
              value={friendshipInputs.fecha}
              onChange={handleFriendshipInputChange}
              type='date'
              mb='10px'
            />
            <Text mb='8px'>Notas adicionales:</Text>
            <Textarea
              placeholder="Añade una pequeña nota (opcional)"
              name="notas"
              value={friendshipInputs.notas}
              onChange={handleFriendshipInputChange}
              mb='10px'
            />
          </InputGroup>
          <Flex align="center">
            <Text mr="2">Peso de la relación: {friendshipInputs.peso}</Text>
            <Slider
              id='peso'
              defaultValue={1}
              flex="1"
              onChange={handleFriendshipSliderChange}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              min={0}
              max={1}
              step={0.1}
            >
              <SliderTrack bg="gray.100">
                <SliderFilledTrack bg="blue.500" />
              </SliderTrack>
                <Tooltip
                  hasArrow
                  bg='teal.500'
                  color='white'
                  placement='top'
                  isOpen={showTooltip}
                  label={`${friendshipInputs.peso}`}
                >
                  <SliderThumb />
                </Tooltip>         
            </Slider>
          </Flex>
        </VStack>
      )}
      {/* Botones de acción */}
      <Flex justify="center" justifyContent="space-evenly" mt="4">
        <Button mr="2" onClick={handleCancel} colorScheme='red' width="10.375rem" height="2.8125rem">
          Cancelar
        </Button>
        <Button mr="2" onClick={handleCreateRelationType} colorScheme="green" width="10.375rem" height="2.8125rem">
          Crear
        </Button>
      </Flex>
      {/* Contenedor para mostrar los toasts */}
      <ToastContainer />
    </Box>
  );
};

export default LiveBoxTypes;

