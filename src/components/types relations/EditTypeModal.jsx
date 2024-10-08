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
} from '@chakra-ui/react';
import SliderWeight from '../SliderWeight';
import { useTranslation } from 'react-i18next';

const EditTypeModal = ({ isOpen, onClose, type, onEdit }) => {
  const { t } = useTranslation();
  const [editedType, setEditedType] = useState({ inputValues: {} });
  const [originalValues, setOriginalValues] = useState({});

  // Actualizar los valores editados cuando el tipo cambie
  useEffect(() => {
    if (type && type.inputValues) {
      setEditedType({ inputValues: { ...type.inputValues } });
      setOriginalValues({ ...type.inputValues });
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedType({
      inputValues: {
        ...editedType.inputValues,
        [name]: value,
      },
    });
  };

  const handleSliderChange = (value) => {
    setEditedType({
      inputValues: {
        ...editedType.inputValues,
        peso_relacion: value,
      },
    });
  };

  const handleSubmit = () => {
    // Llamar a onEdit con el tipo editado
    onEdit({
      ...type,
      inputValues: {
        ...type.inputValues,
        ...editedType.inputValues,
      },
    });

    // Cerrar el modal después de guardar los cambios
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('editTypeModalWord')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {type &&
            type.inputValues &&
            Object.entries(type.inputValues).map(([inputName, inputValue]) => (
              <FormControl key={inputName}>
                <FormLabel fontSize="20px">
                  {inputName === 'nombre_personalizada'
                    ? 'Nombre de la relación'
                    : inputName.replace(/_/g, ' ')}
                </FormLabel>
                {inputName === 'peso_relacion' ? (
                  <SliderWeight
                    value={editedType.inputValues[inputName] || originalValues[inputName]}
                    onChange={handleSliderChange}
                  />
                ) : (
                  <Input
                    type="text"
                    name={inputName}
                    value={editedType.inputValues[inputName] || ''}
                    placeholder={originalValues[inputName] || ''}
                    onChange={handleChange}
                  />
                )}
              </FormControl>
            ))}
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

export default EditTypeModal;

