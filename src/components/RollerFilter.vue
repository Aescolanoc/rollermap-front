<template>
  <v-btn-toggle v-model="filter" tile color="deep-purple" group rounded :mandatory="true">
    <v-btn class="filter-btn" :value="PlaceType.ALL" @click="filterChanged(PlaceType.ALL)"> Todas </v-btn>
    <v-btn class="filter-btn" :value="PlaceType.RINK" @click="filterChanged(PlaceType.RINK)"> Pistas </v-btn>
    <v-btn class="filter-btn" :value="PlaceType.ROUTE" @click="filterChanged(PlaceType.ROUTE)"> Rutas </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlaceType } from "@/helpers/rollerMapEnums";

export default defineComponent({
  emits: ["filtered"],
  data() {
    return {
      filter: PlaceType.ALL as PlaceType,
      PlaceType,
    };
  },
  methods: {
    filterChanged(filter: PlaceType) {
      this.$emit("filtered", filter);
    },
  },
});
</script>

<style lang="scss">
.filter-btn {
  cursor: pointer;
}
</style>
