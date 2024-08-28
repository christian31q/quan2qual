import React, { useState } from 'react';
import { Text, Icon, IconButton } from '@chakra-ui/react';
import { RiUser4Line } from 'react-icons/ri';
import { IoMdAddCircleOutline } from "react-icons/io";
import LiveBoxActors from '../LiveBoxActors';

const HeaderTableActors = () => {
  const [isLiveBoxActorsOpen, setLiveBoxActorsOpen] = useState(false);

  const handleActorsIconClick = () => {
    setLiveBoxActorsOpen(true);
  };

  const handleCloseLiveBoxActors = () => {
    setLiveBoxActorsOpen(false);
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
          bg='#173378'
          borderBottom='1px'
          fontWeight='400'
          pl='1vw'
          pr='1vw'
        >
          Actores
          <IconButton
            colorScheme='green'
            aria-label='create actor'
            fontSize='35px'
            icon={<IoMdAddCircleOutline />}
            onClick={handleActorsIconClick}
          />
          <Icon as={RiUser4Line} fontSize='1.5vw' />
        </Text>
        <LiveBoxActors isOpen={isLiveBoxActorsOpen} onClose={handleCloseLiveBoxActors} />
      </>
    );
  };

export default HeaderTableActors;