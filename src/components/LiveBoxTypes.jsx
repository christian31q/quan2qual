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
import { useTranslation } from 'react-i18next';

const { ToastContainer, toast } = createStandaloneToast();

const LiveBoxTypes = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
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
      label: `${t('labelFriendshipRelation')}`,
      fields: [
        { name: 'nivel_amistad', label: `${t('labelFriendshipRelation1')}`, type: 'input' },
        { name: 'frecuencia_amistad', label: `${t('labelFriendshipRelation2')}`, type: 'input' },
        { name: 'intereses_amistad', label: `${t('labelFriendshipRelation3')}`, type: 'input' },
        { name: 'fecha_amistad', label: `${t('labelFriendshipRelation4')}`, type: 'date' },
        { name: 'peso_relacion', label: `${t('labelRelationshipWeight')}`, type: 'slider' },
      ],
    },
    option2: {
      label: `${t('labelTeamWork')}`,
      fields: [
        { name: 'proyecto_te', label: `${t('labelTeamWork1')}`, type: 'input' },
        { name: 'roles_te', label: `${t('labelTeamWork2')}`, type: 'input' },
        { name: 'intereses_te', label: `${t('labelTeamWork3')}`, type: 'input' },
        { name: 'contribuciones_te', label: `${t('labelTeamWork4')}`, type: 'input' },
        { name: 'impacto_te', label: `${t('labelTeamWork5')}`, type: 'input' },
        { name: 'tipo_colaboracion_te', label: `${t('labelTeamWork6')}`, type: 'input' },
        { name: 'fecha_colaboracion_te', label: `${t('labelTeamWork7')}`, type: 'date' },
        { name: 'peso_relacion', label: `${t('labelRelationshipWeight')}`, type: 'slider' },
      ],
    },
    option3: {
      label: `${t('labelCommunication')}`,
      fields: [
        { name: 'tipo_comunicacion', label: `${t('labelCommunication1')}`, type: 'input' },
        { name: 'contenido_comunicacion', label: `${t('labelCommunication2')}`, type: 'input' },
        { name: 'frecuencia_comunicacion', label: `${t('labelCommunication3')}`, type: 'input' },
        { name: 'contribuciones', label: `${t('labelCommunication4')}`, type: 'input' },
        { name: 'temas_comunicacion', label: `${t('labelCommunication5')}`, type: 'input' },
        { name: 'resulado_comunicacion', label: `${t('labelCommunication6')}`, type: 'input' },
        { name: 'fecha_comunicacion', label: `${t('labelCommunication7')}`, type: 'date' },
        { name: 'peso_relacion', label: `${t('labelRelationshipWeight')}`, type: 'slider' },
      ],
    },
    option4: {
      label: `${t('labelImpact')}`,
      fields: [
        { name: 'tipo_impacto', label: `${t('labelImpact1')}`, type: 'input' },
        { name: 'cambios_impacto', label: `${t('labelImpact2')}`, type: 'input' },
        { name: 'naturaleza_impacto', label: `${t('labelImpact3')}`, type: 'input' },
        { name: 'actores_impacto', label: `${t('labelImpact4')}`, type: 'input' },
        { name: 'fecha_impacto', label: `${t('labelImpact5')}`, type: 'date' },
        { name: 'peso_relacion', label: `${t('labelRelationshipWeight')}`, type: 'slider' },
      ],
    },
    custom: {
      label: `${t('labelCustom')}`,
      fields: [
        { name: 'nombre_personalizada', label: `${t('labelCustom1')}`, type: 'input' },
        { name: 'descripcion_personalizada', label: `${t('labelCustom2')}`, type: 'textarea' },
        { name: 'peso_relacion', label: `${t('labelCustomWeight')}`, type: 'slider' },
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
      showToast(`${t('toastSelectOption')}`, 'warning');
      return;
    }

    // Verificación de campos requeridos
    const requiredFields = optionsData[selectedOption].fields.map((field) => field.name);
    const areFieldsFilled = requiredFields.every(field => inputValues[field]);

    if (!areFieldsFilled || customFields.some(field => !field.name || !field.value)) {
      showToast(`${t('toastFillFields')}`, 'warning');
      return;
    }

    // Crear el objeto de tipo de relación a guardar en la base de datos
    const newType = {
      session_id: sessionId,  // Asegurarse de asociarlo con la sesión
      selectedOption,
      label: optionsData[selectedOption].label,
      inputValues,
      customFields,
    };

    try {
      // Usar la store para crear el tipo de relación
      await createRelationType(newType);

      showToast(`${t('toastTypeCreated')}`, 'success');
      onClose(); // Cerrar el modal o el LiveBox después de crear
    } catch (error) {
      console.error('Error al crear el tipo de relación:', error);
      showToast(`${t('toastTypeError')}`, 'error');
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
        {t('createNewTypeWord')}
      </Text>
      {/* Separador */}
      <Divider mb="4" />
      {/* Dropdown con opciones */}
      <Flex justify="center" mb="4">
        <Select
          placeholder={t('selectTypeWord')}
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
                  <Text mb="8px">{t('fieldAditional')} {index + 1}:</Text>
                  <Input
                    placeholder={`${t('fieldName')} ${index + 1}`}
                    value={field.name}
                    onChange={(e) => handleCustomFieldChange(index, e.target.value, field.value)}
                  />
                  <Input
                    placeholder={`${t('fieldValue')} ${index + 1}`}
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
          {t('cancel')}
        </Button>
        <Button mr="2" onClick={handleCreateRelationType} colorScheme="green" width="10.375rem" height="2.8125rem">
          {t('create')}
        </Button>
      </Flex>
      {/* Contenedor para mostrar los toasts */}
      <ToastContainer />
    </Box>
  );
};

export default LiveBoxTypes;