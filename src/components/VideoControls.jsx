import React, { useState, useEffect } from 'react';
import { IconButton, ButtonGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { MdPlayCircleOutline, MdPauseCircleOutline, MdReplay10, MdForward10, MdSkipPrevious } from "react-icons/md";

function VideoControls({ videoRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 1 represents full volume

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
        console.log('Current Time:', videoRef.current.currentTime);
        console.log('Duration:', videoRef.current.duration);
      }
    };

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

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

  const handleBackward = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime -= 10;
    }
  };

  const handleForward = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime += 10;
    }
  };

  const handleBackToStart = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
    }
  };

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
        <IconButton icon={isPlaying ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />} isRound={true} onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"} fontSize='40px' colorScheme='transparent' />
        <IconButton icon={<MdReplay10 />} onClick={handleBackward} aria-label="Backward 10s" fontSize='40px' colorScheme='transparent' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', width:'300px'}}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <IconButton icon={<MdForward10 />} onClick={handleForward} aria-label="Forward 10s" fontSize='40px' colorScheme='transparent' />
        <IconButton icon={<MdSkipPrevious />} onClick={handleBackToStart} aria-label="Back to Start" fontSize='40px' colorScheme='transparent' />
        <Slider min={0} max={1} step={0.01} value={volume} onChange={handleVolumeChange}>
          <SliderTrack>
            <SliderFilledTrack bg='#173378'/>
          </SliderTrack>
          <SliderThumb boxSize={3}/>
        </Slider>
      </ButtonGroup>
    </div>
  );
}

export default VideoControls;