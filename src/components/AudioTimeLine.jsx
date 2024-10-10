import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import useAudioStore from '../store/audioStore';
import { useWavesurfer } from '@wavesurfer/react';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';

const AudioTimeLine = ({ sessionId }) => {
    //const { audioFile, audioUrl, handleAudioUpload, loadAudioFromStorage, setWavesurferTimeline, setWavesurfer, togglePlayPause, syncSeek  } = useAudioStore();
    const { audioUrl, loadAudioFromStorage, setWavesurferTimeline, syncSeek } = useAudioStore();

    // Cargar audio desde localStorage al montar
    useEffect(() => {
        loadAudioFromStorage(sessionId);
    }, [sessionId]);

    //const { wavesurfer } = useAudioStore();  // Obtener la instancia de Wavesurfer desde Zustand
    const containerRef = useRef(null)

    const { wavesurfer } = useWavesurfer({
        container: containerRef,
        waveColor: 'rgb(253 198 0)',
        progressColor: 'white',
        height: 50,
        url: audioUrl,
        plugins: useMemo(() => [
          Timeline.create({
            container: '#wave-timeline2',
          }),
        ], [audioUrl]),
        barWidth: 2,
        barHeight: 10,
        barGap: 1,
    });

    // Guardar instancia en Zustand
    useEffect(() => {
        if (wavesurfer) {
        setWavesurferTimeline(wavesurfer);

        // Sincronizar usando el evento 'interaction' o 'seeking'
        wavesurfer.on('interaction', (newTime) => {
            const duration = wavesurfer.getDuration();
            const progress = newTime / duration;  // Convertir tiempo a porcentaje
            syncSeek(progress);  // Sincronizar con la otra onda y pausar el audio
        });
        }
    }, [wavesurfer, setWavesurferTimeline, syncSeek]);



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


