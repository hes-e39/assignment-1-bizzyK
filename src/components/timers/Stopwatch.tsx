import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import DisplayTime from '../displayTime/DisplayTime';

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
        setTime(0); // Set time to 0
        setIsActive(false); // Stop the timer
    };

    return (
        <div className="timer-container">
            <h2>Stopwatch</h2>
            <DisplayTime time={time} />
            <div className="controls">
                <Button onClick={handleStart} label="Start" disabled={isActive && !isPaused} />
                <Button onClick={handlePauseResume} label={isPaused ? 'Resume' : 'Pause'} disabled={!isActive} />
                <Button onClick={handleReset} label="Reset" />
                <Button onClick={handleFastForward} label="Fast Forward" />
            </div>
        </div>
    );
};

export default Stopwatch;