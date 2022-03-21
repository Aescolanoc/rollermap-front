<template>
  <div>
    <roller-places-list :places="placesArray"></roller-places-list>
  </div>
</template>

<script lang="ts">
import RollerPlacesList from "@/components/RollerPlacesList.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    RollerPlacesList,
  },
  data() {
    return {
      placesArray: [
        {
          id: "a",
          name: "Paseo de coches - Retiro",
          description:
            "Pista muy popular entre los rollers, rodeada de naturaleza",
          location: [-3.68307, 40.41317],
          type: "pista",
          slalom: true,
          city: "Madrid",
          image: "https://i.imgur.com/dsz1dCN.png",
          level: "baja",
          author: "622f68740b2fa7a2b155e403",
        },
        {
          id: "b",
          name: "Matadero",
          description:
            "Pista muy popular entre los rollers, rodeada de naturaleza",
          location: [-3.68307, 40.41317],
          type: "pista",
          slalom: true,
          city: "Madrid",
          image: "https://i.imgur.com/dsz1dCN.png",
          level: "baja",
          author: "622f68740b2fa7a2b155e403",
        },
      ],
    };
  },
});
</script>

<style scoped></style>
