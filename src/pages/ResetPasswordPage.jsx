import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import ResetPasswordContainer from '../container/ResetPasswordContainer';
import loginImage from '../assets/logoUMNG.png';

function ResetPasswordPage() {
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
      backgroundImage={loginImage}
      style={backgroundImageStyle}
    >
      <ResetPasswordContainer />
    </Flex>
  );
}

export default ResetPasswordPage;
