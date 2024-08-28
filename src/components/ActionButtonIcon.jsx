import React from 'react';
import { Button, Text, Flex, Icon, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ActionButton({ text, icon, color, link }) {
  return (
    <Center>
      <Link to={link} >
        <Button
          color={color}
          w="30.9375rem"
          h="3rem"
          bg="#173378"
          _hover={{ backgroundColor: 'gray.600' }}
          borderRadius="2xl"
          fontSize="1.5625rem"
          fontWeight="400"
          shadow="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pl="1rem"
          pr="1rem"
        >
          <Text 
            flex="1" 
            textAlign="center"
          >
            {text}
          </Text>
            {icon}
        </Button>
      </Link>
    </Center>
  );
}

export default ActionButton;


