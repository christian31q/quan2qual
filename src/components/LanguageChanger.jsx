import React from 'react';
import { Box, Button, Divider, HStack, Center, Text } from '@chakra-ui/react';
import { useTranslation, Trans } from 'react-i18next';

const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Spanish' }
  };

function LanguageChanger(){
    const { t, i18n } = useTranslation();
return(
    <Center>
          <Box 
            mt="3rem"
            h="6rem"
            bg="#c2c6cb" 
            p="0.5em" 
            borderRadius="md"
          >
            <Text fontWeight="700">
              {t('languageText')}
            </Text>
            <Divider mb="10px" mt="5px"/>
            <HStack>
            {Object.keys(lngs).map((lng) => (
              <Button
                _hover={{ backgroundColor: 'gray.400' }}
                key={lng}
                style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
                type="submit"
                onClick={() => i18n.changeLanguage(lng)}
              >
                {lngs[lng].nativeName}
              </Button>
            ))}
            </HStack>
          </Box>
    </Center>
    );
}

export default LanguageChanger;