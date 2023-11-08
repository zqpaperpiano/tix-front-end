import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ durationInSeconds, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(durationInSeconds);

  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeout(); // Callback function when the timer reaches zero
    } else {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime, onTimeout]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds} remaining
    </div>
  );
};

export default CountdownTimer;

