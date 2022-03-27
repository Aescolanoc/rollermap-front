<template>
  <div class="rollerplace-form">
    <div class="rollerplace-form_map">
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
    </div>

    <p class="rollerplace-form_map-text">Haz click en el mapa para guardar la localización</p>
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
      <v-file-input
        v-model="photos"
        label="Añadir imagen"
        filled
        prepend-icon="mdi-camera"
        accept="image/*"
        show-size
        @change="uploadPhoto"
        :error="wrongFileSize"
      ></v-file-input>
      <p v-if="wrongFileSize" class="text-center">Solo se permiten imágenes hasta 5mb</p>
      <img class="rollerplace-form_image" v-if="place.image?.length" :src="place.image" alt="Previsualización imagen" />
      <v-switch color="purple" v-model="place.slalom" label="Se puede hacer Slalom"></v-switch>
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
import firebase from "@/firebaseConfig";
import { mapBoxConfig } from "@/config";

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
      mapboxToken: mapBoxConfig.token,
      photos: [] as any[],
      photoUrl: "" as string,
      wrongFileSize: false as boolean,
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
        location: [-3.703339, 40.416729],
        type: PlaceType.RINK,
        slalom: false,
        city: "",
        image: "",
        level: PlaceLevel.BEGINNER,
        author: this.store.user._id,
      };
    }
  },
  methods: {
    uploadPhoto() {
      if (this.photos[0].size / 1024 / 1024 > 5) {
        this.wrongFileSize = true;
      } else {
        const storageRef = firebase.ref(firebase.storage, "images/" + new Date().getTime() + this.photos[0].name);

        firebase.uploadBytes(storageRef, this.photos[0]).then((snapshot) => {
          firebase.getDownloadURL(snapshot.ref).then((downloadURL: string) => {
            this.place.image = downloadURL;
          });
        });
      }
    },
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

<style lang="scss">
.rollerplace-form_map {
  border-radius: 30px;
  overflow: hidden;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.rollerplace-form_map-text {
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
}

.rollerplace-form_image {
  height: 100px;
  width: auto;
  border-radius: 10px;
}
</style>
