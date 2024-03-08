
import React from 'react';

const AudioContext = React.createContext();

export const AudioProvider = ({ children }) => {
    const audioRef = React.useRef();

    return <AudioContext.Provider value={audioRef}>{children}</AudioContext.Provider>;
};

export const useAudio = () => React.useContext(AudioContext);
