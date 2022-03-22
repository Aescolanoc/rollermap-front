<template>
  <div>
    <v-btn @click="RegisterClicked()">registro</v-btn>
    <v-snackbar v-model="showError"
      >Error al conectar con el servidor</v-snackbar
    >
  </div>
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
    RegisterClicked() {
      console.log("registro de usuario");
    },
  },
});
</script>
