<template>
  <div
    class="tile"
    :style="tile.styles"
    @click="move"
    :class="{ empty: tile.isEmpty }"
    :disabled="tile.isEmpty"
  />
</template>

<script>
export default {
  name: "tile",
  props: ["tile"],
  methods: {
    move() {
      this.$emit("move", this.tile);
    }
  }
};
</script>

<style lang="scss">
.tile {
  border: 1px solid #111;

  &.empty {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px inset;

    &:hover {
      border-color: #111;
      cursor: default;
    }
  }

  &:hover {
    border-color: yellow;
    cursor: pointer;
  }
}
</style>
