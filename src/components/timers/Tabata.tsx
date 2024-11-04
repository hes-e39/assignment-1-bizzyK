import React, { useState, useEffect } from 'react';
import DisplayRounds from '../displayRounds/DisplayRounds';
import Button from '../button/Button';
import DisplayTime from '../displayTime/DisplayTime';

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
                setTime((prevTime) => {
                    if (prevTime > 0) return prevTime - 1;

                    // If time hits zero, switch intervals or round
                    if (isWorkInterval) {
                        if (currentRound === rounds) {
                            setIsActive(false); // End timer after last work interval of final round
                        } else {
                            setTime(restTime);
                            setIsWorkInterval(false);
                        }
                    } else {
                        // Start new round if it was a rest interval
                        setTime(workTime);
                        setIsWorkInterval(true);
                        setCurrentRound((prevRound) => prevRound + 1);
                    }

                    return isWorkInterval ? restTime : workTime;
                });
            }, 1000);
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
        setCurrentRound(rounds); // Move to last round
    };

    return (
        <div className="timer-container">
            <h2>Tabata Timer</h2>
            <DisplayRounds currentRound={currentRound} totalRounds={rounds} />
            <div className="interval-display">
                {isWorkInterval ? 'Work' : 'Rest'} Interval
            </div>
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

export default Tabata;