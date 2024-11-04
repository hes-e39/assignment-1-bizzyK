import React, { useState, useEffect } from 'react';
import DisplayRounds from '../displayRounds/DisplayRounds';
import Button from '../button/Button';
import DisplayTime from '../displayTime/DisplayTime';

interface XYProps {
    roundTime: number; // Time per round in seconds
    rounds: number;    // Number of rounds
}

const XY: React.FC<XYProps> = ({ roundTime, rounds }) => {
    const [time, setTime] = useState(roundTime);
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
                if (currentRound < rounds) {
                    setCurrentRound((prevRound) => prevRound + 1);
                    setTime(roundTime);
                } else {
                    setIsActive(false); // Stop when all rounds are completed
                }
            }
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isActive, isPaused, time, currentRound, rounds, roundTime]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setTime(roundTime);
        setCurrentRound(1);
        setIsActive(false);
        setIsPaused(false);
    };

    const handleFastForward = () => {
        setTime(0); // Set time to 0
        setCurrentRound(rounds); // Set to final round
        setIsActive(false); // Stop the timer
    };

    return (
        <div className="timer-container">
            <h2>XY Timer</h2>
            <DisplayRounds currentRound={currentRound} totalRounds={rounds} />
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

export default XY;