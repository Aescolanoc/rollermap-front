<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :counter="10" label="Nombre" required></v-text-field>
      <v-textarea solo v-model="description" name="description" label="Descripción" required></v-textarea>
      <v-select v-model="SelectType" :items="type" label="Tipo" required></v-select>
      <v-select v-model="SelectLevel" :items="level" label="Dificultad" required></v-select>
      <v-file-input label="File input" filled prepend-icon="mdi-camera"></v-file-input>
      <v-checkbox v-model="checkbox" label="Slalom" required></v-checkbox>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="insertRollerPlace"> Añadir </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type RollerPlace from "@/types/RollerPlace";
import { PlaceType, PlaceLevel } from "@/helpers/rollerMapEnums";
// import { initializeApp } from "firebase/app";
// import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
// import { firebaseconfig } from "@/config";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  data() {
    return {
      place: {} as RollerPlace,
      valid: true,
      name: "",

      description: "",
      SelectType: "pista",
      SelectLevel: "baja",
      type: ["pista", "ruta"],
      level: ["baja", "intermedia", "alta"],
      checkbox: false,
    };
  },
  props: {
    routeId: {
      type: String as PropType<string>,
    },
  },
  created() {
    if (this.routeId) {
      let placeFound = this.store.rollerPlaces.find((e) => e._id === this.routeId);
      if (placeFound) {
        this.place = placeFound;
      }
    } else {
      this.place = {
        name: "",
        description: "",
        location: [],
        type: PlaceType.RINK,
        slalom: false,
        city: "",
        image: "",
        level: PlaceLevel.BEGINNER,
        author: "",
      };
    }
  },
  methods: {
    uploadPicture() {
      // console.log(import.meta.env.VITE_FIREBASE_APIKEY);
    },
    insertRollerPlace() {
      console.log("hola");
    },
  },
});
</script>
