import React, { useState } from 'react';
import { Box, Text, Button, HStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createStandaloneToast } from '@chakra-ui/react';
import { deleteProject, deleteSession } from '../utils/mongoUtils';

const { toast } = createStandaloneToast();

function ProjectCard({ icon, title, creationDate, _id, type, media, onDelete }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const showToast = (message, type) => {
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      let result;
      if (type === 'project') {
        result = await deleteProject(_id) // Eliminar projecto
      } else if (type === 'session') {
        result = await deleteSession(_id); // Eliminar sesión
      }



      if (result > 0) {
        onDelete(_id);
        showToast(type === 'project' ? 'Proyecto eliminado' : 'Sesión eliminada', 'success');
      } else {
        showToast(type === 'project' ? 'Error al eliminar el proyecto' : 'Error al eliminar la sesión', 'error');
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      showToast(`Error eliminando el ${type === 'project' ? 'proyecto' : 'sesión'}`, 'error');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Box
      p={4}
      bg="white"
      shadow="md"
      borderRadius="lg"
      w="15.4375rem"
      h="12.4375rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {icon}
      <Text color="#173378" fontSize="1.2rem" fontWeight="700">
        {title}
      </Text>
      <Text color="#173378" fontSize="0.8rem" fontWeight="400">
        Fecha de creación: {creationDate}
      </Text>
      <HStack>
        <Link to={type === 'project' ? `/openSessions?projectId=${_id}` : `/session/${media}?sessionId=${_id}`}>
          <Button
            w="100%"
            h="1.7rem"
            bg="#173378"
            color="white"
            fontSize="1rem"
            fontWeight="400"
            shadow="lg"
            mt="1rem"
            _hover={{ backgroundColor: 'gray.600' }}
          >
            {t('openButton')}
          </Button>
        </Link>
        <Button
          w="100%"
          h="1.7rem"
          colorScheme="red"
          color="white"
          fontSize="1rem"
          fontWeight="400"
          shadow="lg"
          mt="1rem"
          onClick={onOpen}
        >
          {t('deleteButton')}
        </Button>
      </HStack>

      {/* Modal para confirmar eliminación */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('deleteConfirmationTitle')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {t('deleteConfirmationMessage')} {t('deleteConfirmationWarning')}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleDelete} 
              isLoading={loading}
            >
              {t('deleteButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProjectCard;