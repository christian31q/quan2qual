import React, { useState } from 'react';
import {
  HStack, Button, Text, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, Spinner, Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CiSaveDown1 } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPower, BsCheckCircle } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

function NavHeader({ pageTitleText }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSaving, setIsSaving] = useState(true);  // Para guardar y logout
  const [modalType, setModalType] = useState('save');  // 'save' o 'logout'
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);  // Solo para confirmar logout

  // Función para manejar el modal de "Guardar"
  const handleSave = () => {
    setModalType('save');  // Cambiar el tipo de modal a 'save'
    onOpen();
    setIsSaving(true);

    // Simular el guardado
    setTimeout(() => {
      setIsSaving(false);  // Mostrar la confirmación (paloma)
    }, 1500); 

    setTimeout(() => {
      onClose(); 
    }, 3000); 
  };

  // Función para confirmar logout
  const handleLogoutConfirm = () => {
    setIsSaving(true);  // Mostrar spinner
    setIsConfirmingLogout(false);  // Cambiar a spinner

    // Simular el proceso de logout
    setTimeout(() => {
      sessionStorage.removeItem('isAuthenticated');  // Limpiar la sesión
      setIsSaving(false);  // Mostrar paloma de confirmación
    }, 1500); 

    setTimeout(() => {
      onClose(); 
      navigate('/login');  // Redirigir al login después de cerrar el modal
    }, 3000); 
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setModalType('logout');  // Cambiar el tipo de modal a 'logout'
    onOpen();
    setIsSaving(false);  // No mostrar el spinner inmediatamente
    setIsConfirmingLogout(true);  // Mostrar confirmación antes del spinner
  };

  // Función para cancelar el logout
  const handleCancelLogout = () => {
    onClose(); 
  };

  return (
    <>
      <HStack direction='row' spacing={{ base: "10px", md: "20px", lg: "2.5vmin" }} justifyContent='right' mt='1vh' mr='3vh'>
        <Text fontSize='1.2vw' mr='25vw'>
          {pageTitleText}
        </Text>
        <Button
          rightIcon={<CiSaveDown1 fontSize='1.8vw' />}
          w='8.5vw'
          h='2vw'
          bg='#272F34'
          color='white'
          variant='solid'
          fontSize='1.2vw'
          _hover={{ bg: '#9F9F9F', color: 'black' }}
          onClick={handleSave}
        >
          {t('saveButton')}
        </Button>
        <Button
          rightIcon={<AiOutlineLogout fontSize='1.5vw' />}
          w='8.5vw'
          h='2vw'
          bg='#272F34'
          color='white'
          variant='solid'
          fontSize='1.2vw'
          _hover={{ bg: '#9F9F9F', color: 'black' }}
          isDisabled
        >
          {t('exportButton')}
        </Button>
        <Button
          rightIcon={<BsPower fontSize='1.6vw' />}
          w='10vw'
          h='2vw'
          bg='#272F34'
          color='white'
          variant='solid'
          fontSize='1.2vw'
          _hover={{ bg: 'red.600', color: 'black' }}
          onClick={handleLogout} 
        >
          {t('logOut')}
        </Button>
      </HStack>

      {/* Modal de guardado o logout */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#272F34" color="white" textAlign="center">
          <ModalHeader>
            {modalType === 'save'
              ? (isSaving ? t('popupSaving') : t('popupSavingComplete'))  // Guardar
              : (isSaving ? t('loggingOut') : t('logOutComplete'))  // Logout
            }
          </ModalHeader>
          <ModalBody>
            {modalType === 'save' ? (
              isSaving ? (
                <Spinner size="xl" color="green.500" />  // Mostrar spinner mientras guarda
              ) : (
                <Icon as={BsCheckCircle} w={16} h={16} color="green.400" />  // Mostrar la paloma después de guardar
              )
            ) : (
              isSaving ? (
                <Spinner size="xl" color="green.500" />  // Spinner durante logout
              ) : (
                isConfirmingLogout ? (
                  <Text>
                    {t('areYouSure')}  
                  </Text>
                ) : (
                  <Icon as={BsCheckCircle} w={16} h={16} color="green.400" />  // Paloma de confirmación después del logout
                )
              )
            )}
          </ModalBody>
          <ModalFooter>
            {modalType === 'logout' && isConfirmingLogout && (
              <>
                <Button colorScheme='blue' mr={3} onClick={handleCancelLogout}>
                  {t('cancel')}
                </Button>
                <Button colorScheme="red" mr={3} onClick={handleLogoutConfirm}>
                  {t('logOut')}
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NavHeader;