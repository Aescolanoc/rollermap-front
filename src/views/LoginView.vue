<template>
  <v-main class="login-wrapper">
    <v-row class="h100 ma-0" align="center">
      <v-col xs="12" sm="12" md="6" lg="6" class="pa-0">
        <img
          class="login-logo"
          src="../assets/img/login-logo.png"
          alt="RollerMap logo"
          srcset="../assets/img/login-logo.png 1x, ../assets/img/login-logo@2x.png 2x"
        />
        <div class="login-form">
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
          <div class="login-buttons">
            <v-btn class="login-buttons_login" color="deep-purple" @click="loginClicked()">Iniciar sesion</v-btn>
            <v-btn class="login-buttons_register" color="purple-darken-3" variant="text" @click="registerClicked"
              >Registrate aquí</v-btn
            >
          </div>
        </div>
      </v-col>
      <v-col cols="6" class="pa-0" align-self="start">
        <div class="login-image hidden-xs hidden-sm"></div>
      </v-col>
    </v-row>
    <v-snackbar color="red" v-model="showError">Error al iniciar sesion, intentelo de nuevo</v-snackbar>
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
.login-wrapper {
  .login-logo {
    width: 350px;
    height: auto;
    margin: 0 auto 20px auto;
    display: block;
  }

  .login-form {
    max-width: 350px;
    height: auto;
    margin: 0 auto;
    display: block;
  }
  .login-image {
    height: calc(100vh - 88px);
    width: 100%;
    background-image: url("../assets/img/login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .login-buttons {
    text-align: center;
  }

  .h100 {
    height: 100%;
  }
}
</style>
