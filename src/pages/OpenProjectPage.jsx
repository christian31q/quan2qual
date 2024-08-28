import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, HStack } from '@chakra-ui/react';
import OpenProjectContainer from '../container/OpenProjectContainer';
import loginImage from '../assets/logoUMNG.png';

function OpenProjectPage(){
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
            <OpenProjectContainer/>
        </Flex>
    );
}

export default OpenProjectPage;