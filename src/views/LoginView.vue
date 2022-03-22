<template>
  <div>Login</div>
  <v-btn @click="loginClicked()">Iniciar sesion</v-btn>
  <v-snackbar v-model="showError">Error al conectar con el servidor</v-snackbar>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  data() {
    return {
      showError: false as boolean,
    };
  },
  methods: {
    loginClicked() {
      this.store
        .login()
        .then((resp) => {
          if (resp.data) {
            this.store.$patch({
              user: resp.data,
            });
            this.$router.push({ name: "list" });
            localStorage.setItem("userToken", JSON.stringify(resp.data.token));
          } else {
            console.log("login error");
          }
        })
        .catch((error) => {
          console.log(error);
          this.showError = true;
        });
    },
  },
});
</script>
