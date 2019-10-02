<template>
  <form action="">
    <b-field grouped>
      <b-field label="Wykonawca" :label-position="labelPosition">
        <b-input
          placeholder="Nirvana"
          custom-class="capitalize"
          v-model="artist"
          name="artist"
        ></b-input>
      </b-field>

      <b-field label="Tytuł" :label-position="labelPosition">
        <b-input
          placeholder="Smells Like Teen Spirit"
          custom-class="capitalize"
          v-model="title"
        >
        </b-input>
      </b-field>
    </b-field>

    <b-field label="Kod kreskowy" :label-position="labelPosition">
      <b-input placeholder="DGCD-24425" v-model="catNumber"></b-input>
    </b-field>

    <b-field label="Kod katalogowy" :label-position="labelPosition">
      <b-input placeholder="7 2064-24425-2 4" v-model="barcode"> </b-input>
    </b-field>
    <b-tooltip
      label="Wprowadź dane"
      position="is-bottom"
      :active="!dataEntered"
    >
      <b-button
        type="is-primary"
        native-type="submit"
        size="is-medium"
        :disabled="!dataEntered"
        @click.prevent="search"
        >Wyszukaj</b-button
      >
    </b-tooltip>
  </form>
</template>

<script>
import APIRequest from "../API";

export default {
  data() {
    return {
      labelPosition: "inside",
      artist: "",
      title: "",
      catNumber: "",
      barcode: ""
    };
  },
  computed: {
    dataEntered() {
      return !!(this.artist || this.title || this.catNumber || this.barcode);
    }
  },
  methods: {
    async search() {
      let response = await APIRequest({
        artist: this.artist,
        title: this.title
      });

      this.$emit("resultsReceived", response);
      console.log(response);
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  max-width: 960px;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
}

.field {
  flex-grow: 2;
}

.button {
  width: 100%;
}
</style>