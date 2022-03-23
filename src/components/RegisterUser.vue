<template>
  <div>
    registro
    <v-form @submit.prevent="registerClicked">
      <v-text-field v-model="name" label="name" required></v-text-field>
      <v-text-field v-model="email" label="E-mail" required></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        @click:append="show1 = !show1"
        required
      ></v-text-field>
      <v-text-field
        v-model="password2"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        label="Confirmar password"
        @click:append="show2 = !show2"
        required
      ></v-text-field>
    </v-form>
    <v-btn @click="registerClicked()">Registro</v-btn>
    <v-snackbar v-model="showError">Las contraseñas no coinciden</v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRollerMapStore } from "@/stores/store";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  data() {
    return {
      showError: false as boolean,
      name: "",
      email: "",
      password: "",
      password2: "",
      show1: false,
      show2: false,
    };
  },
  methods: {
    registerClicked() {
      if (this.password === this.password2) {
        let user = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        this.store.register(user);
        this.$router.push({ name: "login" });
      } else {
        this.showError = true;
      }
    },
  },
});
</script>
