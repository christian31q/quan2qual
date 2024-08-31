import React from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CiSaveDown1 } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPower} from "react-icons/bs";
import InputHeader from './InputHeader'
import { useTranslation } from 'react-i18next';

function NavHeader({pageTitleText}){
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

    return(
        <HStack direction='row' spacing={{ base: "10px", md: "20px  ", lg: "2.5vmin" }} justifyContent='right' mt='1vh' mr='3vh'>
            {/*<InputHeader pageTitle={pageTitle}/>*/}
            <Text fontSize='1.2vw' mr='25vw'>
              {pageTitleText}
            </Text>
            <Button 
              rightIcon={<CiSaveDown1 fontSize='1.8vw' />} 
              w='8.5vw' 
              h='2vw' 
              bg='#272F34' 
              color='white' 
              variant='solid'
              fontSize='1.2vw'
              _hover={{bg: '#9F9F9F', color:'black'}}
            >
              Guardar
            </Button>
            <Button 
              rightIcon={<AiOutlineLogout fontSize='1.5vw'/>} 
              w='8.5vw' 
              h='2vw' 
              bg='#272F34' 
              color='white' 
              variant='solid'
              fontSize='1.2vw'
              _hover={{bg: '#9F9F9F', color:'black'}}
              isDisabled
            >
              Exportar
            </Button>
            <Button 
              rightIcon={<BsPower fontSize='1.6vw'/>} 
              w='8.5vw' 
              h='2vw' 
              bg='#272F34' 
              color='white' 
              variant='solid'
              fontSize='1.2vw'
              _hover={{bg: 'red.600', color: 'black'}}
              onClick={handleLogout}
            >
              {t('logOut')}
            </Button>
          </HStack>
    );

}

export default NavHeader;