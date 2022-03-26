<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

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
import { getUserId } from "./helpers/utils";
import { useRollerMapStore } from "./stores/store";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  created() {
    this.checkUser();
  },
  methods: {
    checkUser() {
      const userId = getUserId();
      if (userId && !this.store.user?._id && typeof userId === "string") {
        this.store.getUserDetails(userId);
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
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter,
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
