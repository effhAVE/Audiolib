<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="disc.cover_image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ disc.title }}</strong>
          <br />
          <small
            >{{ disc.year }}
            <span v-if="disc.country !== 'Unknown'">
              - {{ disc.country }}
            </span></small
          >
          <br />
        </p>
      </div>
      <div class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <b-button
            @click="discAdded"
            :class="isAdded ? 'is-success' : 'is-primary'"
            :icon-right="isAdded ? 'check' : 'plus'"
            >{{ buttonText }}</b-button
          >
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    disc: Object
  },

  data() {
    return {
      isAdded: false
    };
  },

  computed: {
    buttonText() {
      return this.isAdded ? "W bibliotece " : "Dodaj";
    }
  },

  methods: {
    discAdded() {
      this.isAdded = !this.isAdded;
    }
  }
};
</script>

<style lang="scss" scoped>
.media {
  background: white;
  padding: 1em;
  display: flex;
  align-items: stretch;
  .media-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.image {
  overflow: hidden;
  display: flex;
  align-items: center;
}

.button {
  transition: all 0.3s;
}
</style>