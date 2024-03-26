import React, { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import ActorCard from './ActorCard';

const GridBodyActors = () => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const storedActors = JSON.parse(localStorage.getItem('actors'));
    if (storedActors) {
      setActors(storedActors);
    }
  }, []);

  useEffect(() => {
    const handleNewActor = (event) => {
      const { detail } = event;
      setActors((prevActors) => [...prevActors, detail]);
    };
  
    document.addEventListener('newActor', handleNewActor);
  
    return () => {
      document.removeEventListener('newActor', handleNewActor);
    };
  }, []);

  const updateActors = (updatedActors) => {
    setActors(updatedActors);
  };

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
        <ActorCard key={actor.name} actor={actor} />
      ))}
    </Grid>
  );
};

export default GridBodyActors;
