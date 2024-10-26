import React, { useState, useEffect } from 'react';

interface TabataProps {
    workTime: number; // in seconds
    restTime: number; // in seconds
    rounds: number;
}

const Tabata: React.FC<TabataProps> = ({ workTime, restTime, rounds }) => {
    const [time, setTime] = useState(workTime);
    const [isWorkInterval, setIsWorkInterval] = useState(true);
    const [currentRound, setCurrentRound] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Timer effect
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isActive && !isPaused && currentRound <= rounds) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            if (time === 0) {
                if (isWorkInterval) {
                    setTime(restTime);
                    setIsWorkInterval(false);
                } else {
                    setTime(workTime);
                    setIsWorkInterval(true);
                    setCurrentRound((prevRound) => prevRound + 1);
                }
            }
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isActive, isPaused, time, isWorkInterval, currentRound, rounds, workTime, restTime]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setTime(workTime);
        setIsWorkInterval(true);
        setCurrentRound(1);
        setIsActive(false);
        setIsPaused(false);
    };

    const handleFastForward = () => {
        setIsActive(false);
        setTime(0); // End the timer immediately
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="tabata">
            <h2>Tabata Timer</h2>
            <div className="round-display">
                Round {currentRound}/{rounds}
            </div>
            <div className="interval-display">
                {isWorkInterval ? 'Work' : 'Rest'} Interval
            </div>
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

export default Tabata;