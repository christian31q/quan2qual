import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import ResetPasswordContainer from '../container/ResetPasswordContainer';
import loginImage from '../assets/Trama.png';

function ResetPasswordPage() {
  const backgroundImageStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundImage={loginImage}
      style={backgroundImageStyle}
    >
      <ResetPasswordContainer />
    </Flex>
  );
}

export default ResetPasswordPage;
