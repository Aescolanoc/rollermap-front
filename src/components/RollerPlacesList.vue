<template>
  <v-row>
    <v-col cols="12" class="py-12">
      <roller-filter @filtered="filterChanged"></roller-filter>
      <v-tooltip bottom>
        <template v-slot:activator="{ props }">
          <v-btn icon color="deep-purple" class="ml-8" v-bind="props" @click="newPlaceClicked()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Crear Pista</span>
      </v-tooltip>
    </v-col>
  </v-row>

  <div v-if="filteredRollerPlaces.length" class="d-flex flex-wrap flex-column justify-space-around flex-sm-row">
    <div v-for="item in filteredRollerPlaces" :key="item._id">
      <roller-place-card :place="item"></roller-place-card>
    </div>
  </div>
  <div v-else class="list-noplaces">
    <img class="List-noplaces__image" src="../assets/img/no_rollerplaces.png" alt="No hay pistas que mostrar" />
    <p>No hay contenido para mostrar</p>
  </div>

  <div class="text-center">
    <v-pagination v-model="page" :length="filteredRollerPlaces.length"></v-pagination>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import RollerPlaceCard from "./RollerPlaceCard.vue";
import { defineComponent } from "vue";
import { PlaceType } from "@/helpers/rollerMapEnums";
import type RollerPlace from "@/types/RollerPlace";
import RollerFilter from "./RollerFilter.vue";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  components: {
    RollerPlaceCard,
    RollerFilter,
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
    newPlaceClicked() {
      this.$router.push({
        name: "newrollerplace",
      });
    },
  },
});
</script>

<style lang="scss">
.list-noplaces {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  .List-noplaces__image {
    height: 300px;
    opacity: 0.3;
  }
}
</style>
