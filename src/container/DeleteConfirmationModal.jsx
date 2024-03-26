import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, type }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar Eliminación</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          ¿Estás seguro de que deseas eliminar {type}?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
