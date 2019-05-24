export const GRID_COUNT = 4;

export default function isSolvable(tiles) {
  const inversionCount = getInvCount(tiles);
  if (GRID_COUNT % 2 === 1) {
    return inversionCount % 2 === 0;
  }

  const positionBlankTile = findXPosition(tiles);
  const rowPositionBlankTile = Math.ceil(positionBlankTile / GRID_COUNT);
  if (rowPositionBlankTile % 2 == 1) {
    return inversionCount % 2 == 1;
  } else {
    return inversionCount % 2 == 0;
  }
}

function findXPosition(tiles) {
  const blankTile = tiles.find(tile => tile.isEmpty);
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
