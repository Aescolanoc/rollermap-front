<template>
  <div>
    <mapbox-map
      @click="mapClicked"
      :accessToken="mapboxToken"
      :center="place.location"
      height="300px"
      :zoom="15"
      mapStyle="streets-v11"
    >
      <mapbox-navigation-control position="top-right" />
      <mapbox-geolocate-control />
      <mapbox-marker :lngLat="place.location" />
    </mapbox-map>
    <v-form class="mt-8">
      <v-text-field v-model="place.name" :counter="10" label="Nombre" required></v-text-field>
      <v-textarea solo v-model="place.description" name="description" label="Descripción" required></v-textarea>

      <v-radio-group v-model="place.level" inline>
        <template v-slot:label> <span class="text-body-1">Nivel:</span> </template>
        <v-radio color="purple" label="Principiante" :value="PlaceLevel.BEGINNER"></v-radio>
        <v-radio color="purple" label="Intermedio" :value="PlaceLevel.INTERMEDIATE"></v-radio>
        <v-radio color="purple" label="Avanzado" :value="PlaceLevel.EXPERT"></v-radio>
      </v-radio-group>
      <v-text-field v-model="place.city" label="City" required></v-text-field>

      <v-radio-group v-model="place.type" inline>
        <template v-slot:label> <span class="text-body-1">Tipo:</span> </template>
        <v-radio color="purple" label="Pista" :value="PlaceType.RINK"></v-radio>
        <v-radio color="purple" label="Ruta" :value="PlaceType.ROUTE"></v-radio>
      </v-radio-group>
      <v-file-input label="Añadir imagen" filled prepend-icon="mdi-camera"></v-file-input>
      <v-switch color="purple" v-model="place.slalom" label="Se puede hacer Slalom"></v-switch>
      <v-btn color="success" class="mr-4" @click.prevent="saveClicked">{{ routeId ? "Actualizar" : "Crear" }}</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import { defineComponent, type Events } from "vue";
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
      PlaceType,
      PlaceLevel,
      place: {} as RollerPlace,
      mapboxToken: "pk.eyJ1IjoiYWVzY29sYW5vIiwiYSI6ImNsMTgzcThjajFhNzAzaXNnbXJicmRwaTcifQ.8thc3vNfqF8E7yHLqap9PQ",
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
        image: "https://i.imgur.com/dsz1dCN.png",
        level: PlaceLevel.BEGINNER,
        author: this.store.user._id,
      };
    }
  },
  methods: {
    mapClicked(event: any) {
      if (event.lngLat) {
        let loc = event.lngLat;
        this.place.location = [loc.lng, loc.lat];
      }
    },
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
