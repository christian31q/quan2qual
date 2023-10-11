import React from 'react';
import { Image } from '@chakra-ui/react';

function Imagen({ src }) {
  return (
    <Image
      src={src}
      alt="Imagen de inicio de sesión"
      maxH={{ base: 'auto', md: '100vh' }}
      flex={{ base: 'none', md: 2 }}
      marginRight={{ base: '0', md: '6.75rem' }}
    />
  );
}
export default Imagen;
