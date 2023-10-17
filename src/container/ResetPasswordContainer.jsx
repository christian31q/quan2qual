import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Center,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useTranslation, Trans } from 'react-i18next';


function ResetPasswordContainer() {
  const {t} = useTranslation();

  const navigateTo = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = (values) => {
    if (values.password === values.confirmPassword) {
      // Las contraseñas coinciden
      navigateTo('/login');
    } else {
      // Las contraseñas no coinciden
    }
  };

  return (
    <Center>
      <Box p="6" bg="#D05543" borderRadius="md" boxShadow="lg" w="26.25rem" h="22.375rem" textAlign="center">
        <Text fontSize="1.875rem" fontWeight="bold" mb="4" fontFamily="Optima LT Pro" color="#041D39">
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
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel ml="2rem">{t('newPassword')}</FormLabel>
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
                    <FormLabel ml="2rem">{t('confirmPassword')}</FormLabel>
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
              <Center>
                <Button
                  type='submit'
                  color="white"
                  w="20rem"
                  h="2.375rem"
                  bg="#041D39"
                  fontSize="1.25rem"
                  fontWeight="400"
                  _hover={{ backgroundColor: 'gray.600' }}
                >
                  {t('resetPassword')}
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
}

export default ResetPasswordContainer;