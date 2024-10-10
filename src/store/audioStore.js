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
    wavesurfer: null, // Añadimos wavesurfer a la store
    isPlaying: false,

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

    // Guardar la instancia de Wavesurfer
    setWavesurfer: (wavesurferInstance) => {
      set({ wavesurfer: wavesurferInstance });
    },

    // Reproducir/pausar audio
    togglePlayPause: () => {
      const { wavesurfer, isPlaying } = get();
      if (wavesurfer) {
        wavesurfer.playPause();
        set({ isPlaying: !isPlaying });
      }
    },
  }))
);

export default useAudioStore;
