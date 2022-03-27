<template>
  <v-row>
    <v-col cols="6">
      <v-card class="mx-auto">
        <v-img class="align-end text-white" height="200" :src="place.image" cover> </v-img>
        <v-card-text>
          <v-card-title class="name font-weight-bold"> {{ place.name }} </v-card-title>

          <div class="description font-weight-bold">Descripción:</div>
          <p class="text-left text-body-1">{{ place.description }}</p>
          <div class="font-weight-bold">Dificultad:</div>
          <p>{{ place.level }}</p>
          <div class="font-weight-bold">Ciudad:</div>
          <p>{{ place.city }}</p>
          <div class="font-weight-bold">
            Slalom:
            <v-icon v-if="place.slalom" color="green">mdi-rollerblade</v-icon>
            <v-icon v-else color="red">mdi-roller-skate-off</v-icon>
          </div>
        </v-card-text>

        <v-card-actions v-if="isAuthor">
          <v-btn @click="updatePlaceClicked()" color="purple"> Editar </v-btn>
          <v-btn @click="deletePlaceClicked()" color="red"> Borrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="6">
      <mapbox-map :accessToken="mapboxToken" :center="place.location" :zoom="15" mapStyle="streets-v11">
        <mapbox-navigation-control position="top-right" />
        <mapbox-geolocate-control />
        <mapbox-marker :lngLat="place.location" />
      </mapbox-map>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRollerMapStore } from "@/stores/store";
import type { PropType } from "vue";
import type RollerPlace from "@/types/RollerPlace";
import { mapBoxConfig } from "@/config";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  computed: {
    isAuthor() {
      return this.store.user._id === this.place.author;
    },
  },
  data() {
    return {
      place: {} as RollerPlace,
      mapboxToken: mapBoxConfig.token,
    };
  },
  props: {
    routeId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  created() {
    let placeFound = this.store.rollerPlaces.find((e) => e._id === this.routeId);
    if (placeFound) {
      this.place = placeFound;
    }
  },

  methods: {
    updatePlaceClicked() {
      this.$router.push({
        name: "editrollerplace",
        params: { routeId: this.place._id },
      });
    },
    deletePlaceClicked() {
      if (this.isAuthor && this.place._id) {
        try {
          this.store.deleteRollerPlace(this.place._id);
        } catch (error) {
          return error;
        }
      }
    },
  },
});
</script>
