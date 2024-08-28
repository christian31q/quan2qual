import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

function ProjectCard({ icon, title, creationDate, project, onOpen }) {
  const {t} = useTranslation();

  return (
    <Box
      p={4}
      bg="white"
      shadow="md"
      borderRadius="lg"
      w="15.4375rem"
      h="12.4375rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {icon}
      <Text color="#173378" fontSize="1.2rem" fontStyle="normal" fontWeight="700">
        {/*{project.title}*/}
        {title}
      </Text>
      <Text color="#173378" fontSize="0.8rem" fontStyle="normal" fontWeight="400">
        {/*{project.creationDate}*/}
        {creationDate}
      </Text>
      <Link to="/openSessions">
        <Button
          w="8rem"
          h="1.7rem"
          bg="#173378"
          color="white"
          fontSize="1rem"
          fontWeight="400"
          shadow="lg"
          mt="1rem"
          _hover={{ backgroundColor: 'gray.600' }}
          //onClick={onOpen}
        >
        {t('openButton')}
      </Button>
      </Link>
    </Box>
  );
}

export default ProjectCard;

