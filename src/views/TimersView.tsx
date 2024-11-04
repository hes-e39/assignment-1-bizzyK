// TimersView.tsx

import Timer from '../components/timers/Timer';

const TimersView = () => {
    return (
        <div className="timers-container">
            <Timer type="stopwatch" />
            <Timer type="countdown" startTime={120} />
            <Timer type="xy" roundTime={60} rounds={10} />
            <Timer type="tabata" workTime={20} restTime={10} rounds={8} />
        </div>
    );
};

export default TimersView;