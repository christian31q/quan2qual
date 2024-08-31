import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
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
  );
}

export default LogoutButton;

