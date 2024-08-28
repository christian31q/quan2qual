import React from 'react';
import { Text, Icon, IconButton } from '@chakra-ui/react';
import { TbCirclesRelation } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";


const HeaderTableRelations = () => {
    return (
      <>
        <Text
          display='flex'
          justifyContent='space-between'
          align='center'
          alignItems='center'
          fontSize="1.2vw"
          h='6.11vh'
          bg='#173378'
          borderBottom='1px'
          fontWeight='400'
          pl='1vw'
          pr='1vw'
        >
          Relaciones
          <IconButton
            colorScheme='green'
            aria-label='create actor'
            fontSize='35px'
            icon={<IoMdAddCircleOutline />}
          />
          <Icon as={TbCirclesRelation} fontSize='1.5vw' />
        </Text>
      </>
    );
  };

export default HeaderTableRelations;