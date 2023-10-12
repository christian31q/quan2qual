import React from 'react';
import {Flex } from '@chakra-ui/react';
import DashboardContainer from '../container/DashboardContainer';
import loginImage from '../assets/Trama.png';

function DashboardPage() {
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
        <DashboardContainer />
      </Flex>
    );
  }

  export default DashboardPage;