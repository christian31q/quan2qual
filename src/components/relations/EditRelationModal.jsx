import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const EditRelationModal = ({ isOpen, onClose, relation, onEdit, relationTypes }) => {
  const { t } = useTranslation();
  const [editedRelation, setEditedRelation] = useState({
    type_id: '',
    type_label: '',
    weight: '',
    direction: '',
    class: '',
    _id: '',
  });

  // Cargar los valores de la relación seleccionada al abrir el modal
  useEffect(() => {
    if (relation) {
      setEditedRelation({
        type_id: relation.type_id || '',
        type_label: relation.type_label || '',
        weight: relation.weight || '',
        direction: relation.direction || '',
        class: relation.class || '',
        _id: relation._id || '',  // Asegúrate de cargar el _id aquí
      });
    }
  }, [relation]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRelation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar la selección del tipo de relación
  const handleTypeChange = (e) => {
    const selectedType = relationTypes.find((type) => type._id === e.target.value);
    setEditedRelation((prevState) => ({
      ...prevState,
      type_id: selectedType._id,
      type_label: selectedType.label,
      weight: selectedType.inputValues.peso_relacion,
    }));
  };

  const handleSubmit = () => {
    const { _id, ...relationDataToUpdate } = editedRelation;
  
    if (_id) {
      onEdit({ _id, ...relationDataToUpdate });  // Enviamos el _id separado para referencia, pero no lo incluimos en los datos de actualización
    } else {
      console.error('No se encontró el ID de la relación.');
    }
  
    // Cerrar el modal después de guardar los cambios
    onClose();
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('editRelationWord')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Tipo de relación */}
          <FormControl>
            <FormLabel fontSize="20px">{t('editRelationWord')}</FormLabel>
            <Select
              placeholder="Seleccione un tipo de relación"
              value={editedRelation.type_id}
              onChange={handleTypeChange}
            >
              {relationTypes.map((type) => (
                <option key={type._id} value={type._id}>
                  {type.label} | weight: {type.inputValues.peso_relacion}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Dirección de la relación */}
          <FormControl mt={4}>
            <FormLabel fontSize="20px">{t('editDirectionWord')}</FormLabel>
            <Select
              name="direction"
              value={editedRelation.direction}
              onChange={handleChange}
            >
              <option value="dirigida">Dirigida</option>
              <option value="no dirigida">No Dirigida</option>
            </Select>
          </FormControl>

          {/* Clase de la relación */}
          <FormControl mt={4}>
            <FormLabel fontSize="20px">{t('editClassRelatonship')}</FormLabel>
            <Input
              type="text"
              name="class"
              value={editedRelation.class}
              placeholder={t('editClassRelatonship')}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {t('saveButtonChanges')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditRelationModal;
