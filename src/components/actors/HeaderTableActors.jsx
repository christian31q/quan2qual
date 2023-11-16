import React from 'react';
import { Text, Icon } from '@chakra-ui/react';
import { RiUser4Line } from 'react-icons/ri';

const HeaderTableActors = () => {
    return (
      <Text
        display='flex'
        justifyContent='space-between'
        align='center'
        alignItems='center'
        fontSize="1.2vw"
        h='6.11vh'
        bg='#272F34'
        borderBottom='1px'
        fontWeight='400'
        pl='1vw'
        pr='1vw'
      >
        Actores
        <Icon as={RiUser4Line} fontSize='1.5vw' />
      </Text>
    );
  };

export default HeaderTableActors;