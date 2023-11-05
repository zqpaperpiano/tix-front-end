import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ durationInSeconds, onTimeout }) => {
  const [seconds, setSeconds] = useState(durationInSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeout(); // Callback function when the timer reaches zero
    } else {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds, onTimeout]);

  return <div>{seconds} seconds remaining</div>;
};

export default CountdownTimer;
