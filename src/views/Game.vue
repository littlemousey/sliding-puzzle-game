<template>
  <div class="page">
    <h1 class="bounce-in-top" v-if="solved">You solved the puzzle!</h1>
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
              @move="moveTile(tile)"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from "@/components/Tile";
import image from "@/assets/monks.jpg";

export default {
  name: "Game",
  components: { Tile },
  data() {
    return {
      image: image,
      size: {
        horizontal: 4,
        vertical: 4
      },
      tiles: [],
      tileSize: {
        width: 0,
        height: 0
      },
      moves: 0
    };
  },
  computed: {
    totalTiles() {
      return this.size.horizontal * this.size.vertical;
    },

    solved() {
      if (!this.tiles.length) {
        return false;
      }
      for (let i = 0; i < this.totalTiles; ++i) {
        if (this.tiles[i].styles.order !== this.tiles[i].position) {
          return false;
        }
      }
      return true;
    }
  },
  beforeMount() {
    const img = new Image();
    img.onload = () => {
      this.tileSize.width = Math.floor(img.width / this.size.horizontal);
      this.tileSize.height = Math.floor(img.height / this.size.vertical);
      this.generateTiles();
      //this.shuffleTiles();
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

    shuffleTiles() {
      // todo
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
.page {
  margin-top: 50px;
  text-align: center;
}

.game {
  margin-top: 200px;
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

.bounce-in-top {
  -webkit-animation: bounce-in-top 1.1s both;
  animation: bounce-in-top 1.1s both;
}

// for firefox
@-webkit-keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
    transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
    transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
@keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
    transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
    transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
</style>