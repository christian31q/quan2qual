import React, { useState } from 'react';
import { Text, Icon, IconButton } from '@chakra-ui/react';
import { TbCirclesRelation } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const HeaderTableRelations = ({ activateRelationMode, isCreatingRelation }) => {
  const { t } = useTranslation();
  const [isRelationModeActive, setIsRelationModeActive] = useState(false);
  
  // Función para alternar el estado del modo de relación
  const toggleRelationMode = () => {
    activateRelationMode(!isCreatingRelation);  // Cambia el estado global al alternar
  };

    return (
      <>
        <Text
          display='flex'
          justifyContent='space-between'
          align='center'
          alignItems='center'
          fontSize="1.2vw"
          h='6.11vh'
          bg='#173378'
          borderBottom='1px'
          fontWeight='400'
          pl='1vw'
          pr='1vw'
        >
          {t('relationsWord')}
          <IconButton
            colorScheme={isCreatingRelation ? 'red' : 'green'}  // Cambiar el color del botón según el estado global
            aria-label='toggle relation mode'
            fontSize='35px'
            icon={
              <IoMdAddCircleOutline
                style={{
                  transform: isCreatingRelation ? 'rotate(45deg)' : 'rotate(0deg)',  // Girar el ícono cuando esté activo
                  transition: 'transform 0.3s ease-in-out',  
                }}
              />
            }
            onClick={toggleRelationMode}  // Alternar el modo relación
          />
          <Icon as={TbCirclesRelation} fontSize='1.5vw' />
        </Text>
      </>
    );
  };

export default HeaderTableRelations;