import React from 'react';
import { Button, Text, Flex, Icon, Center } from '@chakra-ui/react';

function ActionButton({ text, icon, color }) {
  return (
    <Center>
    <Button
      color={color}
      w="30.9375rem"
      h="3rem"
      bg="#041D39"
      _hover={{ backgroundColor: 'gray.600' }}
      borderRadius="2xl"
      fontSize="1.5625rem"
      fontWeight="400"
      mb="5.7rem"
      shadow="lg"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pl="1rem"
      pr="1rem"
    >
      <Text flex="1" textAlign="center">{text}</Text>
      {icon}
    </Button>
    </Center>
  );
}

export default ActionButton;


