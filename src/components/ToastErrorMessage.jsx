import React from 'react';
import { useToast } from '@chakra-ui/react';

function ToastErrorMessage({ errorMessage }) {
  const toast = useToast();

  React.useEffect(() => {
    // Mostrar un mensaje de error con el texto proporcionado
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }, [toast, errorMessage]);

  // Devolver null ya que este componente no renderiza nada en la interfaz de usuario
  return null;
}

export default ToastErrorMessage;