import React, { useRef, useState, useEffect } from 'react';
import { Grid, GridItem, Box, HStack, Button, VStack, Text, Center } from '@chakra-ui/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import NavLeftTools from '../container/NavLeftToolsContainer';
import InputHeader from '../components/InputHeader'
import NavHeader from '../components/NavHeader'
import FileUploadSection from '../components/FileUploadSection'
import ImageUploadSection from '../components/ImageUploadSection';
import VideoControls from '../components/VideoControls';
//import AudioWaveform from '../components/AudioWaveform'; // Nuevo componente para manejar onda de audio

import HeaderTableActors from '../components/actors/HeaderTableActors';
import HeaderLabelsActors from '../components/actors/HeaderLabelsActors';
import TableBodyActors from '../components/actors/TableBodyActors'

import HeaderTableTypes from '../components/types relations/HeaderTableTypes';
import HeaderLabelsTypes from '../components/types relations/HeadeLabelsTypes';
import TableBodyTypes from '../components/types relations/TableBodyTypes';

import HeaderTableRelations from '../components/relations/HeaderTableRelations';
import HeaderLabelsRelations from '../components/relations/HeaderLabelsRelations';

import CardTimeLine from '../components/CardTimeLine';
import Timeline from '../components/TimeLine';
import ImageTimeline from '../components/ImageTimeLine';
import '../styles/HandleStyles.css'

import { getSessionFromDB } from '../utils/mongoUtils';
import { useParams, useSearchParams } from 'react-router-dom';

function SessionPage({ pageTitle }) {
  const {t} = useTranslation();
  const { mediaType: urlMediaType } = useParams(); // Util por si el usuario modifica el URL
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  //console.log('Media URL type: ', urlMediaType); 

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actors, setActors] = useState([]);
  const [types, setTypes] = useState([]);

  // Estado para las imágenes
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [actorsPerImage, setActorsPerImage] = useState({});

  // Estado para el Video
  const mediaRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Estado para que herramienta está abierta 
  const [activeLiveBox, setActiveLiveBox] = useState('Actors');

  // Estado para el modo relacionar activo 
  const [isCreatingRelation, setIsCreatingRelation] = useState(false);

  console.log('Relation mode: ', isCreatingRelation);

  const activateRelationMode = () => {
    setIsCreatingRelation(true);
  };

  // Manejo del cambio de imagen activa desde el timeline
  const handleImageChange = (index) => {
    console.log(`Imagen activa cambiada a índice: ${index}`);
    setCurrentImageIndex(index);
    setCurrentImage(selectedImages[index]);
    setIsCreatingRelation(false);
  };

  useEffect(() => {
    if (!sessionId) return;
    
    const fetchSession = async () => {
      try {
        setLoading(true);
        const session = await getSessionFromDB(sessionId); // Obtiene la sesión desde la DB
        if (session) {
          setSessionData(session); // Guarda la sesión
        } else {
          setError('No se encontró la sesión');
        }
      } catch (err) {
        setError('Error al obtener la sesión');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const mediaType = sessionData ? sessionData.media_type : null;
  //console.log('Media Type: ', mediaType);

  const handleSeek = (time) => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  // Lógica para determinar si es audio, imagen o video
  const isAudio = mediaType === 'audio';
  const isImage = mediaType === 'image';
  const isVideo = mediaType === 'video';
  
  const isMediaTypeMismatch = mediaType && urlMediaType && mediaType !== urlMediaType;
  return (
    <Box 
      alignItems='center'
      display='flex'
      justifyContent='center'
      height="100vh"
    >
      {isMediaTypeMismatch ? (
          <VStack>
            <Text
              fontSize="2.8125rem"
              fontWeight="700"
              fontFamily="Optima LT Pro"
              color="#173378"
              mt="0.3rem"
              mb="1.5rem"
            >
              {t('errorMessageSessionLoad')}
            </Text>
            <Link to="/dashboardNewLoadProject">
              <Button
                w="10rem"
                h="2.375rem"
                bg="#173378"
                color="white"
                fontSize="1.25rem"
                fontWeight="400"
                shadow="lg"
                _hover={{ backgroundColor: 'gray.600' }}
              >
                {t('returnButton')}
              </Button>
            </Link>
          </VStack>
      ) : (
        <Grid
          templateAreas={`"header header"
                          "nav main"
                          "nav navR"
                          "nav reproductor"
                          "nav footer"`}
          gridTemplateRows={'6.2% 59.1% 6% 28.7%'}
          gridTemplateColumns={'5.99% 70.57% 23.44%'}
          h='100%'
          gap='0'
          color='blackAlpha.700'
          fontWeight='bold'
        >
        <GridItem 
            pl='2' 
            color='white' 
            bg='#173378'
            borderLeft='1px' 
            borderBottom='1px'
            borderColor='white'
            area={'header'} 
            colStart={2}
            shadow='xl'
        >
          <NavHeader pageTitleText={pageTitle}/>
        </GridItem>
        <GridItem 
            color='white'
            display='flex' 
            bg='#173378' 
            area={'nav'} 
            rowStart={1} 
            rowEnd={3}
            shadow='xl'
            alignItems='center'
        >
            <NavLeftTools setActiveLiveBox={setActiveLiveBox} mediaType={mediaType} />
        </GridItem>
        <GridItem 
            pl='2' 
            borderLeft='1px'
            color='white'
            bg='gray.400' 
            area={'main'} 
            colStart={2}
            shadow='xl'
        >
          {mediaType === 'image' && (
            <ImageUploadSection 
              mediaRef={mediaRef}
              setSelectedImages={setSelectedImages} // Pasar la función para actualizar imágenes
              currentImage={currentImage} // Pasar la imagen actual
              sessionId={sessionId}
              currentImageIndex={currentImageIndex}
              actorsPerImage={actorsPerImage}
              setActorsPerImage={setActorsPerImage}
              isCreatingRelation={isCreatingRelation} 
              setIsCreatingRelation={setIsCreatingRelation}
            />
          )}
          {mediaType === 'video' && (
            <FileUploadSection 
              mediaType={mediaType}
              mediaRef={mediaRef}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              setDuration={setDuration}
            />            
          )}
          {mediaType === 'audio' && (
            <FileUploadSection 
            mediaType={mediaType}
            mediaRef={mediaRef}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            setDuration={setDuration}
            />  
          )}
        </GridItem>
        <GridItem 
            borderLeft='1px' 
            borderColor='white' 
            color='white' 
            bg='gray.400' 
            area={'navR'} 
            colStart={3} 
            rowStart={1} 
            rowEnd={3}
            shadow='xl'
            style={{ overflowY: 'hidden'}}
        >
        <div>
          {activeLiveBox === 'Actors' && (
            <>
              <HeaderTableActors />
              <HeaderLabelsActors />
              <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
                <TableBodyActors data={actors} />
              </div>
            </>
          )}

          {activeLiveBox === 'Types' && (
            <>
              <HeaderTableTypes />
              <HeaderLabelsTypes />
              <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
                <TableBodyTypes data={types} />
              </div>
            </>
          )}

          {activeLiveBox === 'Attach' && (
            <>
              <HeaderTableRelations activateRelationMode={activateRelationMode} />
              <HeaderLabelsRelations />
              <div style={{ overflowY: 'auto', maxHeight: '56.2vh' }}>
                {/* <TableBodyRelations /> */}
              </div>
            </>
          )}
        </div>
        </GridItem>
        <GridItem 
            pl='2' 
            color='white' 
            bg='#000000' 
            area={'reproductor'} 
            colSpan={3} 
            rowStart={3} 
            rowEnd={3}
            shadow='xl'
            display='flex'
        >
          {/*Reproductor*/}
          {mediaType === 'audio' ? (
            /* <AudioWaveform /> */ // Muestra onda de audio
            null
          ) : mediaType === 'video' ? (
            <VideoControls videoRef={mediaRef} /> // Reproductor de video
          ) : null /* No muestra nada si es imagen */}
        </GridItem>
        <GridItem 
            alignItems='center'
              display='flex'
              p='2' 
              color='white' 
              bg='gray.400' 
              area={'footer'} 
              colSpan={3} 
              rowStart={4}
              shadow='xl'
        >
            <HStack width='100%' overflowX='auto'>
              <CardTimeLine />
              {mediaType === 'image' && (
                <ImageTimeline 
                  images={selectedImages}
                  setSelectedImage={handleImageChange}
                  sessionId={sessionId}
                  currentImageIndex={currentImageIndex}
                  actorsPerImage={actorsPerImage}
                />
              )}
              {mediaType === 'video' && (
                /*<VideoTimeline duration={duration} currentTime={currentTime} onSeek={handleSeek} />*/
                <Timeline />
              )}
              {mediaType === 'audio' && (
                /*<AudioTimeline duration={duration} currentTime={currentTime} onSeek={handleSeek} />*/
                <Timeline />
              )}
            </HStack>
        </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default SessionPage;
