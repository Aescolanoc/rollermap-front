<template>
  <div>
    <h2>Editar {{ place.name }}</h2>
    <v-file-input label="File input" filled prepend-icon="mdi-camera"></v-file-input>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import { defineComponent } from "vue";
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
    uploadPicture() {
      console.log("foto guardada");
    },
  },
});
</script>
