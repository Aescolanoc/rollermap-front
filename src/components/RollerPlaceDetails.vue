<template>
  <div>
    <img :src="place.image" :alt="place.name" />
    <p>Nombre: {{ place.name }}</p>
    <p>Descripción: {{ place.description }}</p>
    <p>Dificultas: {{ place.level }}</p>
    <p>Ciudad: {{ place.city }}</p>
    <p>slalom: ✅</p>
  </div>
  <v-btn @click="updatePlaceClicked()">editar</v-btn>
  <v-btn @click="deletePlaceClicked()">borrar</v-btn>
  <div>mapa</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRollerMapStore } from "@/stores/store";
import type { PropType } from "vue";
import type RollerPlace from "@/types/RollerPlace";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  data() {
    return {
      place: {} as RollerPlace,
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
      try {
        this.store.deleteRollerPlace(this.place._id);
      } catch (error) {
        return error;
      }
    },
  },
});
</script>
