export const GRID_COUNT = 4;

export default function isSolvable(tiles) {
  const inversionCount = getInvCount(tiles);
  const positionBlankTile = findXPosition(tiles);
  const rowPositionBlankTile = Math.floor(positionBlankTile / GRID_COUNT) + 1;
  // check if the blank tile is on an even row counting from the bottom (therefore odd from the top)
  // and number of inversions is odd
  if (rowPositionBlankTile % 2 == 1) {
    return inversionCount % 2 == 1;
  } else {
    // blank tile is on an odd row counting from the bottom so number of inversions should be even
    return inversionCount % 2 == 0;
  }
}

function findXPosition(tiles) {
  const blankTile = tiles.find(tile => tile.position === 0);
  return blankTile.styles.order;
}

function getInvCount(tiles) {
  let invertCount = 0;
  for (let i = 0; i < GRID_COUNT * GRID_COUNT - 1; i++) {
    if (tiles[i].styles.order !== 0) {
      for (let j = i + 1; j < GRID_COUNT * GRID_COUNT - 1; j++) {
        if (
          tiles[i].styles.order !== 0 &&
          tiles[j].styles.order !== 0 &&
          tiles[i].styles.order > tiles[j].styles.order
        ) {
          invertCount++;
        }
      }
    }
  }
  return invertCount;
}
