import React from 'react';

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

interface DisplayTimeProps {
    time: number;
}

const DisplayTime: React.FC<DisplayTimeProps> = ({ time }) => (
    <div className="time-display">{formatTime(time)}</div>
);

export default DisplayTime;