import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, HStack } from '@chakra-ui/react';
import AddSessionTypeContainer from '../container/AddSessionTypeContainer';
import loginImage from '../assets/logoUMNG.png';

function AddSessionTypePage() {
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
        <AddSessionTypeContainer/>
    </Flex>
  );
}

export default AddSessionTypePage;
