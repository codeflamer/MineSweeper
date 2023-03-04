import React, { useEffect, useState } from "react";
import Tile from "./Tile";

const boardSize = 16;

const Board = () => {
  const [boardState, setBoardState] = useState([]);
  const [numMines, setNumMines] = useState(5);
  const [stopProp, setStopProp] = useState(false);
  const [gameStatus, setGameStatus] = useState();

  const STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
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
    console.log(boardArray);
    setBoardState(boardArray);
  };

  //To get Mine Positions
  const getMinePosition = (boardSize, numMines) => {
    let positions = [];
    while (positions.length < numMines) {
      let minePosition = {
        x: RandomNumber(boardSize),
        y: RandomNumber(boardSize),
      };
      //check if the position already exist to prevent duplicate
      if (
        !positions.some(
          (position) =>
            position.x === minePosition.x && position.y === minePosition.y
        )
      ) {
        positions.push(minePosition); // Push if Found
      }
    }
    //console.log(positions);
    return positions;
  };

  const RandomNumber = (RandomNumber) => {
    return Math.floor(Math.random() * RandomNumber);
  };

  useEffect(() => {
    createBoard(boardSize, numMines);
  }, []);
  return (
    <section className="border border-red-500 max-w-[744px] mx-auto">
      <div className="flex flex-col m-[20px]">
        {/* Heading */}
        <div className="border border-green-500 h-[50px] my-2 flex  justify-between items-center">
          <div>Number of mines:{numMines}</div>
          <div>
            Timer: <span>The Timer is gonna stay Here</span>
          </div>
        </div>
        <div className="text-center">{gameStatus}</div>
        {/* Game Components */}
        <div className="border border-blue-500 grid grid-cols-16 gap-[4px]">
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
