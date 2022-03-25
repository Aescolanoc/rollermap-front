<template>
  <div>Login</div>
  <v-form @submit.prevent="loginClicked">
    <v-text-field v-model="email" label="E-mail" required></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      label="Password"
      @click:append="show1 = !show1"
      required
    ></v-text-field>
  </v-form>
  <v-btn @click="loginClicked()">Iniciar sesion</v-btn>
  <v-btn color="purple-darken-3" variant="text" @click="registerClicked"> Registrate aquí </v-btn>
  <v-snackbar v-model="showError">Error al iniciar sesion, intentelo de nuevo</v-snackbar>
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
      show1: false,
    };
  },
  methods: {
    async loginClicked() {
      try {
        let response = await this.store.login({ email: this.email, password: this.password });
        if (response) {
          this.$router.push({ name: "rollerplaces" });
        }
      } catch (error) {
        this.showError = true;
      }
    },
    registerClicked() {
      this.$router.push({
        name: "register",
        params: { userId: "registerform" },
      });
    },
  },
});
</script>
