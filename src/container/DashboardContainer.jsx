import React from 'react';
import { Box, Center, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import WelcomeMessage from '../components/WelcomeMessage';
import ActionButtonIcon from '../components/ActionButtonIcon';
import LogoutButton from '../components/LogoutButton';
import { LiaPlusCircleSolid, LiaArrowCircleUpSolid } from "react-icons/lia";
//import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function DashboardContainer() {
  const {t} = useTranslation();
 
  return (
    <Center>
      <Box p="6" bg="gray.300" borderRadius="md" boxShadow="lg" w="46.875rem" h="34.8125em" textAlign="center">
        <WelcomeMessage username={t('username')} />
        <VStack spacing="5.75rem">
          <ActionButtonIcon
            text={t('newProject')}
            icon={<LiaPlusCircleSolid 
            size="2.1875rem" />} 
            color="white"
            link= "/createProject"
          />
          <ActionButtonIcon 
            text={t('openProject')}
            icon={<LiaArrowCircleUpSolid 
            size="2.18755rem" />} 
            color="white" 
            link="/openProjects"
          />
        <LogoutButton />
        </VStack>
      </Box>
    </Center>
  );
}

export default DashboardContainer;
