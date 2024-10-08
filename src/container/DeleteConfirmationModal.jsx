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
import { useTranslation, Trans } from 'react-i18next';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, type }) => {
  const {t} = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('deleteConfirmationTitle')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {t('deleteTypeWord')} {type}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            {t('deleteButton')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
