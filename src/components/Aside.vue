<template>
  <aside class="menu box" :class="isVisible ? 'is-visible' : ''">
    <a
      class="menu-close"
      :class="buttonColored ? 'is-primary' : ''"
      @click="isVisible = !isVisible"
    >
      <b-icon :icon="isVisible ? 'close' : 'menu-open'"> </b-icon>
    </a>
    <p class="menu-label">
      Panel użytkownika
    </p>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img
            src="https://www.hochschulsport.hu-berlin.de/de/studium-und-spitzensport/portraits/avatar/image_preview"
          />
        </p>
      </figure>
      <div class="media-content">
        <strong>Grzegorz Kowalczyk</strong>
        <p>Dodanych płyt: {{ addedDiscs.length }}</p>
      </div>
    </article>
    <b-button
      type="is-primary"
      icon-right="playlist-music"
      class="library-button"
      >Otwórz bibliotekę</b-button
    >
    <p class="menu-label">
      Ostatnio dodane
    </p>
    <ul class="box" v-if="recentlyAdded.length">
      <Disc v-for="disc in recentlyAdded" :key="disc.id" :disc="disc" />
    </ul>
  </aside>
</template>

<script>
import Disc from "./aside-inner/Disc-recent.vue";

export default {
  props: {
    addedDiscs: Array,
    recentlyAdded: Array
  },
  components: {
    Disc
  },
  data() {
    return {
      isVisible: false,
      buttonColored: false
    };
  }
};
</script>

<style lang="scss" scoped>
@keyframes pulse {
  0% {
    transform: scale(0.95), translateX(-100%);
    box-shadow: 0 0 0 0 rgba(121, 87, 213, 0.7);
  }

  70% {
    transform: scale(1), translateX(-100%);
    box-shadow: 0 0 0 10px rgba(121, 87, 213, 0);
  }

  100% {
    transform: scale(0.95), translateX(-100%);
    box-shadow: 0 0 0 0 rgba(121, 87, 213, 0);
  }
}

.menu {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  transition: transform 0.5s;
  background: white;
  border-radius: 0;
  height: 100%;
  z-index: 9;
  width: 300px;
  max-width: 300px;
  &.is-visible {
    transform: translateX(0);
  }
}

.menu-close {
  display: inline-block;
  background: rgba(10, 10, 10, 0.2);
  border-radius: 50%;
  padding: 1em;
  position: absolute;
  top: 1em;
  transform: translateX(100%);
  right: -1em;
  color: white;
  transition: all 0.3s;
  &.is-primary {
    background: #7957d5;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    animation: pulse 2s infinite;
    &:hover {
      background: darken(#7957d5, 5);
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

.media {
  align-items: center;
}

.library-button {
  width: 100%;
  margin: 2em 0;
}
</style>