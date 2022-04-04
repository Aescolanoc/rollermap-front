<template>
  <div>
    <h1>Mis sitios</h1>
    <roller-places-list v-if="!loading" :myPlaces="true"></roller-places-list>
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
        await this.store.getMyRollerPlaces();
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
