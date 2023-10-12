import React from 'react';
import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react';
import WelcomeMessage from '../components/WelcomeMessage';
import ActionButton from '../components/ActionButton';
import LogoutButton from '../components/LogoutButton';
import { LiaPlusCircleSolid, LiaArrowCircleUpSolid } from "react-icons/lia";

function DashboardContainer() {
  return (
    <Center>
      <Box p="6" bg="#D05543" borderRadius="md" boxShadow="lg" w="46.875rem" h="34.8125em" textAlign="center">
        <WelcomeMessage username="Nombre de Usuario" />
        <ActionButton text="Nuevo Proyecto" icon={<LiaPlusCircleSolid size="2.1875rem" />} color="white" />
        <ActionButton text="Cargar Proyecto" icon={<LiaArrowCircleUpSolid size="2.18755rem" />} color="white" />
        <LogoutButton />
      </Box>
    </Center>
  );
}

export default DashboardContainer;
