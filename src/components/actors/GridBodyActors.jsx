import React from 'react';
import { Grid } from '@chakra-ui/react';
import ActorCard from './ActorCard';

const GridBodyActors = ({ actors, handleDragStart }) => {

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={4}
      overflowY="auto"
      maxHeight="52.2vh"
      width="100%"
      autoRows="minmax(100px, auto)"
    >
      {actors.map((actor) => (
        <ActorCard
          key={actor._id}
          actor={actor}
          draggable
          onDragStart={(e) => {
            if (actor._id) { // Asegurarse de que el ID está disponible
              handleDragStart(e, actor._id); // Asignar actorId
            } else {
              console.error("Actor ID is not available."); // Depuración
            }
          }}
        />
      ))}
    </Grid>
  );
};

export default GridBodyActors;