<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="roller-card"
      min-width="320"
      :elevation="isHovering ? 16 : 2"
      v-bind="props"
    >
      <v-img :src="place.image" :alt="place.name" height="200px" cover></v-img>

      <v-card-title> {{ place.name }} </v-card-title>

      <v-card-actions>
        <v-btn icon v-if="isInFavorites" @click="favoriteClicked">
          <v-icon color="purple">mdi-heart</v-icon>
        </v-btn>
        <v-btn icon v-else @click="favoriteClicked">
          <v-icon color="purple">mdi-heart-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="purple-darken-3" variant="text"> Ver más </v-btn>
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
      return this.store.user.favorites.includes(this.place._id);
    },
  },

  methods: {
    favoriteClicked() {
      let placeId = this.place._id;
      this.store
        .toggleFavorites(placeId)
        .then((resp) => {
          if (resp.data) {
            this.store.$patch({
              user: resp.data,
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

<style lang="scss">
.roller-card {
  margin-bottom: 24px;
  cursor: pointer;
}
</style>
