<template>
  <div>
    <v-form @submit.prevent="registerClicked">
      <v-text-field v-model="user.name" label="name" :placeholder="store.user.name" required></v-text-field>
      <v-text-field v-if="userId !== store.user._id" v-model="user.email" label="E-mail" required></v-text-field>
      <v-text-field
        v-if="userId !== store.user._id"
        v-model="user.password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        label="Password"
        @click:append="show1 = !show1"
        required
      ></v-text-field>
      <v-text-field
        v-if="userId !== store.user._id"
        v-model="password2"
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        label="Confirmar password"
        @click:append="show2 = !show2"
        required
      ></v-text-field>
      <div v-if="userId !== store.user._id" class="d-flex justify-center align-center">
        <v-checkbox v-model="checkbox" :label="checkboxLabel"></v-checkbox>
      </div>
    </v-form>
    <v-btn v-if="userId === store.user._id" @click="updateClicked()">Confirmar</v-btn>
    <v-btn v-else @click="registerClicked()">Registro</v-btn>
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
      checkboxLabel: "Acepto que he leído y comprendido los siguientes Términos y Condiciones de Uso",
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
    registerClicked() {
      if (this.checkbox === true) {
        if (this.user.password === this.password2) {
          if (this.user.name !== "" && this.user.email !== "") {
            let newUser = {
              name: this.user.name,
              email: this.user.email,
              password: this.user.password,
            };

            this.store.register(newUser);
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
