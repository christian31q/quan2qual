/*import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

function ProjectCard({ project, onOpen }) {
  return (
    <Box
      p={4}
      bg="white"
      shadow="md"
      borderRadius="lg"
      w="300px"
    >
      {/* Icono }
      <Text fontSize="3xl" mb={2}>
        Icono
      </Text>
      {/* Título del proyecto }
      <Text fontWeight="bold">{project.title}</Text>
      {/* Fecha de creación }
      <Text fontSize="sm">Fecha de creación: {project.creationDate}</Text>
      {/* Botón "Abrir" }
      <Button
        colorScheme="blue"
        onClick={() => onOpen(project.id)} // Llama a una función para abrir el proyecto
      >
        Abrir
      </Button>
    </Box>
  );
}

export default ProjectCard;
*/

//Parte de cambiar icono según el tipo de archivo

/*import React from 'react';
import { Box, Text, Button, Center } from '@chakra-ui/react';

function ProjectCard({ project, onOpen }) {
  const isVideo = project.type === 'video';
  const isImage = project.type === 'image';
  const isAudio = project.type === 'audio';

  let iconSrc = '';

  if (isVideo) {
    iconSrc = 'URL_DEL_ICONO_DE_VIDEO';
  } else if (isImage) {
    iconSrc = 'URL_DEL_ICONO_DE_IMAGEN';
  } else if (isAudio) {
    iconSrc = 'URL_DEL_ICONO_DE_AUDIO';
  } else {
    // Icono por defecto o mensaje de error
    iconSrc = 'URL_DEL_ICONO_POR_DEFECTO_O_MENSAJE_DE_ERROR';
  }

  return (
    <Box
      p={4}
      bg="#E98643"
      shadow="md"
      borderRadius="lg"
      w="15.4375rem"
      h="12.4375rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img src={iconSrc} alt="Icono de sesión" />

      <Text
        color="#041D39"
        fontSize="1.2rem"
        fontStyle="normal"
        fontWeight="700"
      >
        {project.title}
      </Text>

      <Text
        color="#041D39"
        fontSize="0.8rem"
        fontStyle="normal"
        fontWeight="400"
      >
        {project.creationDate}
      </Text>

      <Button
        w="8rem"
        h="1.7rem"
        bg="#041D39"
        color="white"
        fontSize="1rem"
        fontWeight="400"
        shadow="lg"
        mt="1rem"
        _hover={{ backgroundColor: 'gray.600' }}
        onClick={() => onOpen(project.id)}
      >
        Abrir
      </Button>
    </Box>
  );
}

export default ProjectCard;

*/

/*import React from 'react';
import { Box, Text, Button, Center, HStack } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';

function ProjectCard({ project, onOpen }) {
    const {t} = useTranslation();

  return (
    <Box
      p={4}
      bg="#E98643"
      shadow="md"
      borderRadius="lg"
      w="15.4375rem"
      h="12.4375rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text>
        <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
          <path d="M11.8332 59.1668C10.2061 59.1668 8.81272 58.587 7.65305 57.4273C6.49338 56.2677 5.91454 54.8753 5.91651 53.2502V17.7502C5.91651 16.1231 6.49634 14.7297 7.65601 13.57C8.81568 12.4104 10.2081 11.8315 11.8332 11.8335H29.5832L35.4998 17.7502H59.1665C60.7936 17.7502 62.187 18.33 63.3466 19.4897C64.5063 20.6493 65.0851 22.0417 65.0832 23.6668V53.2502C65.0832 54.8773 64.5033 56.2706 63.3437 57.4303C62.184 58.59 60.7916 59.1688 59.1665 59.1668H11.8332Z" fill="#041D39" />
        </svg>
      </Text>
      <Text
        color="#041D39"
        fontSize="1.2rem"
        fontStyle="normal"
        fontWeight="700"
      >
        {/*{project.title}}
        /*Project title
      </Text>
      <Text
        color="#041D39"
        fontSize="0.8rem"
        fontStyle="normal"
        fontWeight="400"
      >
        {/*{project.creationDate}}
        /*Creation date
      </Text>
      <Button
        w="8rem"
        h="1.7rem"
        bg="#041D39"
        color="white"
        fontSize="1rem"
        fontWeight="400"
        shadow="lg"
        mt="1rem"
        _hover={{ backgroundColor: 'gray.600' }}
        //onClick={() => onOpen(project.id)}
      >
        {t('openButton')}
      </Button>
    </Box>
  );
}

export default ProjectCard;*/

// ProjectCard.jsx

import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

function ProjectCard({ icon, title, creationDate, project, onOpen }) {
  const {t} = useTranslation();

  return (
    <Box
      p={4}
      bg="#E98643"
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
      <Text color="#041D39" fontSize="1.2rem" fontStyle="normal" fontWeight="700">
        {/*{project.title}*/}
        {title}
      </Text>
      <Text color="#041D39" fontSize="0.8rem" fontStyle="normal" fontWeight="400">
        {/*{project.creationDate}*/}
        {creationDate}
      </Text>
      <Link to="/openSessions">
        <Button
          w="8rem"
          h="1.7rem"
          bg="#041D39"
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

