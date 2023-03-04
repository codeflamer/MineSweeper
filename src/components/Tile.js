import { GameState, STATUSES } from "../constants";
import { checkIfLose, checkIfwon, getAdjacentMines } from "./helpers";

const Tile = ({
  tileData,
  setBoardState,
  setNumMines,
  boardState,
  setStopProp,
  stopProp,
  setGameStatus,
}) => {
  const rightClick = (e) => {
    if (stopProp) return;
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
  };

  const checkGameEnd = () => {
    if (stopProp) return;
    const win = checkIfwon(boardState);
    const lose = checkIfLose(boardState);

    if (win || lose) {
      setStopProp(true);
    }

    if (win) {
      setGameStatus(GameState.WIN);
    }
    if (lose) {
      setGameStatus(GameState.LOSE);
      //After you Lose, Reveal all the mines
      let response = boardState.map((board) => {
        board?.map((tile) => {
          if (tile.mine === true) {
            tile.status = STATUSES.MINE;
          }
          return tile;
        });

        return board;
      });
      setBoardState(response);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-10 h-10  text-white hover:cursor-pointer rounded-md drop-shadow-lg
      ${tileData?.status === STATUSES.MARKED && `bg-yellow-500`} 
      ${tileData?.status === STATUSES.HIDDEN && `bg-white`} 
      ${tileData?.status === STATUSES.MINE && `bg-red-500`} 
      ${tileData?.status === STATUSES.NUMBER && `bg-blue-800`}`}
      onContextMenu={(e) => {
        rightClick(e);
        checkGameEnd();
      }}
      onClick={(e) => {
        RevealTiles(boardState, tileData);
        checkGameEnd();
      }}
    >
      <span className="font-bold text-[24px]">
        {tileData.AdjacentMines === 0 ? " " : tileData.AdjacentMines}
      </span>
    </div>
  );
};

export default Tile;
