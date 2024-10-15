import React from 'react';
import { Box, Center, Grid, Text } from '@chakra-ui/react';
import ActorCard from './ActorCard';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const GridBodyActors = ({ actors, handleDragStart }) => {
  const { t } = useTranslation();
  const { mediaType: urlMediaType } = useParams();
  const isAudio = urlMediaType === 'audio';

  return (
    <Box width='100%'>
      <Grid
        templateColumns={isAudio ? "repeat(8, 1fr)" : "repeat(3, 1fr)"}
        gap={4}
        overflowY="auto"
        maxHeight="52.2vh"
        width="100%"
        autoRows="minmax(100px, auto)"
      >
      {actors.map((actor) => (
        <ActorCard
          key={actor._id || actor.id}
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
        {actors.length == 0 && (
          <Box>
            <Text color="#173378" textAlign="center" width="100%" padding="2">
              {t('gridActorsText')}
            </Text>
          </Box>
        )}
    </Box>
  );
};

export default GridBodyActors;