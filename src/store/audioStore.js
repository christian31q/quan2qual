// audioStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Función para convertir archivo a Base64
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const useAudioStore = create(
  devtools((set, get) => ({
    audioFile: null,
    audioUrl: null,
    wavesurferPrimary: null,  // Instancia de la onda principal
    wavesurferTimeline: null,  // Instancia de la segunda onda (timeline)
    isPlaying: false,

    // Guardar la instancia de Wavesurfer
    setWavesurferPrimary: (wavesurferInstance) => {
        set({ wavesurferPrimary: wavesurferInstance });
    },
  
    setWavesurferTimeline: (wavesurferInstance) => {
        set({ wavesurferTimeline: wavesurferInstance });
    },

    // Cargar el audio desde localStorage usando sessionId
    loadAudioFromStorage: (sessionId) => {
      const savedAudio = JSON.parse(localStorage.getItem(`audio-${sessionId}`));
      if (savedAudio && savedAudio.base64) {
        set({ audioUrl: savedAudio.base64, audioFile: { name: savedAudio.fileName } });
      }
    },

    // Manejar la carga de archivo de audio, pasando el sessionId
    handleAudioUpload: async (e, sessionId) => {
      const file = e.target.files[0];
      if (file) {
        const base64Audio = await getBase64(file);
        set({ audioFile: file, audioUrl: base64Audio });

        // Guardar en localStorage con el sessionId correcto
        const audioData = {
          fileName: file.name,
          base64: base64Audio,
          sessionId,
        };
        localStorage.setItem(`audio-${sessionId}`, JSON.stringify(audioData));
      }
    },

    // Sincronizar la reproducción y pausa en ambas ondas
    togglePlayPause: () => {
        const { wavesurferPrimary, wavesurferTimeline, isPlaying } = get();
        if (wavesurferPrimary && wavesurferTimeline) {
        // Reproducir o pausar ambas instancias
        wavesurferPrimary.playPause();
        wavesurferTimeline.playPause();
        set({ isPlaying: !isPlaying });
        }
    },

    // Sincronizar el seek entre ambas instancias de Wavesurfer y pausar el audio
    syncSeek: (progress) => {
        const { wavesurferPrimary, wavesurferTimeline, togglePlayPause } = get();

        // Asegurarse de que ambas instancias se actualicen
        if (wavesurferPrimary && wavesurferTimeline) {
        wavesurferPrimary.seekTo(progress);  // Aplicar el seek en la primera onda
        wavesurferTimeline.seekTo(progress); // Aplicar el seek en la segunda onda

        // Actualizar el estado de reproducción
        set({ isPlaying: false });
        }
    },
  }))
);

export default useAudioStore;
