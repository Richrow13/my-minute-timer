import { useState, useEffect, useRef } from "react";

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            playChime();
            setIsRunning(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSecondsLeft(60);
  };

  const playChime = () => {
    new Audio("/chime.mp3").play();
  };

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif", marginTop: "2rem" }}>
      <img
        src="/logo.png"
        alt="MyMinuteTimer Logo"
        style={{ height: "64px", marginBottom: "1rem" }}
      />
      <h1>MyMinuteTimer</h1>
      <h2 style={{ fontSize: "3rem", margin: "1rem 0" }}>{formatTime(secondsLeft)}</h2>

      <div>
        <button onClick={startTimer} disabled={isRunning} style={btnStyle}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isRunning} style={btnStyle}>
          Pause
        </button>
        <button onClick={resetTimer} style={btnStyle}>
          Reset
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  margin: "0 0.5rem",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
};

 
