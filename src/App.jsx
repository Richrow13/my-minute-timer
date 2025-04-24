import { useState, useEffect } from 'react';

export default function MyMinuteTimer() {
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(1);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      new Audio('/chime.mp3').play();
      alert("Time's up! 🎉");
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleStart = () => {
    setTime(inputMinutes * 60);
    setIsRunning(true);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>MyMinuteTimer</h1>

      <div>
        <input
          type="number"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(+e.target.value)}
          min={1}
        />
        <span> minute(s)</span>
      </div>

      <h2 style={{ fontSize: '3rem', margin: '1rem' }}>
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
      </h2>

      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={() => {
          setTime(inputMinutes * 60);
          setIsRunning(false);
        }}>Reset</button>
      </div>
    </div>
  );
}
