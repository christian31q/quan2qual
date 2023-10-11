import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import LoginContainer from '../container/LoginContainer';

function Login() {
  return (
    <ChakraProvider>
      <LoginContainer/>
    </ChakraProvider>
  );
}

export default Login;

