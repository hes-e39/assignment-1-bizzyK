import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import DisplayTime from '../displayTime/DisplayTime';

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
        setTime(0); // Set the timer to 0
        setIsActive(false); // Stop the timer
    };

    return (
        <div className="timer-container">
            <h2>Countdown Timer</h2>
            <DisplayTime time={time} />
            <div className="controls">
                <Button onClick={handleStart} label="Start" disabled={isActive} />
                <Button onClick={handlePauseResume} label={isPaused ? 'Resume' : 'Pause'} disabled={!isActive} />
                <Button onClick={handleReset} label="Reset" />
                <Button onClick={handleFastForward} label="Fast Forward" />
            </div>
        </div>
    );
};

export default Countdown;