import React, { useState, useEffect } from 'react';
import DisplayRounds from '../displayRounds/DisplayRounds';
import DisplayTime from '../displayTime/DisplayTime';
import Button from '../button/Button';

type TimerType = 'stopwatch' | 'countdown' | 'xy' | 'tabata';

interface TimerProps {
    type: TimerType;
    startTime?: number; // Used for countdown
    workTime?: number; // Used for tabata
    restTime?: number; // Used for tabata
    roundTime?: number; // Used for xy
    rounds?: number; // Used for xy and tabata
}

const Timer: React.FC<TimerProps> = ({ type, startTime = 0, workTime = 20, restTime = 10, roundTime = 60, rounds = 1 }) => {
    const [time, setTime] = useState(type === 'countdown' ? startTime : 0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isWorkInterval, setIsWorkInterval] = useState(true); // For tabata
    const [currentRound, setCurrentRound] = useState(1);

    // Effect for timer countdown
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isActive && !isPaused) {
            timer = setInterval(() => {
                setTime((prevTime) => (type === 'stopwatch' ? prevTime + 1 : prevTime - 1));
            }, 1000);

            if (time === 0) {
                handleEndOfInterval();
            }
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isActive, isPaused, time]);

    // Handles end of interval based on type
    const handleEndOfInterval = () => {
        if (type === 'countdown' || type === 'stopwatch') {
            setIsActive(false);
        } else if (type === 'xy' && currentRound < rounds) {
            setCurrentRound((prevRound) => prevRound + 1);
            setTime(roundTime);
        } else if (type === 'tabata') {
            if (currentRound === rounds && !isWorkInterval) {
                setIsActive(false);
            } else if (isWorkInterval) {
                setTime(restTime);
                setIsWorkInterval(false);
            } else {
                setTime(workTime);
                setIsWorkInterval(true);
                setCurrentRound((prevRound) => prevRound + 1);
            }
        }
    };

    // Event handlers for buttons
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(false);
        setCurrentRound(1);
        setIsWorkInterval(true);
        setTime(type === 'countdown' ? startTime : type === 'xy' ? roundTime : type === 'tabata' ? workTime : 0);
    };

    const handleFastForward = () => {
        setTime(0);
        setIsActive(false);
    };

    // Dynamic title based on type
    const title = {
        stopwatch: 'Stopwatch',
        countdown: 'Countdown Timer',
        xy: 'XY Timer',
        tabata: 'Tabata Timer',
    }[type];

    return (
        <div className="timer-container">
            <h2>{title}</h2>
            {type === 'tabata' || type === 'xy' ? (
                <DisplayRounds currentRound={currentRound} totalRounds={rounds} />
            ) : null}
            {type === 'tabata' && <div className="interval-display">{isWorkInterval ? 'Work' : 'Rest'} Interval</div>}
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

export default Timer;