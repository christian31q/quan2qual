import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Box, Button, HStack, VStack, Input, IconButton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import GridBodyActors from './actors/GridBodyActors';
import { IconPickerItem } from 'react-icons-picker';
import useActorStore from '../store/actorStore';
import useActorDragStore from '../store/actorDragStore';
import { MdPlayCircleOutline, MdPauseCircleOutline } from "react-icons/md";
import useAudioStore from '../store/audioStore';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';


import { createStandaloneToast } from '@chakra-ui/react';

const { ToastContainer, toast } = createStandaloneToast();

function AudioUploadSection({ sessionId, isCreatingRelation, setIsCreatingRelation }){
    const { t } = useTranslation();
    const { actors, fetchActors } = useActorStore();

    const { audioFile, audioUrl, handleAudioUpload, loadAudioFromStorage, setWavesurfer, togglePlayPause } = useAudioStore();
    
    const waveContainerRef = useRef(null);  // Mover las referencias al componente
    const timelineContainerRef = useRef(null);
    
    // Cargar audio desde localStorage al montar
    useEffect(() => {
        loadAudioFromStorage(sessionId);
    }, [sessionId]);

    // Usar useWavesurfer directamente en el componente
    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: waveContainerRef,  // Pasar la referencia correctamente
        waveColor: 'rgb(253 198 0)',
        progressColor: 'white',
        height: 100,
        url: audioUrl,  // Cargar el audio desde la URL
        plugins: useMemo(() => [
        Timeline.create({
            container: '#wave-timeline',  // Inicializar el plugin del timeline aquí
        })
        ], [audioUrl]),
        barWidth: 2,
        barHeight: 5,
        barGap: 1,
    });

    // Guardar la instancia de Wavesurfer en Zustand cuando esté disponible
    useEffect(() => {
        if (wavesurfer) {
        setWavesurfer(wavesurfer);  // Guardar la instancia en la store
        }
    }, [wavesurfer, setWavesurfer]);

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
                    <div className='audio-container'>
                        {/* Contenedor de la onda */}
                        <div ref={waveContainerRef} style={{ width: '100%', height: '100px' }}></div>
                        
                        {/* Timeline */}
                        {/* <div ref={timelineContainerRef} style={{ height: '30px' }}></div> */}
                        <div id="wave-timeline" style={{ height: '30px' }}></div>

                        <p style={{textAlign: 'end'}}>Current time: {formatTime(currentTime)}</p>
                        <IconButton
                            icon={isPlaying ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
                            onClick={() => togglePlayPause(wavesurfer)}  // Pasar wavesurfer al store para controlar play/pause
                            aria-label={isPlaying ? "Pause" : "Play"}
                            fontSize='50px'
                            colorScheme='transparent'
                        />
                    </div>
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