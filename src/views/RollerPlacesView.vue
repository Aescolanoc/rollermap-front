<template>
  <div>
    <roller-places-list></roller-places-list>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="store.rollerPlaces.length / 2"
      ></v-pagination>
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
      page: 1,
    };
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
