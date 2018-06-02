<template>
  <Map/>
  <!--<Loading />-->

</template>

<script>
import Loading from "./Loading.vue";

export default {
  name: "App",
  components: {
    Loading,
    Map: () => ({
      // The component to load (should be a Promise)
      component: import(/* webpackChunkName: "map" */ "./Map.vue"),
      // A component to use while the async component is loading
      loading: Loading,
    }),
  },
};
</script>
