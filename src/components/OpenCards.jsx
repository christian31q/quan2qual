import React from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { createStandaloneToast } from '@chakra-ui/react';
import { deleteProject, deleteSession } from '../utils/mongoUtils';

const { ToastContainer, toast } = createStandaloneToast();

function ProjectCard({ icon, title, creationDate, _id, type, onDelete }) {
  const {t} = useTranslation();

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
    const confirmed = window.confirm(t('deleteConfirmation'));

    if (confirmed) {
      console.log('Tipo: ', type);
      try {
        console.log('Id al eliminar: ', _id);
        let result;
        if (type === 'project') {
          result = await deleteProject(_id);  // Elimina proyecto
        } else if (type === 'session') {
          result = await deleteSession(_id);  // Elimina sesión
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
      }
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
      <Text color="#173378" fontSize="1.2rem" fontStyle="normal" fontWeight="700">
        {/*{project.title}*/}
        {title}
      </Text>
      <Text color="#173378" fontSize="0.8rem" fontStyle="normal" fontWeight="400">
        {/*{project.creationDate}*/}
        Fecha de creación: {creationDate}
      </Text>
      <HStack>
        <Link to={type === 'project' ? `/openSessions?projectId=${_id}` : `/sessionDetails?sessionId=${_id}`}>
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
            //onClick={onOpen}
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
            onClick={handleDelete}
          >
          {t('deleteButton')}
        </Button>
      </HStack>
    </Box>
  );
}

export default ProjectCard;