<template>
  <ul class="discs-list">
    <li
      class="disc-item"
      v-for="(disc, index) in discsDisplay"
      :key="disc.id"
      @click="showDetails(index)"
    >
      <figure class="image disc">
        <img :src="disc.cover_image" :alt="disc.title" />
        <transition name="slide" appear>
          <figcaption v-if="active === index">
            <div class="container">
              <h2 class="title is-5">{{ disc.title }}</h2>
              <p>
                <span class="has-text-weight-bold">Kraj: </span>
                {{ disc.country }}
              </p>
              <p>
                <span class="has-text-weight-bold">Rok: </span>
                {{ disc.year }}
              </p>
              <p>
                <span class="has-text-weight-bold">Typ: </span>
                {{ disc.type }}
              </p>
              <div v-if="disc.genre">
                <p>
                  <span class="has-text-weight-bold">Tagi: </span>

                  <span
                    class="tags"
                    v-for="(tag, index) in disc.genre"
                    :key="index"
                  >
                    <span class="tag is-small is-dark">{{ tag }}</span>
                  </span>
                </p>
              </div>
            </div>
          </figcaption>
        </transition>
      </figure>
    </li>
    <button class="list-button next-disc is-primary" @click="nextDisc">
      <b-icon :icon="'arrow-right'"> </b-icon>
    </button>
    <button class="list-button prev-disc is-primary" @click="prevDisc">
      <b-icon :icon="'arrow-left'"> </b-icon>
    </button>
  </ul>
</template>

<script>
export default {
  props: {
    addedDiscs: Array
  },

  data() {
    return {
      discsQueue: this.addedDiscs,
      active: null
    };
  },

  computed: {
    discsDisplay() {
      return this.discsQueue.slice(-4);
    }
  },

  methods: {
    nextDisc() {
      this.discsQueue.unshift(this.discsQueue.pop());
    },

    prevDisc() {
      this.discsQueue.push(this.discsQueue.shift());
    },

    showDetails(id) {
      if (id === this.active) {
        this.active = null;
        return;
      }

      this.active = id;
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

@keyframes slideUp {
  0% {
    opacity: 0;
  }

  50% {
    transform: translate3d(100%, 0, 0px);
  }

  75% {
    opacity: 1;
  }

  100% {
    transform: none;
  }
}

.slide-enter-active {
  animation: 0.5s slideUp;
}

.slide-leave-active {
  animation: 0.5s slideUp reverse;
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
  background: white;
  transition: all 0.5s;
  pointer-events: all;
  cursor: pointer;
  .image,
  .image img {
    height: inherit;
    width: 100%;
  }
  figcaption {
    z-index: 5;
    width: 100%;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    background: #e2e2e2;
    padding: 0.5em 1em;
    .container {
      transform: perspective(1px) scale(0.8);
      margin: 0 auto;
    }
    .title {
      text-align: center;
    }
  }

  &:first-child {
    transform: translate3d(-50%, -50%, 50px);
    z-index: 3;
    opacity: 1;
    animation: 0.3s fadeIn;
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

.list-button {
  pointer-events: all;
  display: inline-block;
  background: rgba(10, 10, 10, 0.2);
  border-radius: 50%;
  padding: 2em;
  position: absolute;
  top: 50%;
  color: white;
  transition: all 0.3s;
  z-index: 9;
  cursor: pointer;
  &.is-primary {
    background: darken(#7957d5, 10);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    &:hover {
      background: darken(#7957d5, 15);
    }
  }

  &:hover {
    background: rgba(10, 10, 10, 0.3);
  }

  & > .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.next-disc {
  right: 10%;
}

.prev-disc {
  left: 10%;
}
</style>