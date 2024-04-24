import React, { useState } from 'react';
import { Text, Icon, IconButton } from '@chakra-ui/react';
import { LuTableProperties } from "react-icons/lu";
import { IoMdAddCircleOutline } from "react-icons/io";
import LiveBoxTypes from '../LiveBoxTypes';


const HeaderTableTypes = () => {
  const [isLiveBoxTypesOpen, setLiveBoxTypesOpen] = useState(false);

  const handleTypesIconClick = () => {
    setLiveBoxTypesOpen(true);
  };

  const handleCloseLiveBoxTypes = () => {
    setLiveBoxTypesOpen(false);
  };
    return (
      <>
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
          Tipos de relaciones
          <IconButton
            colorScheme='green'
            aria-label='create actor'
            fontSize='35px'
            icon={<IoMdAddCircleOutline />}
            onClick={handleTypesIconClick}
          />
          <Icon as={LuTableProperties} fontSize='1.5vw' />
        </Text>
        <LiveBoxTypes isOpen={isLiveBoxTypesOpen} onClose={handleCloseLiveBoxTypes} />
      </>
    );
  };

export default HeaderTableTypes;