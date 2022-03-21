<template>
  <div>
    {{ place.name }}
    {{ place.description }}
    <img :src="place.image" :alt="place.name" />
    <v-btn icon v-if="isInFavorites()" @click="favoriteClicked">
      <v-icon color="purple">mdi-heart</v-icon>
    </v-btn>
    <v-btn icon v-else @click="favoriteClicked">
      <v-icon color="purple">mdi-heart-outline</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        name: "Pepe",
        email: "pepe@pepe.es",
        password: "1234",
        favorites: ["a"],
        myrollerplaces: [],
      },
    };
  },
  created() {
    console.log(this.isInFavorites());
  },
  methods: {
    isInFavorites() {
      return this.user.favorites.includes(this.place.id);
    },
    favoriteClicked() {
      if (this.isInFavorites()) {
        const indexPlace = this.user.favorites.findIndex(
          (fav) => fav === this.place.id
        );

        this.user.favorites.splice(indexPlace, 1);
      } else {
        this.user.favorites.push(this.place.id);
      }
    },
  },
});
</script>

<style scoped></style>
