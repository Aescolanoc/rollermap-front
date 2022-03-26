<template>
  <div>
    <v-form>
      <v-text-field v-model="place.name" :counter="10" label="Nombre" required></v-text-field>
      <v-textarea solo v-model="place.description" name="description" label="Descripción" required></v-textarea>
      <v-text-field v-model="place.city" label="Nombre" required></v-text-field>
      <v-select v-model="place.type" :items="type" label="Tipo" required></v-select>
      <v-select v-model="place.level" :items="level" label="Dificultad" required></v-select>
      <v-file-input label="Añadir imagen" filled prepend-icon="mdi-camera"></v-file-input>
      <v-checkbox v-model="place.slalom" label="Slalom" required></v-checkbox>
      <v-btn color="success" class="mr-4" @click.prevent="saveClicked">{{ routeId ? "Actualizar" : "Crear" }}</v-btn>
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
      type: ["pista", "ruta"],
      level: ["baja", "intermedia", "alta"],
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
        location: [-3.68307, 40.41317],
        type: PlaceType.RINK,
        slalom: false,
        city: "",
        image: "https://i.imgur.com/dsz1dCN.png",
        level: PlaceLevel.BEGINNER,
        author: this.store.user._id,
      };
    }
  },
  methods: {
    async saveClicked() {
      if (this.routeId && this.place._id) {
        await this.store.updateRollerPlace(this.place._id, this.place);
      } else {
        await this.store.createRollerPlace(this.place);
      }
    },
  },
});
</script>
