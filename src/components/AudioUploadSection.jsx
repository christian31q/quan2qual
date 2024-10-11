import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Box, Button, HStack, VStack, Input, IconButton, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import useActorStore from '../store/actorStore';
import useActorDragStore from '../store/actorDragStore';
import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
import useAudioStore from '../store/audioStore';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';


import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

function AudioUploadSection({ sessionId, isCreatingRelation, setIsCreatingRelation }){
    const { t } = useTranslation();
    const { actors, fetchActors } = useActorStore();

    const { audioFile, audioUrl, handleAudioUpload, loadAudioFromStorage, setWavesurferPrimary, togglePlayPause, syncSeek } = useAudioStore();
    
    const waveContainerRef = useRef(null);  // Mover las referencias al componente
    
    // Cargar audio desde localStorage al montar
    useEffect(() => {
        loadAudioFromStorage(sessionId);
    }, [sessionId]);

    // Inicializar Wavesurfer con RegionsPlugin y Timeline
    const regionsPlugin = useMemo(() => RegionsPlugin.create({ dragSelection: true }), []); 

    // Usar useWavesurfer directamente en el componente
    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: waveContainerRef,
        waveColor: 'rgb(253 198 0)',
        progressColor: 'white',
        height: 100,
        url: audioUrl,
        plugins: useMemo(() => [
            Timeline.create({ container: '#wave-timeline' }),
            regionsPlugin
        ], [audioUrl]),
        barWidth: 2,
        barHeight: 5,
        barGap: 1,
    });

    // Guardar la instancia de wavesurfer en Zustand
    useEffect(() => {
        if (wavesurfer) {
            setWavesurferPrimary(wavesurfer);

            // Sincronizar usando el evento 'interaction' o 'seeking'
            wavesurfer.on('interaction', (newTime) => {
                const duration = wavesurfer.getDuration();
                const progress = newTime / duration;  // Convertir tiempo a porcentaje
                syncSeek(progress);  // Sincronizar con la otra onda y pausar el audio
            });

            // Esperar a que el audio esté decodificado antes de crear la región
            if (isCreatingRelation) {
                console.log('Ready attach: ', isCreatingRelation);
                // Añadir una región usando la instancia del plugin de regiones
                regionsPlugin.addRegion({
                    id: 'region_1',
                    start: 1, 
                    end: 5,   
                    content: 'Cramped region',
                    color: 'rgb(59, 39, 26, 0.5)',
                    minLength: 1,
                    maxLength: 8, 
                });

                console.log('Región creada');
                
                // Resetear la creación de la relación para evitar múltiples creaciones
                //setIsCreatingRelation(false);
            }

            // Escuchar el evento 'region-updated' una sola vez
            const handleRegionUpdated = (region) => {
                console.log('Updated region: ', region);
            };

            // Registrar el evento solo si aún no está registrado
            if (regionsPlugin) {
                regionsPlugin.on('region-updated', handleRegionUpdated);
            }

            // Limpiar el evento cuando el componente se desmonte
            return () => {
                if (regionsPlugin) {
                    regionsPlugin.un('region-updated', handleRegionUpdated);
                }
            };
        }
    }, [wavesurfer, isCreatingRelation]);

    // Formatear el currentTime para mostrar en interfaz
    const formatTime = (seconds) => {
        return [Math.floor(seconds / 60), Math.floor(seconds % 60)]
            .map((v) => `0${v}`.slice(-2))
            .join(':');
    };


    // Cargar actores al montar el componente
    useEffect(() => {
        fetchActors(sessionId); // Llama a la función de Zustand para obtener actores de MongoDB
    }, [fetchActors]);

    const renderAudioWave = () => {
        return (
            <>
                {audioFile ? (
                    <Box className='audio-container'>
                        {/* Contenedor de la onda */}
                        <Box ref={waveContainerRef} id='waveContainer' style={{ width: '100%', height: '100px' }}></Box>
                        
                        {/* Timeline */}
                        <Box id="wave-timeline" style={{ height: '30px' }}></Box>

                        <Text style={{textAlign: 'end'}}>Current time: {formatTime(currentTime)}</Text>
                        <IconButton
                            icon={isPlaying ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
                            onClick={() => togglePlayPause(wavesurfer)}  // Pasar wavesurfer al store para controlar play/pause
                            aria-label={isPlaying ? "Pause" : "Play"}
                            fontSize='50px'
                            colorScheme='transparent'
                        />
                    </Box>
                ) : (
                    // Input para subir el archivo cuando no haya audio cargado
                    <label className='file-upload-label'>
                        <span>Seleccionar el audio</span>
                        <Input
                            type='file'
                            id='file-upload-input-large'
                            accept='audio/*'
                            onChange={(e) => handleAudioUpload(e, sessionId)}  // Pasar el sessionId
                            className='file-upload-input'
                        />
                    </label>
                )}
            </>
        );
    };

    return(
        <VStack spacing={4}>
            <Box
            //ref={containerRef}
            w="65vw"
            h='35vh'
            maxHeight="55vh"
            p={4}
            borderWidth="3px"
            borderRadius="lg"
            borderColor="#173378"
            boxSizing="border-box"
            outline={isCreatingRelation ? '5px solid #5dff5d' : 'none'}
            outlineOffset={isCreatingRelation ? '0px' : '0px'}  // Para una transición más suave
            bg="#173378"
            align="center"
            display="flex"
            justifyContent="center"
            flexDirection='column'
            alignItems="center"
            position="relative"
            onDragOver={(e) => e.preventDefault()}
            //onDrop={handleDrop}
            transition="outline 0.3s ease-in-out, outline-offset 0.3s ease-in-out"
            >
                {renderAudioWave()}
            </Box>
            <Box
            w='65vw'
            h='15vh'
            p={4}
            borderWidth='3px'
            borderRadius='lg'
            borderColor='#173378'
            align='center'
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            >
                <GridBodyActors 
                    actors={actors}
                    //handleDragStart={(e, actorId) => handleDragStart(e, actorId)}
                />
            </Box>

        </VStack>
    );
}

export default AudioUploadSection;