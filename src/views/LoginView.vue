<template>
  <div>Login</div>
  <v-form @submit.prevent="loginClicked">
    <v-text-field v-model="email" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" label="Password" required></v-text-field>
  </v-form>
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
      email: "",
      password: "",
    };
  },
  methods: {
    loginClicked() {
      this.store
        .login({ email: this.email, password: this.password })
        .then((resp) => {
          if (resp.data) {
            this.store.$patch({
              user: resp.data,
            });
            this.$router.push({ name: "rollerplaces" });
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
