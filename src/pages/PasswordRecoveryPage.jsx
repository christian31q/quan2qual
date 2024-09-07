import React from 'react';
import { Flex } from '@chakra-ui/react';
import PasswordRecoveryContainer from '../container/PasswordRecoveryContainer';
import loginImage from '../assets/logoUMNG.png';

function PasswordRecoveryPage() {
  const backgroundImageStyle = {
    backgroundSize: '30%',
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat'
  };
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundSize="cover"
      backgroundImage={loginImage}
      style={backgroundImageStyle}
    >
      <PasswordRecoveryContainer />
    </Flex>
  );
}

export default PasswordRecoveryPage;

