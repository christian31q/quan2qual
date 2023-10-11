import React from 'react';
import { Flex } from '@chakra-ui/react';
import PasswordRecoveryContainer from '../container/PasswordRecoveryContainer';
import loginImage from '../assets/Trama.png';

function PasswordRecoveryPage() {
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundSize="cover"
      backgroundImage={loginImage}
    >
      <PasswordRecoveryContainer />
    </Flex>
  );
}

export default PasswordRecoveryPage;

