import React from 'react';
import {background, Flex } from '@chakra-ui/react';
import DashboardContainer from '../container/DashboardContainer';
import loginImage from '../assets/logoUMNG.png';

function DashboardPage() {
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
        <DashboardContainer />
      </Flex>
    );
  }

  export default DashboardPage;