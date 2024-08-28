import React from 'react';
import { Center, Flex } from '@chakra-ui/react';
import CreateProjectContainer from '../container/CreateProjectContainer';
import loginImage from '../assets/logoUMNG.png';

function CreateProjectPage() {
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
        <Center minH="100vh">   
            <CreateProjectContainer />
        </Center>
    </Flex>
  );
}

export default CreateProjectPage;
