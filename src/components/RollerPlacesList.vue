<template>
  <div class="d-flex flex-column justify-space-around flex-sm-row">
    <div v-for="item in store.rollerPlaces" :key="item._id">
      <roller-place-card :place="item"></roller-place-card>
    </div>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import RollerPlaceCard from "./RollerPlaceCard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  components: {
    RollerPlaceCard,
  },
});
</script>
