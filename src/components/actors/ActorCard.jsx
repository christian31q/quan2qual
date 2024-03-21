import React from 'react';
import { GridItem, Icon } from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';

const ActorCard = ({ actor, handleEdit, handleDelete }) => {
  const { id, label, color, icon: IconComponent } = actor;

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
        as={IconComponent} 
        bg={color} 
        borderRadius="100%" 
        fontSize="60px" 
        position="relative"
        zIndex="1"           
      />
      
      {/* Label */}
      <div style={{ position: 'relative', zIndex: '0' }}>{label}</div>
    </GridItem>
  );
};

export default ActorCard;


