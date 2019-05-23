export default function isSolvable(tiles) {
  const inversionCount = getInvCount(tiles);
  const positionBlankTile = findXPosition(tiles);
  const rowPositionBlankTile = Math.floor(positionBlankTile / 4);
  if (rowPositionBlankTile % 2 == 1) return inversionCount % 2 == 1;
  else return inversionCount % 2 == 0;
}

function findXPosition(tiles) {
  const blankTile = tiles.filter(tile => tile.position === 0);
  return blankTile[0].styles.order;
}

function getInvCount(tiles) {
  let invertCount = 0;
  for (let i = 0; i < 4 * 4 - 1; i++) {
    if (tiles[i].styles.order > tiles[i + 1].styles.order) {
      invertCount++;
    }
  }
  return invertCount;
}
