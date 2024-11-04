import React from 'react';

interface PanelProps {
    title: string;
    children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, children }) => (
    <div className="panel">
        <h2>{title}</h2>
        {children}
    </div>
);

export default Panel;