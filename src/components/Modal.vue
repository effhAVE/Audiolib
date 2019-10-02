<template>
  <b-modal v-if="isActive" :active.sync="isActive" @close="onClose">
    <b-loading
      :is-full-page="true"
      :active="isLoading"
      :can-cancel="false"
    ></b-loading>
    <transition-group v-if="!isLoading" name="list" appear>
      <Disc
        v-for="disc in discs"
        :disc="disc"
        :key="disc.id"
        class="list-item"
      />
    </transition-group>
    <b-pagination
      :total="pagination.items"
      :current.sync="pagination.page"
      :per-page="pagination.per_page"
      :order="`is-centered`"
      v-if="!isLoading"
      @change="onChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </b-pagination>
  </b-modal>
</template>

<script>
import Disc from "./Disc.vue";

export default {
  components: {
    Disc
  },
  props: {
    active: Boolean,
    isLoading: Boolean,
    discs: Array,
    pagination: Object
  },

  data() {
    return {
      isActive: this.active
    };
  },

  watch: {
    active() {
      this.isActive = this.active;
    }
  },

  methods: {
    onChange(event) {
      this.$emit("paginationChange", event);
    },
    onClose() {
      this.$emit("update:active", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>