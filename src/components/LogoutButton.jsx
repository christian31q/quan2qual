import React, { useState } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalCloseButton, Spinner, Icon, useDisclosure,
} from '@chakra-ui/react';
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggingOut, setIsLoggingOut] = useState(true);  // Estado para el proceso de logout

  const handleLogout = () => {
    onOpen();  
    setIsLoggingOut(true);

    // Simular el proceso de logout
    setTimeout(() => {
      sessionStorage.removeItem('isAuthenticated');  // Eliminar la sesión
      setIsLoggingOut(false);  // Mostrar la paloma de confirmación
    }, 1500);  

    setTimeout(() => {
      onClose();  
      navigate('/login');  
    }, 3000);  
  };

  return (
    <>
      <Button
        textDecorationLine="underline"
        variant="ghost"
        color="#041D39"
        fontWeight="700"
        fontSize="1.5625rem"
        lineHeight="normal"
        fontFamily="Optima LT Pro"
        onClick={handleLogout}
      >
        {t('logOut')}
      </Button>

      {/* Modal de logout */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#272F34" color="white" textAlign="center">
          <ModalHeader>
            {isLoggingOut ? t('loggingOut') : t('logOutComplete')} 
          </ModalHeader>
          <ModalBody>
            {isLoggingOut ? (
              <Spinner size="xl" color="green.500" />
            ) : (
              <Icon as={BsCheckCircle} w={16} h={16} color="green.400" />  
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogoutButton;

