<template>
  <div id="app">
    <header class="header">
      <h1 class="title">Audiopółka™</h1>
    </header>
    <main class="is-flex">
      <Aside :addedDiscs="addedDiscs" :recentlyAdded="recentlyAdded" />
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
          :addedDiscs="addedDiscs"
          @paginationChange="getNewList"
          @discAdded="onDiscAdded"
          @discRemoved="onDiscRemoved"
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
import * as storage from "./libraryStorage";

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
      addedDiscs: [],
      recentlyAdded: [],
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
    },
    onDiscAdded(event) {
      this.recentlyAdded.push(event);
      this.addedDiscs.push(event);
      storage.setStoredLibrary(this.addedDiscs);
    },
    onDiscRemoved(event) {
      this.addedDiscs = storage.removeStoredDisc(event);
      this.recentlyAdded = this.recentlyAdded.filter(el => el.id !== event.id);
    }
  },

  created() {
    this.addedDiscs = storage.getStoredLibrary();
  }
};
</script>

<style lang="scss">
html,
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

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
