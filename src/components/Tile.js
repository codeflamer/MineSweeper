import { useEffect, useState } from "react";

const STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

const Tile = ({ tileData, setBoardState, setNumMines, boardState }) => {
  const [numAdjMines, setNumAdjMines] = useState();
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
    //console.log("clicke", tileData);
    if (tileData.status !== STATUSES.HIDDEN) {
      return;
    }
    if (tileData.mine) {
      //Change Status to Mine
      setBoardState((prevState) => {
        return prevState?.map((board) => {
          const FindTile = board?.find(
            (tile) => tile.x === tileData.x && tile.y === tileData.y
          );
          if (FindTile) {
            //console.log(FindTile);
            FindTile.status = STATUSES.MINE;
          }
          return board;
        });
      });
      return;
    }

    boardState.map((board) => {
      const foundTile = board?.find(
        (tile) => tile.x === tileData.x && tile.y === tileData.y
      );
      if (foundTile) {
        //console.log("Before:", foundTile);
        foundTile.status = STATUSES.NUMBER;
        setNumAdjMines(0);
        //console.log("After:", foundTile);
        const adjacentMines = getAdjacentMines(foundTile, boardState);
        const mines = adjacentMines.filter((t) => t.mine);
        if (mines.length === 0) {
          console.log("Hello");
          //adjacentMines.forEach(RevealTiles.bind(null, boardState));
        } else {
          setNumAdjMines(mines.length);
        }
      }
      return board;
    });
    setBoardState(boardState);

    //Change Status to Number
    // setBoardState((prevState) => {
    //   return prevState?.map((board) => {
    //     const FindTile = board?.find(
    //       (tile) => tile.x === tileData.x && tile.y === tileData.y
    //     );
    //     if (FindTile) {
    //       FindTile.status = STATUSES.NUMBER;
    //       const adjacentMines = getAdjacentMines(FindTile, prevState);
    //       const mines = adjacentMines.filter((t) => t.mine);
    //       if (mines.length === 0) {
    //         adjacentMines.forEach(RevealTiles.bind(null, board));
    //       } else {
    //         //setNumAdjMines(mines.length);
    //       }
    //     }
    //     return board;
    //   });
    // });
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

  // useEffect(() => {}, [boardState]);

  return (
    <div
      className={`w-10 h-10 bg-blue-500 text-white hover:cursor-pointer 
      ${tileData?.status === STATUSES.MARKED && `bg-yellow-500`} 
      ${tileData?.status === STATUSES.MINE && `bg-red-500`} 
      ${tileData?.status === STATUSES.NUMBER && `bg-blue-800`}`}
      onContextMenu={rightClick}
      onClick={() => RevealTiles(boardState, tileData)}
    >
      {numAdjMines === 0 ? " " : numAdjMines}
    </div>
  );
};

export default Tile;
