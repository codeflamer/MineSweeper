import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
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
    if (gameStatus === GameState.LOSE) {
      toast.error("You Lose!");
      pause();
    }
    if (gameStatus === GameState.WIN) {
      toast.success("You Win!");
      pause();
    }
  }, [gameStatus]);

  return (
    <div className="flex border flex-1 justify-between items-center">
      <Toaster position="top-center" />
      <div className="bg-[#ccddee] p-2 rounded-md text-white text-[24px] font-bold tracking-widest px-2">
        0
        {minutes.toString().length === 1 ? (
          <span>0{minutes.toString()} </span>
        ) : (
          <span>{minutes}</span>
        )}
      </div>
      <div className="cursor-pointer" onClick={ResetGame}>
        {gameStatus === GameState.WIN && (
          <span className="text-[20px]">😎:WIN </span>
        )}
        {gameStatus === GameState.LOSE && <span>😕:LOSE</span>}
        {!gameStatus && <span>😃:NORMAL</span>}
      </div>
      <div className="bg-[#ccddee] p-2 rounded-md text-white text-[24px] font-bold tracking-widest px-2">
        0
        {seconds.toString().length === 1 ? (
          <span>0{seconds.toString()} </span>
        ) : (
          <span>{seconds}</span>
        )}
      </div>
    </div>
  );
};

export default Timer;
