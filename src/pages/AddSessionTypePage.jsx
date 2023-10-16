import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, HStack } from '@chakra-ui/react';
import AddSessionTypeContainer from '../container/AddSessionTypeContainer';
import loginImage from '../assets/Trama.png';

function AddSessionTypePage() {
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
        <AddSessionTypeContainer/>
    </Flex>
    
  );
}

export default AddSessionTypePage;
