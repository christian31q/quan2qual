import React from 'react';
import { GridItem, Icon, Box } from '@chakra-ui/react';
import { IconPickerItem } from 'react-icons-picker';

const ActorCard = ({ actor, onDragStart }) => {
  const { name, color, icon: iconName } = actor;

  return (
    <GridItem
      draggable // Permite que el elemento sea arrastrable
      onDragStart={onDragStart} // Manejador para el evento de inicio del arrastre
      display="flex"
      cursor="pointer"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      bg="transparent"
      borderRadius="lg"
      textAlign="center"
      position="relative"
      transition="transform 0.3s ease"
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      padding="12px"
    >
      {/* Icono */}
      <Icon
        width="50px"
        height="50px"
        backgroundColor={color}
        borderRadius="100%"
        position="relative"
        fontSize="60px"
        zIndex="1"
      >
        <IconPickerItem value={iconName} size={24} />
      </Icon>
      {/* Label */}
      <Box style={{ fontSize: '14px', fontWeight: '600', position: 'relative', zIndex: '0' }}>{name}</Box>
    </GridItem>
  );
};

export default ActorCard;
