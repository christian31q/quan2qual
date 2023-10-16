import React from 'react';
import { Box } from '@chakra-ui/react';
import CreateProjectContent from '../components/CreateProjectContent';

function CreateProjectContainer() {
  return (
    <Box
      p="6"
      bg="#D05543"
      borderRadius="md"
      boxShadow="lg"
      w="26.25rem"
      textAlign="center"
    >
      <CreateProjectContent />
    </Box>
  );
}

export default CreateProjectContainer;
