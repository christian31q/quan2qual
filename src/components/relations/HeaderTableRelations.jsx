import React from 'react';
import { Text, Icon } from '@chakra-ui/react';
import { TbCirclesRelation } from "react-icons/tb";


const HeaderTableRelations = () => {
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
        Relaciones
        <Icon as={TbCirclesRelation} fontSize='1.5vw' />
      </Text>
    );
  };

export default HeaderTableRelations;