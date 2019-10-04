<template>
  <div id="app">
    <header class="header">
      <h1 class="title">Audiopółka™</h1>
    </header>
    <main class="is-flex">
      <Aside />
      <div class="container">
        <div class="hero">
          <div class="hero-body is-centered">
            <Form @resultsReceived="showResults" />
          </div>
        </div>
        <Modal
          :active.sync="showModal"
          :isLoading="isLoading"
          :discs="discs"
          :pagination="pagination"
          @paginationChange="getNewList"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Form from "./components/Form.vue";
import Modal from "./components/Modal.vue";
import Aside from "./components/Aside.vue";
import APIRequest from "./API";

export default {
  name: "app",
  components: {
    Form,
    Modal,
    Aside
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

.hero {
  flex-direction: row;
  align-items: flex-start;
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
  margin-top: 2em;
  .pagination-link:not(.is-current) {
    background: white;
    transition: all 0.3s;
    &:hover {
      background-color: darken(white, 20);
    }
  }
}
</style>
