<template>
  <div class="page">
    <div class="congratulations" v-if="solved">
      <span v-for="n in 20" class="confetti" :key="n"></span>
      <h1 class="bounce-in-top">You solved the puzzle!</h1>
    </div>
    <h1 v-else>Solve the puzzle</h1>
    <div class="game">
      <div class="board nes-container is-rounded">
        <h2>Puzzle</h2>
        <div class="frame-wrapper">
          <div class="frame">
            <Tile
              v-for="tile in tiles"
              :key="tile.position"
              :tile="tile"
              v-on="{ move: !solved ? moveTile : false }"
              ref="tiles"
            />
          </div>
        </div>
      </div>
      <div class="example nes-container is-rounded">
        <h2>Preview</h2>
        <img :src="image" alt="original image" class="original-image" />
        <div>
          <p>Moves: {{ moves }}</p>
          <p>Highscore: {{ highscore }}</p>
          <button
            v-if="solved"
            class="nes-btn is-success"
            @click="startGame(tiles)"
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from "@/components/Tile";
import image from "@/assets/monks.jpg";
import checkSolvability, { GRID_COUNT } from "@/util/checkSolvability";
import isPuzzleSolved from "@/util/isPuzzleSolved";

export default {
  name: "Game",
  components: { Tile },
  data() {
    return {
      image: image,
      size: {
        horizontal: GRID_COUNT,
        vertical: GRID_COUNT
      },
      tiles: [],
      tileSize: {
        width: 0,
        height: 0
      },
      moves: 0,
      highscore: 0
    };
  },
  computed: {
    totalTiles() {
      return this.size.horizontal * this.size.vertical;
    },

    solved() {
      return isPuzzleSolved(this.tiles, this.totalTiles);
    }
  },
  beforeMount() {
    const img = new Image();
    img.onload = () => {
      this.tileSize.width = Math.floor(img.width / this.size.horizontal);
      this.tileSize.height = Math.floor(img.height / this.size.vertical);
      this.generateTiles();
      this.startGame(this.tiles);
    };
    img.src = this.image;
  },
  methods: {
    generateTiles() {
      for (let i = 0; i < this.totalTiles; ++i) {
        this.tiles.push({
          styles: {
            background: i === 0 ? "transparent" : `url(${this.image})`,
            backgroundPositionX: `-${(i % this.size.horizontal) *
              this.tileSize.width}px`,
            backgroundPositionY: `-${Math.floor(i / this.size.horizontal) *
              this.tileSize.height}px`,
            width: `${this.tileSize.width}px`,
            height: `${this.tileSize.height}px`,
            order: i
          },
          position: i,
          isEmpty: i === 0
        });
      }
    },
    startGame(tiles) {
      this.highscore = 10000;
      this.moves = 0;
      this.tiles = this.getSolvableTiles(tiles);
    },

    getSolvableTiles(tiles, tries = 0) {
      if (tries === 30) {
        return [];
      }

      const shuffledTiles = this.shuffleTiles(tiles);
      if (
        checkSolvability(shuffledTiles) &&
        !isPuzzleSolved(shuffledTiles, this.totalTiles)
      ) {
        return shuffledTiles;
      }

      return this.getSolvableTiles(tiles, tries + 1);
    },

    shuffleTiles(array) {
      // Fisher-Yates shuffle
      let currentIndex, temporaryValue, randomIndex;

      currentIndex = array.length;

      // While there remain elements to shuffle
      while (0 !== currentIndex) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap the style order with the current element
        temporaryValue = array[currentIndex].styles.order;
        array[currentIndex].styles.order = array[randomIndex].styles.order;
        array[randomIndex].styles.order = temporaryValue;
      }

      return array;
    },
    moveTile(tile) {
      // Find the 4 direct (non-diagonal) neighbour tiles and see if any of them is the empty tile
      if (tile.isEmpty) {
        return false;
      }
      const target = this.tiles.find(t => {
        return (
          t.isEmpty && this.getAdjacentOrders(tile).indexOf(t.styles.order) > -1
        );
      });

      if (target) {
        this.switchTiles(target, tile);
        this.moves++;
        this.highscore -= 10;
      }
    },

    switchTiles(a, b) {
      [a.styles.order, b.styles.order] = [b.styles.order, a.styles.order];
    },
    getAdjacentOrders(tile) {
      const positionTile = tile.styles.order;
      let adjacentTiles = [];

      adjacentTiles = [
        positionTile % this.size.horizontal ? positionTile - 1 : null,
        (positionTile + 1) % this.size.horizontal ? positionTile + 1 : null,
        positionTile - this.size.horizontal,
        positionTile + this.size.horizontal
      ];

      return adjacentTiles;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/_animations.scss";

.page {
  margin-top: 50px;
  text-align: center;
}

.game {
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.original-image {
  max-width: 200px;
  max-height: 200px;
}

.frame-wrapper {
  width: 500px;
  height: 500px;
}

.frame {
  display: flex;
  flex-wrap: wrap;
  background-size: cover;
}
</style>
