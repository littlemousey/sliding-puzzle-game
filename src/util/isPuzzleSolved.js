export default function isPuzzleSolved(tiles, totalTiles) {
  if (!tiles.length) {
    return false;
  }
  for (let i = 0; i < totalTiles; ++i) {
    if (tiles[i].styles.order !== tiles[i].position) {
      return false;
    }
  }
  return true;
}
