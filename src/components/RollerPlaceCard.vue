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
  data() {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        favorites: [{}],
        myrollerplaces: [{}],
      },
    };
  },
  created() {
    this.user = this.store.user;
  },
  methods: {
    isInFavorites() {
      console.log("favorites", this.user.favorites);
      console.log(
        this.user.favorites.find((item: any) => +item._id === +this.place._id)
      );
      console.log(this.place._id);
      return this.user.favorites.find(
        (item: any) => +item._id === +this.place._id
      );
    },
    favoriteClicked() {
      if (this.isInFavorites()) {
        const indexPlace = this.user.favorites.findIndex(
          (fav) => fav === this.place._id
        );

        this.user.favorites.splice(indexPlace, 1);
      } else {
        this.user.favorites.push(this.place._id);
      }
    },
  },
});
</script>
