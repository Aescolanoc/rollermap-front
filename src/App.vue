<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="purple-darken-3"></v-app-bar-nav-icon>
      </template>
      <img src="@/assets/logo.png" alt="" />
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="purple-darken-3">mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="purple-darken-3">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="purple-darken-3">mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer
      class="bg-indigo-lighten-1 text-white text-center d-flex flex-column"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 text-white"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>

      <v-divider></v-divider>

      <div class="text-white">
        {{ new Date().getFullYear() }} — Made with ❤️ by Mel
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

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
