import React from 'react';
import { Box, VStack, Icon } from '@chakra-ui/react';

function NavLeftButtons({icon, iconSize, buttonText}){
    return (
    <Box
        as='button'
        width="5.9vw"
        height='auto'
        lineHeight='1.2'
        transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
        border='1px'
        px='8px'
        borderRadius='2px'
        fontSize={{ base: "2.2vmin", md: "2.2vmin", lg: "1.9vmin" }}
        fontWeight='400'
        bg='transparent'
        borderColor='transparent'
        color='#D25644'
        _hover={{ bg: 'transparent', color:'white', fill:'white'}}
        _active={{
        bg: '#dddfe2',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
        }}
        _focus={{
        boxShadow:
            '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            color:'white',
        }}
    >
        <VStack spacing={0} alignItems="center">
            <Icon as={icon} fontSize={iconSize}/>
        </VStack>
        {buttonText}
    </Box>
    );
}

export default NavLeftButtons;
