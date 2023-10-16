import React from 'react';
import { Center, Flex } from '@chakra-ui/react';
import CreateProjectContainer from '../container/CreateProjectContainer';
import loginImage from '../assets/Trama.png';

function CreateProjectPage() {
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
        <Center minH="100vh">   
            <CreateProjectContainer />
        </Center>
    </Flex>
  );
}

export default CreateProjectPage;
