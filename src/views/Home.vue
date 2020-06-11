<template>
  <div id="home">
    <h1>ad</h1>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    console.log(process.env.VUE_APP_API);
  }
};
</script>
