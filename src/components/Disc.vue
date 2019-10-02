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
    </div>
    <div class="media-right"></div>
  </article>
</template>

<script>
export default {
  props: {
    disc: Object
  }
};
</script>

<style lang="scss" scoped>
.media {
  background: white;
  padding: 1em;
}

.image {
  overflow: hidden;
}
</style>