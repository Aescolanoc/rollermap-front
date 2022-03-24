<template>
  <p>{{ place.type }}</p>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="roller-card" min-width="320" :elevation="isHovering ? 16 : 2" v-bind="props">
      <v-img :src="place.image" :alt="place.name" height="200px" cover></v-img>

      <v-card-title class="name"> {{ place.name }} </v-card-title>

      <v-card-actions>
        <v-btn icon class="yes" v-if="isInFavorites" @click="favoriteClicked">
          <v-icon color="purple">mdi-heart</v-icon>
        </v-btn>
        <v-btn icon class="no" v-else @click="favoriteClicked">
          <v-icon color="purple">mdi-heart-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="purple-darken-3" variant="text" @click="detailsClicked"> Ver más </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store = useRollerMapStore();
    return { store };
  },
  props: {
    place: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isInFavorites() {
      return this.store?.user?.favorites?.includes(this.place._id);
    },
  },

  methods: {
    favoriteClicked() {
      let placeId = this.place._id;
      this.store.toggleFavorites(placeId);
    },
    detailsClicked() {
      this.$router.push({
        name: "details",
        params: { routeId: this.place._id },
      });
    },
  },
});
</script>

<style lang="scss">
.roller-card {
  margin-bottom: 24px;
  cursor: pointer;
}
</style>
