import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, HStack } from '@chakra-ui/react';
import OpenSessionContainer from '../container/OpenSessionContainer';
import loginImage from '../assets/Trama.png';

function OpenSessionPage(){
    const backgroundImageStyle = {
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      };
    return(
        <Flex
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            backgroundImage={loginImage}
            style={backgroundImageStyle}
        >
            <OpenSessionContainer/>
        </Flex>
    );
}

export default OpenSessionPage;