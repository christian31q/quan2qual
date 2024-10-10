import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import useAudioStore from '../store/audioStore';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';

const AudioTimeLine = ({ sessionId }) => {
    const { audioFile, audioUrl, handleAudioUpload, loadAudioFromStorage, setWavesurfer, togglePlayPause } = useAudioStore();
    // Cargar audio desde localStorage al montar
    useEffect(() => {
        loadAudioFromStorage(sessionId);
    }, [sessionId]);

    //const { wavesurfer } = useAudioStore();  // Obtener la instancia de Wavesurfer desde Zustand
    const containerRef = useRef(null)
    const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        height: 50,
        waveColor: 'rgb(253 198 0)',
        progressColor: 'white',
        url: audioUrl,
        plugins: useMemo(() => [
        Timeline.create({
            container: '#wave-timeline2',  // Inicializar el plugin del timeline aquí
        })
        ], [audioUrl]),
        barWidth: 2,
        barHeight: 10,
        barGap: 1,
    })

  return (
    <Flex direction="column" width="100%" gap="15px">
      {/* Timeline */}
    <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        <div id="wave-timeline2" style={{ width: '100%', height: '100%' }} />
    </Flex>
    <Flex height="51px" bg="#173378"  borderRadius="12px">
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </Flex>
    {/* Secciones extra para keyframes */}
    <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar tus keyframes */}
    </Flex>
    <Flex height="51px" bg="#173378" overflowX="auto" borderRadius="12px">
        {/* Aquí puedes renderizar tus keyframes */}
    </Flex>
    </Flex>
  );
};

export default AudioTimeLine;


