import React, { useEffect } from "react";

const STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

const Tile = ({ tileData, setBoardState, setNumMines }) => {
  const rightClick = (e) => {
    e.preventDefault();
    if (
      tileData.status !== STATUSES.HIDDEN &&
      tileData.status !== STATUSES.MARKED
    ) {
      return;
    }
    //Find the Clicked Tile and Update its Property Status to marked if initially Hidden and Vice Versa
    setBoardState((prevState) => {
      return prevState?.map((board) => {
        const FindTile = board?.find(
          (tile) => tile.x === tileData.x && tile.y === tileData.y
        );
        if (FindTile) {
          //console.log(FindTile);
          if (FindTile.status === STATUSES.HIDDEN) {
            FindTile.status = STATUSES.MARKED;
            setNumMines((prev) => prev - 1);
          } else if (FindTile.status === STATUSES.MARKED) {
            FindTile.status = STATUSES.HIDDEN;
            setNumMines((prev) => prev + 1);
          }
        }
        return board;
      });
    });
  };

  const leftClick = () => {
    console.log("clicke");
    if (tileData.status !== STATUSES.HIDDEN) {
      return;
    }
    if (tileData.mine) {
      tileData.status = STATUSES.MINE;
      return;
    }
    tileData.status = STATUSES.NUMBER;
  };

  //useEffect(() => {}, [tileData]);

  return (
    <div
      className={`w-10 h-10 bg-blue-500 text-white hover:cursor-pointer 
      ${tileData?.status === STATUSES.MARKED && `bg-yellow-500`} 
      ${tileData?.status === STATUSES.MINE && `bg-red-500`} 
      ${tileData?.status === STATUSES.NUMBER && `bg-blue-800`}`}
      onContextMenu={rightClick}
      onClick={leftClick}
    ></div>
  );
};

export default Tile;
