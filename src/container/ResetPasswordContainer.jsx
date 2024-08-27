import React, { useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Center,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  StylesProvider,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import requestMongo from '../api/request';
import bcrypt from 'bcryptjs';
import { createStandaloneToast } from '@chakra-ui/react';
import '../styles/HandleStyles.css'


const { ToastContainer, toast } = createStandaloneToast();

function ResetPasswordContainer() {
  const {t} = useTranslation();
  const location = useLocation();
  const navigateTo = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const email = location.state?.email;
  
  const handleBack = () =>{
    navigateTo('/login')
  };
  const handleResetPassword = async (values) => {
    if (values.password === values.confirmPassword) {
      console.log('Coinciden');
      setIsLoading(true);
      try {
        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(values.password, 10);

        // Actualizar la contraseña en la base de datos
        const result = await requestMongo('users', {
          filter: { email: email },
          update: { $set: { password: hashedPassword } },
        }, 'updateOne');

        if (result && result.modifiedCount > 0) {
          showToast('Contraseña actualizada exitosamente.', 'success');
          setTimeout(() => {
            navigateTo('/login');
          }, 2500); 
        } else {
          showToast('No se pudo actualizar la contraseña.', 'error');
        }

      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        alert('Hubo un error al actualizar la contraseña.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Las contraseñas no coinciden
    }
  };

  return (
    <Center>
      <Box p="6" bg="gray.300" borderRadius="md" boxShadow="lg" w="26.25rem" h="25rem" textAlign="center">
        <Text fontSize="1.875rem" fontWeight="bold" mb="4" fontFamily="Optima LT Pro" color="#3450E2">
          {t('resetPassword')}
        </Text>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          onSubmit={handleResetPassword}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Field name='password' validate={(value) => (value ? undefined : 'La contraseña es requerida')}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password} textAlign="center">
                    <FormLabel color="#3450E2" ml="2rem">{t('newPassword')}</FormLabel>
                      <Input
                        type='password'
                        w="20rem"
                        h="3rem"
                        bg="white"
                        textAlign="center"
                        placeholder={t('newPasswordInput')}
                        _placeholder={{ color: '#041D39' }}
                        mb="1.19rem"
                        fontSize="1.25rem"
                        shadow="lg"
                        isRequired
                        {...field}
                      />
                    <Center>
                      <FormErrorMessage color="white" mt="0">{form.errors.password}</FormErrorMessage>
                    </Center>
                    
                  </FormControl>
                )}
              </Field>
              <Field name='confirmPassword' validate={(value) => (value === values.password ? undefined : 'Las contraseñas no coinciden')}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                    <FormLabel color="#3450E2" ml="2rem">{t('confirmPassword')}</FormLabel>
                    <Input
                      type='password'
                      w="20rem"
                      h="3rem"
                      bg="white"
                      textAlign="center"
                      placeholder={t('confirmPasswordInput')}
                      _placeholder={{ color: '#041D39' }}
                      mb="1.69rem"
                      fontSize="1.25rem"
                      shadow="lg"
                      isRequired
                      {...field}
                    />
                    <Center>
                      <FormErrorMessage color="white" mt="0">{form.errors.confirmPassword}</FormErrorMessage>
                    </Center>
                  </FormControl>
                )}
              </Field>
              <VStack>
                  <Button
                    type='submit'
                    color="white"
                    w="20rem"
                    h="2.375rem"
                    bg="#3450E2"
                    fontSize="1.25rem"
                    fontWeight="500"
                    _hover={{ backgroundColor: 'gray.600' }}
                    isLoading={isLoading} // Aquí es donde se muestra el spinner
                    loadingText={t('loading')} // Texto mientras carga
                  >
                    {t('resetPassword')}
                  </Button>
                  <Button
                    color="white"
                    w="20rem"
                    h="2.375rem"
                    bg="#3450E2"
                    fontSize="1.25rem"
                    fontWeight="500"
                    _hover={{ backgroundColor: 'gray.600' }}
                    onClick={handleBack}
                  >
                    {t('cancel')}
                  </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}

export default ResetPasswordContainer;