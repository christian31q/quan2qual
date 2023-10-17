import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function LogoutButton() {
  const {t} = useTranslation();

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
      <Link to="/login">{t('logOut')}</Link>
    </Button>
  );
}

export default LogoutButton;
