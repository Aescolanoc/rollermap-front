<template>
  <div>
    <h1>Listado de sitios</h1>
    <roller-places-list v-if="!loading"></roller-places-list>
    <div v-else class="text-center">
      <v-progress-circular :size="70" :width="7" color="purple-darken-3" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import RollerPlacesList from "@/components/RollerPlacesList.vue";

import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  components: {
    RollerPlacesList,
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        await this.store.getAllRollerPlaces();
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
