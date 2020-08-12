<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <router-view />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  components: {
    Loading,
  },
  methods: {},
};
</script>

<style lang="scss"></style>
