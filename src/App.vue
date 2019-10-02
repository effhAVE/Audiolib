<template>
  <div class="container" id="app">
    <header class="header">
      <h1 class="title">Audiopółka™</h1>
    </header>
    <main class="hero">
      <div class="hero-body is-centered">
        <Form @resultsReceived="showResults" />
      </div>
    </main>
    <Modal
      :active.sync="showModal"
      :isLoading="isLoading"
      :discs="discs"
      :pagination="pagination"
      @paginationChange="getNewList"
    />
  </div>
</template>

<script>
import Form from "./components/Form.vue";
import Modal from "./components/Modal.vue";
import APIRequest from "./API";

export default {
  name: "app",
  components: {
    Form,
    Modal
  },
  data() {
    return {
      showModal: false,
      isLoading: false,
      discs: [],
      pagination: {},
      query: {}
    };
  },

  methods: {
    showResults(event) {
      this.discs = event.results;
      this.pagination = event.pagination;
      this.query = event.query;
      this.showModal = true;
      this.isLoading = false;
    },
    async getNewList(event) {
      this.isLoading = true;
      let response = await APIRequest(this.query, event);
      this.showResults(response);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.hero-body.is-centered {
  display: flex;
  justify-content: center;
}

.input.capitalize {
  text-transform: capitalize;
}

.header {
  margin: 2em 0;
}

.animation-content.modal-content {
  padding: 2em;
  overflow-x: hidden;
}

.pagination {
  margin-top: 2em !important;
  .pagination-link {
    background: white;
  }
}
</style>
