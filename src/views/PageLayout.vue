<template>
  <v-main>
    <v-app-bar>
      <img
        class="logo"
        src="../assets/img/rollermap_logo.png"
        srcset="../assets/img/rollermap_logo.png 1x, ../assets/img/rollermap_logo@2x.png 2x"
        alt="RollerMap logo"
      />

      <v-spacer></v-spacer>

      <div class="hidden-xs">
        <v-menu botton>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon class="user-menu" color="purple-darken-3">mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list v-if="store.user">
            <v-list-item v-if="store.user.name">
              <v-list-item-title>{{ store.user.name }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!isGuest" class="user-menu_edit" @click="profileClicked">
              <v-list-item-title>Editar perfil</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="!isGuest" class="user-menu_logout" @click="store.userLogOut">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isGuest" class="user-menu_logout" @click="signIn">
              <v-list-item-title>Registrarse</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn variant="text" color="purple-darken-3" @click="placesClicked">Sitios</v-btn>
        <v-btn v-if="!isGuest" variant="text" color="purple-darken-3" @click="MyPlacesClicked">Mis sitios</v-btn>
      </div>

      <template v-slot:append>
        <div class="hidden-sm hidden-md hidden-lg hidden-xl">
          <v-app-bar-nav-icon
            color="purple-darken-3"
            @click.stop="mobileMenuVisible = !mobileMenuVisible"
          ></v-app-bar-nav-icon>
        </div>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="mobileMenuVisible" temporary>
      <v-list nav dense density="compact">
        <v-list-item active-color="primary" @click.prevent="placesClicked">
          <v-list-item-avatar start>
            <v-icon icon="mdi-rollerblade"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title> Sitios</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isGuest" active-color="primary" @click.prevent="MyPlacesClicked">
          <v-list-item-avatar start>
            <v-icon icon="mdi-heart"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title> Mis Sitios</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isGuest" active-color="primary" @click="store.userLogOut">
          <v-list-item-avatar start>
            <v-icon icon="mdi-logout"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title> Cerrar sesión</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="isGuest" active-color="primary" @click="signIn">
          <v-list-item-avatar start>
            <v-icon icon="mdi-login"></v-icon>
          </v-list-item-avatar>
          <v-list-item-title> Registro</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid>
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRollerMapStore } from "../stores/store";
import { guestUser } from "@/config";

export default defineComponent({
  name: "App",
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  data() {
    return {
      mobileMenuVisible: false,
      selectedMobileMenu: null,
    };
  },
  computed: {
    isGuest() {
      let userType = false;
      if (this.store.user._id === guestUser.id) {
        userType = true;
      }
      return userType;
    },
  },
  methods: {
    signIn() {
      this.$router.push({ name: "register" });
    },
    MyPlacesClicked() {
      let token: string | null = sessionStorage.getItem("userToken");
      if (token) {
        this.$router.push({ name: "myrollerplaces" });
      }
    },
    placesClicked() {
      let token: string | null = sessionStorage.getItem("userToken");
      if (token) {
        this.$router.push({ name: "rollerplaces" });
      }
    },
    profileClicked() {
      let token: string | null = sessionStorage.getItem("userToken");
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

<style lang="scss" scoped>
.logo {
  height: auto;
  width: 150px;
}
</style>
