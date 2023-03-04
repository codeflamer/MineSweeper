import { useEffect, useRef, useState } from "react";

const STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

const Tile = ({ tileData, setBoardState, setNumMines, boardState }) => {
  const [numAdjMines, setNumAdjMines] = useState();
  const [stopProp, setStopProp] = useState(false);
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

  const RevealTiles = (boardState, tileData) => {
    if (stopProp) return;
    console.log(stopProp);
    let response;
    //console.log("clicke", tileData);
    if (tileData.status !== STATUSES.HIDDEN) {
      return;
    }
    if (tileData.mine) {
      //Change Status to Mine
      response = boardState?.map((board) => {
        const FindTile = board?.find(
          (tile) => tile.x === tileData.x && tile.y === tileData.y
        );
        if (FindTile) {
          //console.log(FindTile);
          FindTile.status = STATUSES.MINE;
        }
        return board;
      });
      setBoardState(response);
      return;
    }

    response = boardState.map((board) => {
      const foundTile = board?.find(
        (tile) => tile.x === tileData.x && tile.y === tileData.y
      );
      if (foundTile) {
        foundTile.status = STATUSES.NUMBER;
        const adjacentMines = getAdjacentMines(foundTile, boardState);
        const mines = adjacentMines.filter((t) => t.mine);
        if (mines.length === 0) {
          adjacentMines.forEach(RevealTiles.bind(null, boardState));
        } else if (mines.length > 0) {
          foundTile.AdjacentMines = mines.length;
        }
      }
      return board;
    });
    //console.log(response);
    setBoardState(response);
    //checkGameEnd();
  };

  const getAdjacentMines = (tile, board) => {
    //List of Adjacent Tiles
    let adjacents = [];
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        const adj = board[tile.x + offsetX]?.[tile.y + offsetY];
        if (adj) adjacents.push(adj);
      }
    }
    return adjacents;
  };

  const checkIfwon = (board) => {
    return true;
  };
  const checkIfLose = (board) => {
    return true;
  };

  const checkGameEnd = () => {
    if (stopProp) return;
    const win = checkIfwon(boardState);
    const lose = checkIfLose(boardState);
    //console.log(e.nativeEvent.stopImmediatePropagation());

    if (win || lose) {
      setStopProp(true);
    }
  };

  return (
    <div
      className={`w-10 h-10 bg-blue-500 text-white hover:cursor-pointer 
      ${tileData?.status === STATUSES.MARKED && `bg-yellow-500`} 
      ${tileData?.status === STATUSES.MINE && `bg-red-500`} 
      ${tileData?.status === STATUSES.NUMBER && `bg-blue-800`}`}
      onContextMenu={(e) => {
        if (!stopProp) {
          rightClick();
          checkGameEnd(e);
        }
        return;
      }}
      onClick={(e) => {
        RevealTiles(boardState, tileData);
        setStopProp(false);
        checkGameEnd();
      }}
    >
      {/* {tileData.AdjacentMines} */}
      {tileData.AdjacentMines === 0 ? " " : tileData.AdjacentMines}
    </div>
  );
};

export default Tile;
