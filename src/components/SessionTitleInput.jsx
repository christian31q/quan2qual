import React from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';

function SessionTitleInput({ value, onChange, isInvalid, errorMessage }) {
  const {t} = useTranslation();

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel></FormLabel>
      <Input
        type="text"
        w="37.5625rem"
        h="3rem"
        bg="white"
        textAlign="center"
        placeholder={t('addSessionTitleInput')}
        _placeholder={{ color: '#3450E2' }}
        mb="1.19rem"
        fontSize="1.25rem"
        shadow="lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}

export default SessionTitleInput;

