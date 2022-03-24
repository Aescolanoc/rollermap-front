<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon color="purple-darken-3"></v-app-bar-nav-icon>
      </template>
      <img
        class="logo"
        src="./assets/img/rollermap_logo.png"
        srcset="./assets/img/rollermap_logo.png 1x, ./assets/img/rollermap_logo@2x.png 2x"
        alt="RollerMap logo"
      />
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="purple-darken-3">mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="purple-darken-3" @click="MyPlacesClicked">mdi-heart</v-icon>
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
    <v-footer class="bg-indigo-lighten-1 text-white text-center d-flex flex-column">
      <div>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 text-white" :icon="icon" variant="text"></v-btn>
      </div>

      <v-divider></v-divider>

      <div class="text-white">{{ new Date().getFullYear() }} — Made with ❤️ by Mel</div>
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
  methods: {
    MyPlacesClicked() {
      let token: any = localStorage.getItem("userToken");
      if (token) {
        this.$router.push({ name: "myrollerplaces" });
      }
    },
  },
});
</script>

<style lang="scss">
html,
body {
  min-height: 100vh;
}

.logo {
  height: auto;
  width: 150px;
}
</style>
