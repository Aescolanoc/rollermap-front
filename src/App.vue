<template>
  <v-app>
    <router-view />

    <v-footer class="bg-indigo-lighten-1 text-white text-center d-flex flex-column">
      <div>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 text-white" :icon="icon" variant="text"></v-btn>
      </div>

      <div class="text-white">{{ new Date().getFullYear() }} — Made with 🛼 by Mel</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
});
</script>

<style lang="scss">
html,
body {
  min-height: 100vh;
}
</style>
