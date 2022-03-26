<template>
  <p>{{ place.type }}</p>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="roller-card" min-width="320" :elevation="isHovering ? 16 : 2" v-bind="props">
      <v-img :src="place.image" :alt="place.name" height="200px" cover>
        <v-expand-transition
          ><div v-if="isHovering" class="transition-fast-in-fast-out v-card--reveal bg-white" style="height: 100%">
            <mapbox-map :accessToken="mapboxToken" :center="place.location" :zoom="14.5" mapStyle="streets-v11">
              <mapbox-marker :lngLat="place.location" />
            </mapbox-map></div
        ></v-expand-transition>
      </v-img>
      <v-card-title class="name"> {{ place.name }} </v-card-title>

      <v-card-actions>
        <v-btn icon="mdi-heart" color="purple" class="favorite-button" v-if="isInFavorites" @click="favoriteClicked">
        </v-btn>
        <v-btn icon="mdi-heart-outline" color="purple" class="favorite-button" v-else @click="favoriteClicked"> </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="purple-darken-3" variant="text" @click="detailsClicked"> Ver más </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isInFavorites() {
      return this.store?.user?.favorites?.includes(this.place._id);
    },
  },
  data() {
    return {
      mapboxToken: "pk.eyJ1IjoiYWVzY29sYW5vIiwiYSI6ImNsMTgzcThjajFhNzAzaXNnbXJicmRwaTcifQ.8thc3vNfqF8E7yHLqap9PQ",
    };
  },
  methods: {
    favoriteClicked() {
      let placeId = this.place._id;
      this.store.toggleFavorites(placeId);
    },
    detailsClicked() {
      this.$router.push({
        name: "details",
        params: { routeId: this.place._id },
      });
    },
  },
});
</script>

<style lang="scss">
.roller-card {
  margin-bottom: 24px;
  cursor: pointer;
}
</style>
