import { STATUSES } from "../constants";

//To get Mine Positions
export const getMinePosition = (boardSize, numMines) => {
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

export const getAdjacentMines = (tile, board) => {
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

export const checkIfwon = (board) => {
  return board.every((row) => {
    return row.every((title) => {
      return (
        title.status === STATUSES.NUMBER ||
        (title.mine &&
          (title.status === STATUSES.HIDDEN ||
            title.status === STATUSES.MARKED))
      );
    });
  });
};

export const checkIfLose = (board) => {
  return board.some((row) => {
    return row.some((title) => {
      return title.status === STATUSES.MINE;
    });
  });
};
