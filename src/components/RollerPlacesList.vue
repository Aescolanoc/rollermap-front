<template>
  <v-row>
    <v-col cols="12" class="py-12">
      <v-btn-toggle v-model="filter" tile color="deep-purple accent-3" group rounded :mandatory="true">
        <v-btn :value="PlaceType.ALL" @click="filterChanged(PlaceType.ALL)"> Todas </v-btn>

        <v-btn :value="PlaceType.RINK" @click="filterChanged(PlaceType.RINK)"> Pistas </v-btn>

        <v-btn :value="PlaceType.ROUTE" @click="filterChanged(PlaceType.ROUTE)"> Rutas </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

  <div class="d-flex flex-wrap flex-column justify-space-around flex-sm-row">
    <div v-for="item in filteredRollerPlaces" :key="item._id">
      <roller-place-card :place="item"></roller-place-card>
    </div>
  </div>

  <!-- <div class="text-center">
    <v-pagination
      v-model="page"
      :length="
        filteredRollerPlaces.length / 2 > 1
          ? filteredRollerPlaces.length / 2
          : 1
      "
    ></v-pagination>
  </div> -->
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import RollerPlaceCard from "./RollerPlaceCard.vue";
import { defineComponent } from "vue";
import { PlaceType } from "@/helpers/rollerMapEnums";
import type RollerPlace from "@/types/RollerPlace";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  components: {
    RollerPlaceCard,
  },
  data() {
    return {
      page: 1,
      filter: PlaceType.ALL as PlaceType,
      filteredRollerPlaces: [] as RollerPlace[],
      PlaceType,
    };
  },
  props: {
    myPlaces: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.filterChanged(PlaceType.ALL);
  },
  methods: {
    filterChanged(filter: PlaceType) {
      this.filter = filter;
      let places = this.myPlaces ? this.store.userRollerPlaces : this.store.rollerPlaces;
      if (filter === PlaceType.ALL) {
        this.filteredRollerPlaces = places;
      } else {
        this.filteredRollerPlaces = places.filter((item) => {
          return item.type === this.filter;
        });
      }
    },
  },
});
</script>
