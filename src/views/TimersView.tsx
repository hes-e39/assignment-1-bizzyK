import Stopwatch from '../components/timers/Stopwatch';
import Countdown from '../components/timers/Countdown';
import XY from '../components/timers/XY';
import Tabata from '../components/timers/Tabata';

const TimersView = () => {
    return (
        <div className="timers-container">
            <div><Stopwatch /></div>
            <div><Countdown startTime={120} /></div>
            <div><XY roundTime={60} rounds={10} /></div>
            <div><Tabata workTime={20} restTime={10} rounds={8} /></div>
        </div>
    );
};

export default TimersView;