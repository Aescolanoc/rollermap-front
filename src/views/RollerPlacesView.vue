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
      this.store
        .getAllRollerPlaces()
        .then((resp) => {
          if (resp.data) {
            this.store.$patch({
              rollerPlaces: resp.data,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
