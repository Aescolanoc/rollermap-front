<template>
  <div>
    {{ place.name }}
    {{ place.description }}
    <img :src="place.image" :alt="place.name" />
    <v-btn icon v-if="isInFavorites" @click="favoriteClicked">
      <v-icon color="purple">mdi-heart</v-icon>
    </v-btn>
    <v-btn icon v-else @click="favoriteClicked">
      <v-icon color="purple">mdi-heart-outline</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { useRollerMapStore } from "@/stores/store";
import type User from "@/types/User";
import { defineComponent } from "vue";

interface DataI {
  user: User;
}

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
  data(): DataI {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        favorites: [],
        myrollerplaces: [],
      },
    };
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
