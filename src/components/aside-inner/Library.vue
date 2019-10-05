<template>
  <ul class="discs-list">
    <li
      class="disc-item"
      v-for="disc in discsDisplay"
      :key="disc.id"
      @click="nextDisc"
    >
      <figure class="image disc">
        <img :src="disc.cover_image" />
      </figure>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    addedDiscs: Array
  },

  data() {
    return {
      discsQueue: this.addedDiscs
    };
  },

  computed: {
    discsDisplay() {
      return this.discsQueue.slice(-5);
    }
  },

  methods: {
    nextDisc() {
      this.discsQueue.unshift(this.discsQueue.pop());
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translate3d(-100%, -50%, 0px);
  }

  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 50px);
  }
}

.discs-list {
  perspective: 100px;
  perspective-origin: 50% 10%;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.disc-item {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 30%;
  left: 50%;
  overflow: hidden;
  background: white;
  transition: all 0.5s;
  pointer-events: all;
  cursor: pointer;
  &:first-child {
    transform: translate3d(-50%, -50%, 50px);
    z-index: 3;
    opacity: 1;
    animation: 0.5s fadeIn;
  }

  &:nth-child(2) {
    transform: translate3d(-50%, -50%, 40px);
    z-index: 2;
    opacity: 0.9;
  }

  &:nth-child(3) {
    transform: translate3d(-50%, -50%, 30px);
    z-index: 1;
    opacity: 0.8;
  }

  &:nth-child(n + 4) {
    opacity: 0;
    z-index: 0;
    transform: translate3d(-50%, -50%, 20px);
  }
}
</style>