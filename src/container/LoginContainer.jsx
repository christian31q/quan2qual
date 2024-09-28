import React from 'react';
import { Flex, Image, Box } from '@chakra-ui/react';
import loginImage from '../assets/Fondo.png';
import LoginForm from '../components/LoginForm';
//import LanguageChanger from '../components/LanguageChanger';
const loginImageUrl = "https://raw.githubusercontent.com/christian31q/quan2qual/refs/heads/main/src/assets/Fondo.png?token=GHSAT0AAAAAACYFWMRLRMQ4QJD6RVBT3LGWZXYIX2Q";

function LoginPage() {
  return (
    <Flex
      alignItems="center"
      bg="white"
      gap='200px'
      flexDirection='column'
      justifyContent="space-evenly"
      height='auto'
      width='100%'
    >
      <Box
        bg="#173378"
        width='100%'
        height='10'
      >
        <Box
          bg='#fdc600'
          height='5'
        >
        </Box>
      </Box>
      <Box
        display='flex'
        justifyContent='space-between'
      >
        <Image
          src={loginImageUrl}
          alt="Imagen de inicio de sesión"
          maxW={{ base: '100%', md: 'auto' }}
          maxH={{ base: 'auto', md: 'auto' }}
          flex={{ base: 'none', md: 2 }}
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
        >
          <LoginForm />  
          {/*<LanguageChanger/>*/}
        </Box>

      </Box>
    </Flex>
  );
}

export default LoginPage;

