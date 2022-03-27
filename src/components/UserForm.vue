<template>
  <div class="user-form mt-8">
    <v-form @submit.prevent="registerClicked">
      <img
        v-if="!userId"
        class="login-logo"
        src="../assets/img/login-logo.png"
        alt="RollerMap logo"
        srcset="../assets/img/login-logo.png 1x, ../assets/img/login-logo@2x.png 2x"
      />
      <h3 v-else>Editar perfil de {{ store.user.name }}</h3>
      <v-text-field v-model="user.name" label="Nombre" :placeholder="store.user.name" required></v-text-field>
      <template v-if="!userId">
        <v-text-field v-model="user.email" label="E-mail" required></v-text-field>
        <v-text-field
          v-model="user.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          label="Constraseña"
          @click:append="show1 = !show1"
          required
        ></v-text-field>
        <v-text-field
          v-model="password2"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          label="Confirmar contraseña"
          @click:append="show2 = !show2"
          required
        ></v-text-field>
        <div class="d-flex justify-center align-center">
          <v-checkbox color="deep-purple" v-model="checkbox" :label="checkboxLabel"></v-checkbox>
        </div>
      </template>
    </v-form>
    <div class="user-form_buttons mb-8">
      <v-btn v-if="userId" color="deep-purple" @click="updateClicked()">Confirmar</v-btn>
      <v-btn v-else color="deep-purple" @click="registerClicked()">Registro</v-btn>
    </div>

    <v-snackbar v-model="showError">{{ errorMessage }}</v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRollerMapStore } from "@/stores/store";
import type { PropType } from "vue";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  data() {
    return {
      showError: false as boolean,
      user: {
        name: "",
        email: "",
        password: "",
      },
      password2: "",
      checkboxLabel: "Acepto los Términos y Condiciones de Uso",
      checkbox: false,

      show1: false,
      errorMessage: "",
      show2: false,
    };
  },
  props: {
    userId: {
      type: String as PropType<string>,
    },
  },
  methods: {
    async registerClicked() {
      if (this.checkbox === true) {
        if (this.user.password === this.password2) {
          if (this.user.name !== "" && this.user.email !== "") {
            let newUser = {
              name: this.user.name,
              email: this.user.email,
              password: this.user.password,
            };

            await this.store.register(newUser);
            this.$router.push({ name: "login" });
          }
          this.showError = true;
          this.errorMessage = "Rellene todos los datos";
        } else {
          this.showError = true;
          this.errorMessage = "Las contraseñas no coinciden";
        }
      } else {
        this.showError = true;
        this.errorMessage = "Debe aceptar los terminos y condiciones";
      }
    },
    updateClicked() {
      let userToUpdate = { name: "" };
      if (this.user.name) {
        userToUpdate.name = this.user.name;
        this.store.updateUser(this.store.user._id, userToUpdate);
      }
    },
  },
});
</script>

<style lang="scss">
.user-form {
  width: 400px;
  margin: 0 auto;
  display: block;

  .login-logo {
    margin-bottom: 20px;
    width: 350px;
    height: auto;
    display: block;
  }
  .user-form_buttons {
    text-align: center;
  }
}
</style>
