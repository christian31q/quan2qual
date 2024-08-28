import React from 'react';
import { Box, Center, Text, Spinner, keyframes, Container, shouldForwardProp, chakra } from '@chakra-ui/react';
import loginImage from '../assets/Fondo.png';
import { motion, isValidMotionProp } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';


const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });
function LoadingPage() {
  const {t} = useTranslation();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgImage={loginImage}
      bgSize="45%"
      bgRepeat='no-repeat'
      bgPosition="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
        <Container h="100vh" display="flex" alignItems="center" justifyContent="center">
      <ChakraBox
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        padding="2"
        bgGradient="linear(to-l, #E98643, #D05543)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100px"
        height="100px"
      >
        {t('loading')}
      </ChakraBox>
    </Container>
    </Box>
  );
}

export default LoadingPage;