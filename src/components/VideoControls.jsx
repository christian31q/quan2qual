import React, { useState, useEffect, forwardRef } from 'react';
import { IconButton, ButtonGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { MdPlayCircleOutline, MdPauseCircleOutline, MdReplay10, MdForward10, MdSkipPrevious } from "react-icons/md";

// Usar forwardRef para poder pasar el ref desde el componente padre
const VideoControls = forwardRef(({ }, videoRef) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 1 represents full volume

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
        setDuration(videoElement.duration || 0);  // Asegurarse que duración no sea undefined
      }
    };

    // Agregar evento para manejar el tiempo actual del video
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      
      // Limpiar evento cuando el componente se desmonte
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef.current]);

  // Formatear tiempo en mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Reproducir o pausar video
  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
      setIsPlaying(!videoElement.paused);
    }
  };

  // Retroceder 10 segundos
  const handleBackward = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = Math.max(videoElement.currentTime - 10, 0);
    }
  };

  // Adelantar 10 segundos
  const handleForward = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = Math.min(videoElement.currentTime + 10, videoElement.duration);
    }
  };

  // Volver al inicio
  const handleBackToStart = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
    }
  };

  // Cambiar el volumen
  const handleVolumeChange = (value) => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.volume = value;
      setVolume(value);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ButtonGroup>
        <IconButton
          icon={isPlaying ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />}
          isRound={true}
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          fontSize='40px'
          colorScheme='transparent'
        />
        <IconButton
          icon={<MdReplay10 />}
          onClick={handleBackward}
          aria-label="Backward 10s"
          fontSize='40px'
          colorScheme='transparent'
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <IconButton
          icon={<MdForward10 />}
          onClick={handleForward}
          aria-label="Forward 10s"
          fontSize='40px'
          colorScheme='transparent'
        />
        <IconButton
          icon={<MdSkipPrevious />}
          onClick={handleBackToStart}
          aria-label="Back to Start"
          fontSize='40px'
          colorScheme='transparent'
        />
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume"
          width="150px"
        >
          <SliderTrack>
            <SliderFilledTrack bg='#173378' />
          </SliderTrack>
          <SliderThumb boxSize={3} />
        </Slider>
      </ButtonGroup>
    </div>
  );
});

export default VideoControls;