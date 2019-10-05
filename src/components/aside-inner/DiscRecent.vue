<template>
  <li class="media">
    <figure class="media-left">
      <p class="image is-48x48">
        <img :src="disc.cover_image" />
      </p>
    </figure>
    <div class="media-content">
      <strong>{{ disc.title }}</strong>
      <p>{{ disc.year }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    disc: Object
  },
  data() {
    return {};
  }
};
</script>