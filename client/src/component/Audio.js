import React, { useState } from 'react';

function AudioVisualizer() {
    const [audioSrc, setAudioSrc] = useState('');
    const audioRef = React.useRef();
    const canvasRef = React.useRef();
    const contextRef = React.useRef();
    const analyserRef = React.useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAudioSrc(URL.createObjectURL(file));

        const context = new (window.AudioContext || window.webkitAudioContext)();
        contextRef.current = context;

        const analyser = context.createAnalyser();
        analyserRef.current = analyser;

        const src = context.createMediaElementSource(audioRef.current);
        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        function renderFrame() {
            requestAnimationFrame(renderFrame);
            let x = 0;
            analyser.getByteFrequencyData(dataArray);
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                const r = barHeight + (25 * (i / bufferLength));
                const g = 250 * (i / bufferLength);
                const b = 50;
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        }

        renderFrame();
    };

    return (
        <div id="content" >
            <input
                type="file"
                id="thefile"
                accept="audio/*"
                onChange={handleFileChange}
            />
            <canvas style={{ background: "red" }}
                ref={canvasRef}
                id="canvas"
                width="800"
                height="600"
            ></canvas>
            <audio
                ref={audioRef}
                id="audio"
                src={audioSrc}
                controls
            ></audio>
        </div>
    );
}

export default AudioVisualizer;