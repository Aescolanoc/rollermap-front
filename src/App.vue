<template>
  <v-app class="app-wrapper bg-grey-lighten-4">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

    <v-footer class="bg-grey-darken-4 text-white text-center d-flex flex-column app-wrapper_footer">
      <div>
        <v-btn
          class="mx-4 text-white"
          icon="mdi-linkedin"
          variant="text"
          @click.prevent="socialClicked('linkedIn')"
        ></v-btn>
        <v-btn
          class="mx-4 text-white"
          icon="mdi-github"
          variant="text"
          @click.prevent="socialClicked('gitHub')"
        ></v-btn>
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
    socialClicked(socialMedia: string) {
      switch (socialMedia) {
        case "linkedIn":
          window.open("https://www.linkedin.com/in/amalia-escolano/", "_blank");
          break;
        case "gitHub":
          window.open("https://github.com/aescolanoc", "_blank");
          break;
        default:
          break;
      }
    },
  },
});
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

html,
body {
  min-height: 100vh;
}

.app-wrapper {
  min-height: 100vh;

  .app-wrapper_footer {
    max-height: 88px;
  }
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
