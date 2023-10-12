import React from 'react';
import { Text } from '@chakra-ui/react';

function WelcomeMessage({ username }) {
  return (
    <Text 
        fontSize="2.5rem" 
        fontWeight="700" 
        mt="4.06rem" 
        mb="2.06rem"
        fontFamily="Optima LT Pro" 
        color="#041D39"
    >
        Bienvenido, {username}
    </Text>
  );
}

export default WelcomeMessage;
