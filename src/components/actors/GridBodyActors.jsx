import React from 'react';
import { Grid } from '@chakra-ui/react';
import ActorCard from './ActorCard';

const GridBodyActors = ({ data, handleEdit, handleDelete }) => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={4}
      overflowY="auto"
      maxHeight="52.2vh"
      width="100%"
      autoRows="minmax(100px, auto)"
    >
      {data.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </Grid>
  );
};

export default GridBodyActors;

