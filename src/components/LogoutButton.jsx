import React from 'react';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <Button 
      textDecorationLine="underline"
      variant="ghost"
      color="#3450E2"
      fontWeight="700"
      fontSize="1.5625rem"
      lineHeight="normal"
      fontFamily="Optima LT Pro"
      onClick={logout}
    >
      {t('logOut')}
    </Button>
  );
}

export default LogoutButton;

