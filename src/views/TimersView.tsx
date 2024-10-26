import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 15px;
  font-size: 1.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
  text-align: center;
`;

const TimerTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const TimersView = () => {
  const timers = [
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown startTime={120} /> },
    { title: "XY", C: <XY roundTime={60} rounds={10} /> },
    { title: "Tabata", C: <Tabata workTime={20} restTime={10} rounds={8} /> } // Example props
  ];

  return (
    <Timers>
      {timers.map((timer) => (
        <Timer key={`timer-${timer.title}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.C}
        </Timer>
      ))}
    </Timers>
  );
};

export default TimersView;
