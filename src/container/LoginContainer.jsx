import React from 'react';
import { Flex, Image, Box, Button, AbsoluteCenter, Divider, HStack, Center, Text } from '@chakra-ui/react';
import loginImage from '../assets/Trama.png';
import LoginForm from '../components/LoginForm';
//import LanguageChanger from '../components/LanguageChanger';

function LoginPage() {
  return (
    <Flex
      bg="white"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Image
        src={loginImage}
        alt="Imagen de inicio de sesión"
        maxH={{ base: 'auto', md: '100vh' }}
        flex={{ base: 'none', md: 2 }}
        marginRight={{ base: '0', md: '2.75rem' }}
      />

      <Box
        bg="gray.300"
        p="1.25em"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        boxShadow="lg"
        w={{ base: '100%', md: '26.25rem' }}
        h="32.9375rem"
        textAlign="center"
        marginRight={{ base: 0, md: '2.75rem' }}
      >
        <LoginForm />  
        {/*<LanguageChanger/>*/}
      </Box>
    </Flex>
  );
}

export default LoginPage;

