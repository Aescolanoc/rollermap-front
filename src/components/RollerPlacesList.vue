<template>
  <div>
    <div v-for="item in places" :key="item.id">
      <roller-place-card :place="item"></roller-place-card>
    </div>
  </div>
</template>

<script lang="ts">
import RollerPlaceCard from "./RollerPlaceCard.vue";
import type RollerPlace from "@/types/RollerPlace";

import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
  components: {
    RollerPlaceCard,
  },
  props: {
    places: {
      type: Array as PropType<RollerPlace[]>,
      required: true,
    },
  },
});
</script>
