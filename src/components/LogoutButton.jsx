import React from 'react';
import { Button } from '@chakra-ui/react';

function LogoutButton() {
  return (
    <Button 
        textDecorationLine="underline"
        variant="ghost"
        color="#041D39"
        fontWeight="700"
        fontSize="1.5625rem"
        lineHeight="normal"
        fontFamily="Optima LT Pro"
    >
        Cerrar Sesión
    </Button>
  );
}

export default LogoutButton;
