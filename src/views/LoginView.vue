<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <div>Login</div>
          <v-form @submit.prevent="loginClicked">
            <v-text-field v-model="email" label="E-mail" required></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Contraseña"
              @click:append="show1 = !show1"
              required
            ></v-text-field>
          </v-form>
          <v-btn @click="loginClicked()">Iniciar sesion</v-btn>
          <v-btn color="purple-darken-3" variant="text" @click="registerClicked"> Registrate aquí </v-btn>
        </v-col>
        <v-col cols="6">
          <div class="login-image"></div>
          <!-- <img src="../assets/img/login.jpg" alt="No hay pistas que mostrar" /> -->
        </v-col>
      </v-row>
      <v-snackbar v-model="showError">Error al iniciar sesion, intentelo de nuevo</v-snackbar>
    </v-container>
  </v-main>
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
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.login-image {
  height: 100%;
  width: 100%;
  background-image: url("../assets/img/login.jpg");
}
</style>
