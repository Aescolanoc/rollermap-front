<template>
  <v-app>
    <v-app-bar>
      <img
        class="logo"
        src="./assets/img/rollermap_logo.png"
        srcset="./assets/img/rollermap_logo.png 1x, ./assets/img/rollermap_logo@2x.png 2x"
        alt="RollerMap logo"
      />

      <v-spacer></v-spacer>

      <div class="hidden-xs">
        <v-btn variant="text" @click="placesClicked">Sitios</v-btn>
        <v-btn variant="text" @click="MyPlacesClicked">Mis sitios</v-btn>

        <v-menu botton left>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon v-if="store.user.name" color="purple-darken-3">mdi-account-circle</v-icon>
              <v-icon v-else color="purple-darken-3">mdi-account-circle-outline</v-icon>
            </v-btn>
          </template>

          <v-list v-if="store.user">
            <v-list-item v-if="store.user.name">
              <v-list-item-title>{{ store.user.name }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="profileClicked">
              <v-list-item-title>Editar perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="store.userLogOut">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon>
          <v-icon color="purple-darken-3">mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon color="purple-darken-3">mdi-heart</v-icon>
        </v-btn>
      </div>

      <template v-slot:append>
        <div class="hidden-sm hidden-md hidden-lg hidden-xl">
          <v-app-bar-nav-icon color="purple-darken-3"></v-app-bar-nav-icon>
        </div>
      </template>
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
import { useRollerMapStore } from "./stores/store";

export default defineComponent({
  name: "App",
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
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
    placesClicked() {
      let token: any = localStorage.getItem("userToken");
      if (token) {
        this.$router.push({ name: "rollerplaces" });
      }
    },
    profileClicked() {
      let token: any = localStorage.getItem("userToken");
      if (token) {
        this.$router.push({
          name: "userform",
          params: { userId: this.store.user._id },
        });
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
