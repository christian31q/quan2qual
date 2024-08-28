import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Center, Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel, InputLeftElement, InputGroup, Spinner } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import requestMongo from '../api/request';
import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();


function PasswordRecoveryContainer() {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const showToast = (message, type) => {
    toast({
      title: `${type}`,
      description: message,
      status: `${type}`,
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault(); // Evita la presentación del formulario por defecto

    if (email.trim() !== '') {
      setIsLoading(true);
      try {
        // Buscar al usuario en la base de datos
        const result = await requestMongo("users", { filter: { email: email } }, "findOne");
        
        if (result.document != null) {
          showToast('Usuario confirmado.', 'success');
          setTimeout(() => {
            navigateTo('/resetPassword', { state: {email: email } });
          }, 2500); 
        } else {
          showToast('El usuario proporcionado no existe.', 'error');
        }
      } catch (error) {
        console.error('Error al encontrar el usuario')
        alert('Hubo un error en la autenticación');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Muestra un mensaje de error o realiza alguna acción en caso de correo no válido.
      //console.log('Correo no válido');
    }
  };

  return (
    <Center>
      <Box p="6" bg="gray.300" borderRadius="md" boxShadow="lg" w="30rem" h="16.4375rem" textAlign="center">
        <Text
          fontSize="1.875rem"
          fontWeight="bold"
          mb="4"
          fontFamily="Optima LT Pro"
          color="#173378"
        >
          {t('forgotPassword')}
        </Text>
        <Center>
        <form onSubmit={handlePasswordRecovery}>
          <FormControl id="passwordRecovery" color="#173378" isRequired>
            <FormLabel ml="0.5rem">{t('usertText')}</FormLabel>
            <InputGroup>
              <Input
                type="email"
                w="23rem"
                h="3rem"
                bg="white"
                textAlign="center"
                placeholder={t('inputLoginEmail')}
                _placeholder={{ color: '#173378' }}
                mb="1.88rem"
                fontSize="1.25rem"
                shadow="lg"
                isRequired
                value={email}
                onChange={handleEmailChange}
              />
            </InputGroup>
            <Button
              type="submit"
              color="white"
              w="23rem"
              h="2.375rem"
              bg="#173378"
              fontSize="1.25rem"
              fontWeight="500"
              _hover={{ backgroundColor: 'gray.600' }}
              isLoading={isLoading} // Aquí es donde se muestra el spinner
              loadingText={t('verifying')}
            >
              {t('buttonPasswordRecovery')}
            </Button>
          </FormControl>
        </form>
        </Center>
      </Box>
    </Center>
  );
}

export default PasswordRecoveryContainer;
