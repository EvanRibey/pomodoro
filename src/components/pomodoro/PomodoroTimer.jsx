import { useEffect, useState } from 'react';
import Timer from './Timer';
import TimerForm from './TimerForm';

export default function PomodoroTimer() {
  const [interval, setIntervalCycle] = useState('');
  const [cycleEnd, setEndCycle] = useState(null);

  const [cycles, setCycles] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isFocus, setIsFocus] = useState(true);

  const [restId, setRestId] = useState(null);

  useEffect(() => {
    return () => {
      clearTimeout(restId);
    };
  });

  function createRestTimer() {
    let rest = 5;
    if (interval === '50') {
      rest = 10;
    }
    createTimer(rest, false);
  }

  function createTimer(minutes, focus) {
    const now = new Date();
    const minutesConv = minutes * 1000 * 60;
    setIsFocus(focus);
    setEndCycle(new Date(now.getTime() + minutesConv));

    if (focus) { // setting a working timer
      const restId = setTimeout(createRestTimer, minutesConv);
      setRestId(restId);
      setCycles(cycles-1);
    } else if (cycles > 0) { // if there is another working timer
      const restId = setTimeout(() => {
        createTimer(+interval, true)
      }, minutesConv);
      setRestId(restId);
    } else { // you're done!
      const restId = setTimeout(() => {
        setEndCycle(null);
        setFlipped(false);
      }, minutesConv);
      setRestId(restId);
    }
  }

  function submit(event) {
    event.preventDefault();
    createTimer(+interval, true); 
    setFlipped(true);
  }

  return (
    <div>
      <Timer
        focus={isFocus}
        flipped={flipped}
        endTime={cycleEnd}
      />
      <TimerForm
        submit={submit}
        flipped={flipped}
        interval={interval}
        setIntervalCycle={setIntervalCycle}
        cycles={cycles}
        setCycles={setCycles}
      />
    </div>
  );
}
