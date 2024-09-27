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
  Icon
} from '@chakra-ui/react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { createStandaloneToast } from '@chakra-ui/react';
import SliderWeight from './SliderWeight';
import { useSearchParams } from 'react-router-dom';
import useRelationTypeStore from '../store/relationTypesStore';

const { ToastContainer, toast } = createStandaloneToast();

const LiveBoxTypes = ({ isOpen, onClose }) => {
  const { createRelationType, loading, error } = useRelationTypeStore();

  // Estado para el nombre del tipo de relación
  const [relationTypeName, setRelationTypeName] = useState('');
  // Estado para los atributos del tipo de relación
  const [attributes, setAttributes] = useState([]);
  // Estado para la opción seleccionada en el dropdown
  const [selectedOption, setSelectedOption] = useState('');
  // Estado para los valores de los inputs
  const [inputValues, setInputValues] = useState({});
  // Añadir mas campos en la opción personalizada al crear tipo de relación 
  const [customFields, setCustomFields] = useState([]);
  // Estado par almacenar en el local storage
  const [types, setTypes] = useState([]);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  const optionsData = {
    option1: {
      label: 'Relación de amistad',
      fields: [
        { name: 'nivel_amistad', label: 'Nivel de amistad', type: 'input' },
        { name: 'frecuencia_amistad', label: 'Frecuencia de interacción', type: 'input' },
        { name: 'intereses_amistad', label: 'Intereses compartidos', type: 'input' },
        { name: 'fecha_amistad', label: 'Fecha de inicio de la relación', type: 'date' },
        { name: 'peso_relacion', label: 'Peso de la relación', type: 'slider' },
      ],
    },
    option2: {
      label: 'Relación de trabajo en equipo',
      fields: [
        { name: 'proyecto_te', label: 'Proyecto colaborativo', type: 'input' },
        { name: 'roles_te', label: 'Roles en el proyecto', type: 'input' },
        { name: 'intereses_te', label: 'Intereses compartidos', type: 'input' },
        { name: 'contribuciones_te', label: 'Contribuciones individuales', type: 'input' },
        { name: 'impacto_te', label: 'Impacto en el proyecto', type: 'input' },
        { name: 'tipo_colaboracion_te', label: 'Tipo de colaboración', type: 'input' },
        { name: 'fecha_colaboracion_te', label: 'Fecha de colaboración', type: 'date' },
        { name: 'peso_relacion', label: 'Peso de la relación', type: 'slider' },
      ],
    },
    option3: {
      label: 'Relación de comunicación',
      fields: [
        { name: 'tipo_comunicacion', label: 'Tipo de comunicación', type: 'input' },
        { name: 'contenido_comunicacion', label: 'Contenido de la comunicación', type: 'input' },
        { name: 'frecuencia_comunicacion', label: 'Frecuencia', type: 'input' },
        { name: 'contribuciones', label: 'Contribuciones individuales', type: 'input' },
        { name: 'temas_comunicacion', label: 'Temas recurrentes', type: 'input' },
        { name: 'resulado_comunicacion', label: 'Resuldato de la comunicación', type: 'input' },
        { name: 'fecha_comunicacion', label: 'Fecha de la comunicación', type: 'date' },
        { name: 'peso_relacion', label: 'Peso de la relación', type: 'slider' },
      ],
    },
    option4: {
      label: 'Relación de impacto',
      fields: [
        { name: 'tipo_impacto', label: 'Tipo de impacto', type: 'input' },
        { name: 'cambios_impacto', label: 'Cambios generados', type: 'input' },
        { name: 'naturaleza_impacto', label: 'Naturaleza del impacto', type: 'input' },
        { name: 'actores_impacto', label: 'Actores afectados', type: 'input' },
        { name: 'fecha_impacto', label: 'Fecha del impacto', type: 'date' },
        { name: 'peso_relacion', label: 'Peso de la relación', type: 'slider' },
      ],
    },
    custom: {
      label: 'Relación personalizada',
      fields: [
        { name: 'nombre_personalizada', label: 'Nombre del tipo de relación', type: 'input' },
        { name: 'descripcion_personalizada', label: 'Descripción', type: 'textarea' },
        { name: 'peso_relacion', label: 'Peso de la relación personalizada', type: 'slider' },
      ],
    }
  };

  //Inputs personalizados en relación personalizada 
  const handleAddField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };
  //Remover inputs personalizados en relación personalizada
  const handleRemoveField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  const handleCustomFieldChange = (index, name, value) => {
    const updatedFields = [...customFields];
    updatedFields[index] = { name, value };
    setCustomFields(updatedFields);
  };

  // Efecto para reiniciar los valores cuando se abre el LiveBox
  useEffect(() => {
    if (isOpen) {
      resetLiveBox();
    }
  }, [isOpen]);

  const resetLiveBox = () => {
    setRelationTypeName('');
    setAttributes([]);
    setSelectedOption('');
    setInputValues({});
    setCustomFields([]);
  };

  const handleCancel = () => {
    // Lógica para cancelar y cerrar el LiveBox
    onClose();
  }; 

  // Función para crear el tipo de relación
  const handleCreateRelationType = async () => {
    if (!selectedOption) {
      showToast('Por favor seleccione una opción', 'warning');
      return;
    }

    // Verificación de campos requeridos
    const requiredFields = optionsData[selectedOption].fields.map((field) => field.name);
    const areFieldsFilled = requiredFields.every(field => inputValues[field]);

    if (!areFieldsFilled || customFields.some(field => !field.name || !field.value)) {
      showToast('Por favor llene todos los campos', 'warning');
      return;
    }

    // Crear el objeto de tipo de relación a guardar en la base de datos
    const newType = {
      session_id: sessionId,  // Asegurarse de asociarlo con la sesión
      label: optionsData[selectedOption].label,
      inputValues,
      customFields,
    };

    try {
      // Usar la store para crear el tipo de relación
      await createRelationType(newType);

      showToast('Tipo de relación creado correctamente', 'success');
      onClose(); // Cerrar el modal o el LiveBox después de crear
    } catch (error) {
      console.error('Error al crear el tipo de relación:', error);
      showToast('Error al crear el tipo de relación', 'error');
    }
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
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
  };

  // Función para manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
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
      maxHeight='1000px'
      minWidth="650px"
      overflowY='auto'
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
          {Object.keys(optionsData).map((key) => (
            <option key={key} style={{color: 'black'}} value={key}>{optionsData[key].label}</option>
          ))}
        </Select>
      </Flex>
      {/* Inputs específicos para cada opción */}
      {selectedOption && optionsData[selectedOption] && (
        <VStack spacing="4" align="stretch">
          {optionsData[selectedOption].fields.map((field) => (
            <Box key={field.name}>
              <Text mb="8px">{field.label}:</Text>
              {field.type === 'input' && (
                <Input
                  placeholder={field.label}
                  name={field.name}
                  value={inputValues[field.name] || ''}
                  onChange={handleInputChange}
                  mb="10px"
                />
              )}
              {field.type === 'textarea' && (
                <Textarea
                  placeholder={field.label}
                  name={field.name}
                  value={inputValues[field.name] || ''}
                  onChange={handleInputChange}
                  mb="10px"
                />
              )}
              {field.type === 'date' && (
                <Input
                  placeholder={field.label}
                  name={field.name}
                  value={inputValues[field.name] || ''}
                  onChange={handleInputChange}
                  type="date"
                  mb="10px"
                />
              )}
              {field.type === 'slider' && (
                <Flex align="center">
                  <SliderWeight
                    value={inputValues[field.name] || 1}
                    onChange={(value) => setInputValues((prevInputs) => ({
                      ...prevInputs,
                      [field.name]: value,
                    }))}
                  />
                </Flex>
              )}
            </Box>
          ))}
          {selectedOption === 'custom' && (
            <VStack spacing="4" align="center">
              {customFields.map((field, index) => (
                <Box key={index} alignItems='center' display='flex' flexDirection='column' width='100%' gap='24px'>
                  <Text mb="8px">Campo adicional {index + 1}:</Text>
                  <Input
                    placeholder={`Nombre del campo ${index + 1}`}
                    value={field.name}
                    onChange={(e) => handleCustomFieldChange(index, e.target.value, field.value)}
                  />
                  <Input
                    placeholder={`Valor del campo ${index + 1}`}
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(index, field.name, e.target.value)}
                  />
                  <Button borderRadius='0.75rem' colorScheme='red' fontSize='30px' width='10rem' onClick={() => handleRemoveField(index)}><Icon as={TiDeleteOutline}/></Button>
                </Box>
              ))}
              <Button borderRadius='0.75rem' fontSize='30px' width='10rem' onClick={handleAddField}><Icon as={IoMdAddCircleOutline}/></Button>
            </VStack>
          )}
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