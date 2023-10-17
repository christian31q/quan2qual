import React from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

function SessionTitleInput({ value, onChange, isInvalid, errorMessage }) {
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel></FormLabel>
      <Input
        type="text"
        w="37.5625rem"
        h="3rem"
        bg="white"
        textAlign="center"
        placeholder="Escriba el título de la sesión"
        _placeholder={{ color: 'rgba(4, 29, 57, 0.60)' }}
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

