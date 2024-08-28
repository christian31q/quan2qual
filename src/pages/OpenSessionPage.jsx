import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, HStack } from '@chakra-ui/react';
import OpenSessionContainer from '../container/OpenSessionContainer';
import loginImage from '../assets/logoUMNG.png';

function OpenSessionPage(){
    const backgroundImageStyle = {
        backgroundSize: '30%',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat'
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