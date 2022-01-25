import { useState, useEffect } from 'react';

const Timer = ({ startTime, onTimeOut }) => {
  // Debug Time
  const finalTime = new Date(startTime).getTime() + 1.5 * 60 * 60 * 1000;
  console.log(finalTime);
  const [timeLeft, setTimerLeft] = useState((finalTime - new Date().getTime()) / 1000);

  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => {
        setTimerLeft(timeLeft - 1);
      }, 1000);
    } else {
      setTimerLeft(0);
      onTimeOut();
    }
  }, [timeLeft]);

  // const calSize = (timeLeft, timeFull) => {
  //   timeFull = timeFull / 1000;
  //   let fontSize = 6 - 5 * (timeLeft / timeFull);
  //   return fontSize + 'rem';
  // };

  return (
    <div
      className={`font-bold text-xl fixed right-0 bottom-0 mb-3 mr-3 ${
        timeLeft < 600 ? 'text-red-500 text-xl' : 'text-black dark:text-white'
      }`}
      // style={{
      //   fontSize: calSize(timeLeft, finalTime - startTime),
      // }}
    >
      {String(Math.floor(timeLeft / 3600)).padStart(2, '0')}:
      {String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0')}:
      {String(Math.floor((timeLeft % 3600) % 60)).padStart(2, '0')}
    </div>
  );
};

export default Timer;
