// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, useEffect } from 'react';

interface CountdownProps {
    startTime: number; // time in seconds
}

const Countdown: React.FC<CountdownProps> = ({ startTime }) => {
    const [time, setTime] = useState(startTime);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Timer effect
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isActive && !isPaused && time > 0) {
            timer = setInterval(() => setTime(prevTime => prevTime - 1), 1000);
        } else if (time === 0) {
            setIsActive(false); // Stop when countdown reaches 0
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isActive, isPaused, time]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setTime(startTime);
        setIsActive(false);
        setIsPaused(false);
    };

    const handleFastForward = () => {
        setTime(0); // Complete the countdown immediately
        setIsActive(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="countdown">
            <h2>Countdown Timer</h2>
            <div className="time-display">{formatTime(time)}</div>
            <div className="controls">
                <button onClick={handleStart} disabled={isActive}>
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

export default Countdown;