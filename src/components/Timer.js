import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { GameState } from "../constants";

const Timer = ({ expiryTimestamp, resetGame, gameStatus }) => {
  const { seconds, minutes, restart, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  //To Reset The game
  const ResetGame = () => {
    resetGame();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 2400);
    restart(time);
  };

  useEffect(() => {
    if (gameStatus === GameState.LOSE || gameStatus === GameState.WIN) {
      pause();
    }
  }, [gameStatus, pause]);

  return (
    <div className="flex border flex-1 justify-between p-2">
      <div>{minutes}</div>
      <div className="cursor-pointer" onClick={ResetGame}>
        {gameStatus === GameState.WIN && <span>Happy </span>}
        {gameStatus === GameState.LOSE && <span>Sad </span>}
        {!gameStatus && <span>Normal Face </span>}
      </div>
      <div>
        {seconds.toString().length === 1 ? (
          <span>0{seconds.toString()} </span>
        ) : (
          seconds
        )}
      </div>
    </div>
  );
};

export default Timer;
