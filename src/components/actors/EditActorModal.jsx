import React, { useState } from 'react';
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

const EditActorModal = ({ isOpen, onClose, actor, onEdit }) => {
    const [editedActor, setEditedActor] = useState(actor || { name: '' });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedActor({
        ...editedActor,
        [name]: value,
      });
    };
  
    const handleSubmit = () => {
      // Llamar a handleEdit con el nombre del actor editado
      onEdit(editedActor.name);
      // Cerrar el modal después de guardar los cambios
      onClose();
    };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Actor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Label</FormLabel>
            <Input
              type="text"
              name="name"
              value={editedActor.name}
              onChange={handleChange}
            />
          </FormControl>
          {/* Aquí puedes agregar más campos para editar otros detalles del actor */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditActorModal;