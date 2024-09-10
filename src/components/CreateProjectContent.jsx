import React, { useState } from 'react';
import {
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  HStack,
  Box,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { createProjectInDB } from '../utils/mongoUtils';
import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

function CreateProjectContent() {
  const {t} = useTranslation();
  
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProjectNameValid, setIsProjectNameValid] = useState(true); // Nuevo estado para validar el nombre del proyecto
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, type) => {
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleNextClick = async () => {
    if (projectName.trim() === '') {
      setErrorMessage('Please, complete the project name field.');
      setIsProjectNameValid(false);
    } else {
      setIsLoading(true);
      setErrorMessage('');
      setIsProjectNameValid(true);
  
      try {
        const userId = sessionStorage.getItem('userId'); // Obtener el ID del usuario desde sessionStorage
        
        console.log('User id: ', userId);
        // Guarda el proyecto en la base de datos
        const result = await createProjectInDB(projectName, userId);
        const projectId = result.insertedId;

        showToast('Proyecto creado con éxito', 'success')
  
        // Navega a la siguiente página
        navigate(`/addSessionType?projectId=${projectId}`);
      } catch (error) {
        setErrorMessage('Error creating project. Please try again.');
        showToast('Hubo un error al crear el proyecto', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };  

  return (
    <Stack spacing={4} align="center">
      <Text
        fontSize="1.875rem"
        fontWeight="bold"
        fontFamily="Optima LT Pro"
        color="#173378"
      >
        {t('createProjectTitle')}
      </Text>
      <Text fontSize="lg" fontWeight="400" color="#173378">
        {t('projectTitle')}
      </Text>
      <FormControl
        maxW="20rem"
        textAlign="center"
        isInvalid={!isProjectNameValid} // Aplicar el estilo de campo no válido
      >
        <FormLabel></FormLabel>
        <Input
          type="text"
          placeholder={t('projectTitleInput')}
          _placeholder={{ color: '#173378' }}
          textAlign="center"
          fontSize="1rem"
          bg="white"
          shadow="lg"
          mb="1rem"
          w="20rem"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </FormControl>
      <Text color="#173378" fontSize="md">
        {errorMessage}
      </Text>
      <Stack spacing={4} align="center">
        <HStack spacing='24px'>
          <Link to="/dashboardNewLoadProject">
            <Button
              w="10rem"
              h="2.375rem"
              bg="#173378"
              color="white"
              fontSize="1.25rem"
              fontWeight="400"
              _hover={{ backgroundColor: 'gray.600' }}
            >
              {t('cancel')}
            </Button>
          </Link>
          <Button
            w="10rem"
            h="2.375rem"
            bg="#173378"
            color="white"
            fontSize="1.25rem"
            fontWeight="400"
            _hover={{ backgroundColor: 'gray.600' }}
            isLoading={isLoading}
            loadingText={t('loading')}
            onClick={handleNextClick}
          >
            {t('next')}
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
}

export default CreateProjectContent;
