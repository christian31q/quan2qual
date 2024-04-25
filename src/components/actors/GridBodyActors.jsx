import React, { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import ActorCard from './ActorCard';

const GridBodyActors = () => {
  const [actors, setActors] = useState([]);

  // Función para cargar actores desde el almacenamiento local
  const loadActors = () => {
    const storedActors = JSON.parse(localStorage.getItem('actors'));
    if (storedActors) {
      setActors(storedActors);
    }
  };

  useEffect(() => {
    // Cargar actores al montar el componente
    loadActors();
  }, []);

  // Manejar el evento de agregar un nuevo actor
  useEffect(() => {
    const handleNewActor = (event) => {
      const { detail } = event;
      setActors((prevActors) => {
        const updatedActors = [...prevActors, detail];
        localStorage.setItem('actors', JSON.stringify(updatedActors)); // Guardar en el almacenamiento local
        return updatedActors;
      });
    };

    document.addEventListener('newActor', handleNewActor);

    return () => {
      document.removeEventListener('newActor', handleNewActor);
    };
  }, []);
 
  // Manejar el evento de editar un actor
  useEffect(() => {
    const handleEditActor = (event) => {
      const { id, editedName, editedColor } = event.detail;
      setActors((prevActors) => {
        return prevActors.map((actor) => {
          if (actor.id === id) {
            return { ...actor, name: editedName, color: editedColor };
          }
          return actor;
        });
      });
    };
  
    document.addEventListener('editActor', handleEditActor);
  
    return () => {
      document.removeEventListener('editActor', handleEditActor);
    };
  }, []);

    // Manejar el evento de eliminar un actor
    useEffect(() => {
      const handleDeleteActor = (event) => {
        const { detail } = event;
        setActors((prevActors) => {
          return prevActors.filter((actor) => actor.id !== detail);
        });
      };
    
      document.addEventListener('deleteActor', handleDeleteActor);
    
      return () => {
        document.removeEventListener('deleteActor', handleDeleteActor);
      };
    }, []); 
  

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
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </Grid>
  );
};

export default GridBodyActors;
