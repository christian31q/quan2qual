import React, { useState } from 'react';
import { Button } from "@chakra-ui/react";

function VideoControls({ videoRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handleMuteUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div>
      <Button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Button onClick={handleMuteUnmute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </Button>
      {/* Agrega aquí otros botones o elementos de interfaz según tus necesidades */}
    </div>
  );
}

export default VideoControls;

