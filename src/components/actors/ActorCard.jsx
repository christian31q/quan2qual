import React from 'react';
import { GridItem, Icon } from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';

import { IconPickerItem } from 'react-icons-picker'
import { icon } from '@fortawesome/fontawesome-svg-core';

const ActorCard = ({ actor, handleEdit, handleDelete }) => {
  const { name, color, icon: iconName } = actor;

  return (
    <GridItem 
      display="flex" 
      cursor="pointer"
      flexDirection="column" 
      justifyContent="space-evenly" 
      alignItems="center" 
      bg="#272F34" 
      borderRadius="lg" 
      textAlign="center"
      position="relative"
      transition="transform 0.3s ease"  
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}      
    >
      {/* Icono */}
      <Icon
        bg={color} 
        borderRadius="100%" 
        position="relative"
        fontSize="60px"
        zIndex="1"
      >
        <IconPickerItem 
          value={iconName}
          size={24}
        />
      </Icon>
      {/* Label */}
      <div style={{ position: 'relative', zIndex: '0' }}>{name}</div>
    </GridItem>
  );
};

export default ActorCard;


