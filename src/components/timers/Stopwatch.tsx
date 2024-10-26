// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, useEffect } from 'react';

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Timer effect
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isActive && !isPaused) {
            timer = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setTime(0);
        setIsActive(false);
        setIsPaused(false);
    };

    const handleFastForward = () => {
        setTime(0); // End the timer immediately
        setIsActive(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="stopwatch">
            <h2>Stopwatch</h2>
            <div className="time-display">{formatTime(time)}</div>
            <div className="controls">
                <button onClick={handleStart} disabled={isActive && !isPaused}>
                    Start
                </button>
                <button onClick={handlePauseResume} disabled={!isActive}>
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleFastForward}>Fast Forward</button>
            </div>
        </div>
    );
};

export default Stopwatch;