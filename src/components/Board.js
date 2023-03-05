import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { boardSize, STATUSES, numberOfMines } from "../constants";
import { getMinePosition } from "./helpers";
import Timer from "./Timer";

const Board = () => {
  const [boardState, setBoardState] = useState([]);
  const [numMines, setNumMines] = useState(numberOfMines); //To Set the number of mines
  const [stopProp, setStopProp] = useState(false);
  const [gameStatus, setGameStatus] = useState();

  //Time Function
  const time = new Date();
  time.setSeconds(time.getSeconds() + 2400); //for 40 minutes

  const resetGame = () => {
    createBoard(boardSize, numberOfMines);
    setStopProp(false);
    setGameStatus();
  };

  const createBoard = (boardSize, numMines) => {
    const boardArray = [];
    const minePositionInTile = getMinePosition(boardSize, numMines);
    for (let x = 0; x < boardSize; x++) {
      let row = [];
      for (let y = 0; y < boardSize; y++) {
        let tile = {
          x,
          y,
          mine: minePositionInTile.some(
            (position) => position.x === x && position.y === y
          ),
          status: STATUSES.HIDDEN,
          AdjacentMines: 0,
          //To know if this particular tile Holds a mine or not
        };
        row.push(tile);
      }
      boardArray.push(row);
    }
    //console.log(boardArray);
    setBoardState(boardArray);
  };

  useEffect(() => {
    createBoard(boardSize, numMines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className=" max-w-[744px] mx-auto">
      <div className="flex flex-col m-[20px]">
        {/* Heading */}
        <div className=" my-2 flex  justify-between items-center">
          <Timer
            expiryTimestamp={time}
            resetGame={resetGame}
            gameStatus={gameStatus}
          />
        </div>
        {/* Game Components */}
        <div className=" grid grid-cols-16 gap-[4px]">
          {boardState?.map((board) =>
            board?.map((tileData, i) => (
              <Tile
                key={i + 1}
                tileData={tileData}
                setBoardState={setBoardState}
                boardState={boardState}
                setNumMines={setNumMines}
                stopProp={stopProp}
                setStopProp={setStopProp}
                setGameStatus={setGameStatus}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Board;
