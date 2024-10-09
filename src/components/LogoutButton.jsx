import React, { useState } from 'react';
import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, ModalCloseButton, Spinner, Icon, useDisclosure, Text
} from '@chakra-ui/react';
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggingOut, setIsLoggingOut] = useState(false);  // Estado para mostrar el spinner o la confirmación
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(true);  // Estado para la confirmación

  const handleLogout = () => {
    setIsConfirmingLogout(false);  // Pasamos a la animación de cierre de sesión
    setIsLoggingOut(true);  // Mostrar el spinner

    // Simular el proceso de logout
    setTimeout(() => {
      sessionStorage.removeItem('isAuthenticated');  // Eliminar la sesión
      setIsLoggingOut(false);  // Mostrar la paloma de confirmación
    }, 1500);  // Esperar 1.5 segundos

    setTimeout(() => {
      onClose();  // Cerrar el modal
      navigate('/login');  // Redirigir al login después de cerrar el modal
    }, 3000);  // Redirigir después de 3 segundos
  };

  const handleCancelLogout = () => {
    setIsConfirmingLogout(true);  // Volvemos al estado inicial de confirmación
    onClose();  // Cerrar el modal
  };

  const openLogoutModal = () => {
    setIsConfirmingLogout(true);  // Reiniciar el estado para la confirmación
    setIsLoggingOut(false);  // Reiniciar el estado para el spinner
    onOpen();  // Abrir el modal
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
        onClick={openLogoutModal}  // Abre el modal de confirmación
      >
        {t('logOut')}
      </Button>

      {/* Modal de confirmación y logout */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#272F34" color="white" textAlign="center">
          <ModalHeader>
            {isLoggingOut
              ? t('loggingOut')  // Texto mientras se cierra sesión
              : (isConfirmingLogout ? t('confirmLogOut') : t('logOutComplete'))} 
          </ModalHeader>
          {!isLoggingOut && <ModalCloseButton />}
          <ModalBody>
            {isLoggingOut ? (
              <Spinner size="xl" color="green.500" />  
            ) : (
              isConfirmingLogout ? (
                <Text>{t('areYouSure')}</Text>  // Texto de confirmación
              ) : (
                <Icon as={BsCheckCircle} w={16} h={16} color="green.400" />  
              )
            )}
          </ModalBody>
          {/* Footer con botones de confirmación o cerrando sesión */}
          {!isLoggingOut && (
            <ModalFooter>
              {isConfirmingLogout ? (
                <>
                  <Button colorScheme='blue' mr={3} onClick={handleCancelLogout}>
                    {t('cancel')}
                  </Button>
                  <Button colorScheme="red" mr={3} onClick={handleLogout}>
                    {t('logOut')}
                  </Button>
                </>
              ) : null}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogoutButton;
