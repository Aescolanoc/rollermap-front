<template>
  <v-row class="h100 ma-0" align="center">
    <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="pa-0">
      <v-card class="mx-auto details-info">
        <v-img class="align-end text-white" height="200" :src="place.image" cover> </v-img>
        <v-card-text>
          <div class="text-right">
            <v-chip label color="cyan-darken-2" class="ml-3 mt-3">
              <v-icon left icon="mdi-rollerblade"></v-icon>
              Dificultad: {{ level }}
            </v-chip>

            <v-chip label color="orange-darken-1" class="ml-3 mt-3">
              <v-icon left icon="mdi-rollerblade"></v-icon>
              Slalom: {{ slalom }}
            </v-chip>
          </div>
          <v-card-title class="name font-weight-bold mb-3 pl-0 text-left"> {{ place.name }} </v-card-title>

          <div class="description font-weight-bold">Descripción:</div>
          <p class="text-left text-body-1 mb-3">{{ place.description }}</p>

          <div class="font-weight-bold">Ciudad:</div>
          <p class="mb-3">{{ place.city }}</p>
        </v-card-text>

        <v-card-actions v-if="isAuthor">
          <v-btn @click="updatePlaceClicked()" color="purple">Editar</v-btn>
          <v-dialog>
            <template v-slot:activator="{ props }">
              <v-btn color="red" v-bind="props">Borrar</v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-toolbar color="indigo-darken-1">Borrar sitio</v-toolbar>
                <v-card-text>
                  <div class="pa-2">¿Desea borrar {{ place.name }}?</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="isActive.value = false">CANCELAR</v-btn>
                  <v-btn text color="red" @click="deletePlaceClicked(isActive)">BORRAR</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="pa-0" align-self="start">
      <div class="details-map">
        <mapbox-map :accessToken="mapboxToken" :center="place.location" :zoom="15" mapStyle="streets-v11">
          <mapbox-navigation-control position="top-right" />
          <mapbox-geolocate-control />
          <mapbox-marker v-if="isRink" :lngLat="place.location">
            <template v-slot:icon>
              <img
                src="../assets/img/skate-marker.png"
                alt="Marcador mapa logo patín"
                srcset="../assets/img/skate-marker.png 1x, ../assets/img/skate-marker@2x.png 2x"
              />
            </template>
          </mapbox-marker>

          <mapbox-geogeometry-raw v-if="!isRink" :source="geoJson">
            <mapbox-geogeometry-line :width="6" color="#f26d50" />
          </mapbox-geogeometry-raw>

          <template v-if="!isRink">
            <mapbox-marker v-for="point in place.trace" :key="point[0] + point[1]" :lngLat="point" />
          </template>
        </mapbox-map>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRollerMapStore } from "@/stores/store";
import type { PropType } from "vue";
import type RollerPlace from "@/types/RollerPlace";
import { mapBoxConfig } from "@/config";
import { PlaceType, PlaceLevel } from "@/helpers/rollerMapEnums";
import { getGeoJson } from "@/helpers/utils";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  computed: {
    isAuthor() {
      return this.store.user._id === this.place.author;
    },
    isRink() {
      return this.place.type === PlaceType.RINK;
    },
  },
  data() {
    return {
      place: {} as RollerPlace,
      mapboxToken: mapBoxConfig.token,
      level: "" as string,
      slalom: "" as string,
      geoJson: getGeoJson(),
      deleteDialog: false,
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
      if (this.place.level === PlaceLevel.BEGINNER) {
        this.level = "Baja";
      } else if (this.place.level === PlaceLevel.INTERMEDIATE) {
        this.level = "Media";
      } else if (this.place.level === PlaceLevel.EXPERT) {
        this.level = "Alta";
      }
      if (this.place.slalom === true) {
        this.slalom = "Sí";
      } else if (this.place.slalom === false) {
        this.slalom = "No";
      }

      this.geoJson.data.geometry.coordinates = this.place.trace;
    }
  },

  methods: {
    updatePlaceClicked() {
      this.$router.push({
        name: "editrollerplace",
        params: { routeId: this.place._id },
      });
    },

    deletePlaceClicked(isActive: any) {
      if (this.isAuthor && this.place._id) {
        try {
          this.store.deleteRollerPlace(this.place._id);
        } catch (error) {
          return error;
        }
      }
      isActive.value = false;
    },
  },
});
</script>

<style lang="scss">
.details-map {
  height: calc(100vh - 152px);
  width: 100%;
}
.details-info {
  height: calc(100vh - 152px);
  width: 100%;
}
</style>
