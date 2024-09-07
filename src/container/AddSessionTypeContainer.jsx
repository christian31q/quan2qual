import React, { useState } from 'react';
import { createStandaloneToast, Text, Stack, Box, Button, Center, HStack } from '@chakra-ui/react';
import SessionTitleInput from '../components/SessionTitleInput';
import IconButtons from '../components/IconButtons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import requestMongo from '../api/request';

const { ToastContainer, toast } = createStandaloneToast();

function AddSessionTypeContainer() {
  const {t} = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('projectId');

  const [showAlert, setShowAlert] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isSessionTitleValid, setIsSessionTitleValid] = useState(true);
  const [isIconSelected, setIsIconSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };

  const createSessionInDB = async (sessionData) => {
    const result = await requestMongo("sessions", sessionData, "insertOne");
    return result;
  };

  const handleCreateSession = async () => {
    let hasError = false;
  
    if (!sessionTitle.trim()) {
      setIsSessionTitleValid(false);
      hasError = true;
    } else {
      setIsSessionTitleValid(true);
    }
  
    if (!selectedIcon) {
      setIsIconSelected(true);
      hasError = true;
    } else {
      setIsIconSelected(false);
    }
  
    if (hasError) {
      setShowAlert(true);
    } else {
      setIsLoading(true);
      setShowAlert(false);
      
      try {
        // Lógica para crear la sesión en la base de datos
        const mediaType = selectedIcon === 1 ? 'video' : selectedIcon === 2 ? 'image' : 'audio';
        const mediaUrl = ''; // Aquí poner una URL predeterminada o vacía
        const unusedRelationshipTypes = []; // Inicialmente vacío, o obtener los tipos no usados
  
        const sessionData = {
          document: {
            project_id: projectId,
            name: sessionTitle,
            media_type: mediaType,
            media_url: mediaUrl,
            unused_relationship_types: unusedRelationshipTypes,
            created_at: new Date(),
          }
        };
  
        const result = await createSessionInDB(sessionData);
        showToast('Sesión creada con éxito', 'success');
  
        // Redirigir a la ventana correspondiente
        if (selectedIcon === 1) {
          //navigate('/videoWindow');
        } else if (selectedIcon === 2) {
          //navigate('/imagenWindow');
        } else if (selectedIcon === 3) {
          //navigate('/audioWindow');
        }
      } catch (error) {
        showToast('Error al crear la sesión', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSessionTitleChange = (value) => {
    setSessionTitle(value);
    // Cuando cambia el valor del input, oculta el mensaje de error.
    setShowAlert(false);
    setIsSessionTitleValid(true);
  };

  return (
    <Box p="6" bg="gray.300" borderRadius="md" boxShadow="lg" w="46.875rem" h="40rem" textAlign="center">
      <Stack spacing={4} align="center">
        <Text fontSize="2.8125rem" fontWeight="700" fontFamily="Optima LT Pro" color="#173378" mt="1.5rem">
          {t('addSessionTypeTitle')}
        </Text>
        <Text fontSize="1.875rem" fontWeight="400" color="#173378">
          {t('newSessionText')}
        </Text>
        <Center>
          <SessionTitleInput
            value={sessionTitle}
            onChange={handleSessionTitleChange}
            isInvalid={!isSessionTitleValid}
            //errorMessage="Por favor, complete el campo del título de la sesión."
          />
        </Center>
        {showAlert && (
          <Text fontSize="1rem" mt="0" color="#173378">
            {t('addSessionTypeErrorMessage')}
          </Text>
        )}
        <Text fontSize="1.875rem" fontWeight="400" color="#173378">
          {t('typeFileText')}
        </Text>
        <IconButtons
          selectedIcon={selectedIcon}
          onIconSelect={(icon) => setSelectedIcon(icon)}
          isIconSelected={isIconSelected}
        />
      </Stack>
      <HStack spacing="5.44rem" justifyContent="center">
        <Link to="/dashboardNewLoadProject">
          <Button
            w="10rem"
            h="2.375rem"
            bg="#173378"
            color="white"
            fontSize="1.25rem"
            fontWeight="400"
            shadow="lg"
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
          shadow="lg"
          _hover={{ backgroundColor: 'gray.600' }}
          isLoading={isLoading}
          loadingText={t('loading')}
          onClick={handleCreateSession}
        >
          {t('create')}
        </Button>
      </HStack>
    </Box>
  );
}

export default AddSessionTypeContainer;
