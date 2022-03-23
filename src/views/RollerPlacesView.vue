<template>
  <div>
    <roller-places-list></roller-places-list>
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

  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.store.getAllRollerPlaces();
    },
  },
});
</script>
