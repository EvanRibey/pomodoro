import { useState, useEffect } from "react";

export default function Timer(props) {
  const {
    endTime,
    flipped,
  } = props;
  
  if (!endTime) {
    return (
      <div></div>
    );
  }

  const [startTime, setDate] = useState(new Date());

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return function cleanup() {
      clearInterval(interval);
    };
  });

  let diff = endTime - startTime;
  diff = Math.floor(diff/1000)*1000
  diff+=1000; // to get satisfying start at minute and countdown
  let minutes = Math.floor(diff / (1000 * 60));
  let seconds = Math.floor(
    (diff - minutes * 1000 * 60) / 1000
  );
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return (
    <div className={flipped ? 'timer' : 'timer--flipped'}>{minutes}:{seconds}</div>
  );
}
