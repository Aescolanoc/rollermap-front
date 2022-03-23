<template>
  <div>
    <roller-place-details :routeId="routeId"></roller-place-details>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RollerPlaceDetails from "../components/RollerPlaceDetails.vue";
import type { PropType } from "vue";

export default defineComponent({
  components: {
    RollerPlaceDetails,
  },
  props: {
    routeId: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
